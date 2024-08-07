import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconButton } from "@material-tailwind/react";
import { PencilSquareIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import { openDialog } from "@/redux/slices/appSlice";
import { NewReceiverForm } from "@/portal/pages/dashboard/chat/NewReceiverForm";
import { getChatMessages, getChatRoomMessages, getBroadcastMessages, getUserChatList } from "@/redux/slices/messagesSlice";
import { createChatRoom, updateChatRoom } from "@/redux/slices/chatRoomsSlice";
import MessageForm from "./MessageForm";
import { CreateEditDialog } from "@/portal/widgets/dialogs/CreateEditDialog";
import MessagesHeader from "./MessagesHeader";
import MessagesList from "./MessagesList";
import EmptyChat from "./EmptyChat";
import ChatListItem from "./ChatListItem";
import { socket } from "@/portal/socket";
import toast from "react-hot-toast";

export function Chat() {
    const dispatch = useDispatch();
    const { messages, chatList } = useSelector(state => state.messages);
    const { user, onlineUsers } = useSelector(state => state.users);
    const sender = user ? user._id : null;

    const [receiver, setReceiver] = useState(() => JSON.parse(localStorage.getItem('msgReceiver')) || null);
    const [currentChatRoom, setCurrentChatRoom] = useState(null);
    const [openNewReceiverForm, setOpenNewReceiverForm] = useState(false);

    useEffect(() => {
        if (sender) dispatch(getUserChatList(sender));
    }, [dispatch, sender]);

    useEffect(() => {
        if (receiver) {
            if (receiver === 'broadcast') {
                dispatch(getBroadcastMessages());
            } else if (receiver.roomName) {
                socket.emit('join', receiver._id);
                dispatch(getChatRoomMessages(receiver._id));
            } else if (receiver._id && sender) {
                dispatch(getChatMessages({ sender, receiver: receiver._id }));
            }
        }
    }, [dispatch, receiver, sender]);

    useEffect(() => {
        const handleNewMessage = (type, action) => {
            socket.on(type, async (payload) => {
                try {
                    await dispatch(action(payload));
                    toast.success(`New ${type} Message`, {
                        icon: type === 'broadcast' ? '📢' : type === 'chatroom' ? '📢' : '📩',
                        style: { borderRadius: '10px', background: '#333', color: '#fff' }
                    });
                    dispatch(getUserChatList(user._id));
                } catch {
                    toast.error(`Error getting ${type} messages`);
                }
            });
        };

        handleNewMessage('broadcast', getBroadcastMessages);
        handleNewMessage('chatroom', getChatRoomMessages);
        handleNewMessage('dm', ({ message }) => getChatMessages({ sender: message.sender, receiver: message.receiver }));

        return () => {
            socket.off('broadcast');
            socket.off('chatroom');
            socket.off('dm');
        };
    }, [dispatch, sender, user._id]);

    const openCreateEditDialog = (data) => {
        setCurrentChatRoom(data?._id ? data : { roomName: '', createdBy: sender });
        dispatch(openDialog());
    };

    return (
        <div className="my-3 flex flex-col gap-x-12 bg-blue-gray-100 border border-blue-gray-300 rounded-xl p-2">
            <div className="flex flex-row gap-x-4">
                <div className="flex flex-col gap-x-4 w-1/4 bg-blue-gray-100">
                    <header className="p-2 border-b border-gray-300 flex justify-between items-center bg-black text-white">
                        <h1 className="text-lg lg:text-xl font-semibold">Chats</h1>
                        <span className="flex items-center gap-0 cursor-pointer hover:bg-gray-800 rounded-md" onClick={() => openCreateEditDialog({ _id: '', roomName: '' })}>
                            <PlusCircleIcon className="w-4 h-4 lg:w-6 lg:h-6" />&nbsp;chatroom
                        </span>
                        <IconButton color="blue-gray" className="hover:bg-gray-800 rounded-md w-5 h-5 lg:w-6 lg:h-6" onClick={() => { setOpenNewReceiverForm(true); dispatch(openDialog()); }}>
                            <PencilSquareIcon className="w-3 h-3 lg:w-4 lg:h-4" />
                        </IconButton>
                    </header>
                    <div className="overflow-y-auto p-1 mb-2 pb-2 xl:h-[70vh]">
                        {chatList?.map((chat, key) => {
                            if (chat.type !== 'broadcast' && chat.type !== 'chatroom' && !chat.user) return null;

                            const unreadMessages = chat.type !== 'broadcast' && chat.type !== 'chatroom' ? chat.allMessages?.filter(message => message.receiver === sender && !message.read) : 0;

                            return (
                                <ChatListItem
                                    key={key}
                                    name={chat.type === 'broadcast' ? 'General' : chat.type === 'chatroom' ? chat.chatroom.roomName : chat.user?.name}
                                    latestMessage={chat.latestMessage?.message}
                                    unreadMessages={unreadMessages}
                                    receiver={chat.type === 'broadcast' ? 'broadcast' : chat.type === 'chatroom' ? chat.chatroom : chat.user}
                                    setReceiver={setReceiver}
                                />
                            );
                        })}
                    </div>
                </div>

                <div className="flex flex-col gap-x-4 w-3/4 bg-blue-gray-100">
                    {!messages || !receiver ? (
                        <EmptyChat setOpenNewReceiverForm={setOpenNewReceiverForm} />
                    ) : (
                        <div className="flex flex-col gap-x-4">
                            <MessagesHeader receiver={receiver === 'broadcast' ? 'General Chat' : receiver?.roomName || receiver} openCreateEditDialog={openCreateEditDialog} />
                            <MessagesList messages={messages} sender={sender} />
                            <MessageForm receiver={onlineUsers.find((user) => user.userID === receiver?._id) ? { ...receiver, socketID: onlineUsers.find((user) => user.userID === receiver._id)?.socketID } : receiver} />
                        </div>
                    )}
                </div>
            </div>
            {openNewReceiverForm && <NewReceiverForm setReceiver={setReceiver} />}
            {currentChatRoom && (
                <CreateEditDialog
                    formData={currentChatRoom}
                    functionToCall={currentChatRoom._id ? updateChatRoom : createChatRoom}
                    refresh={() => dispatch(getUserChatList(user._id))}
                    dialogTitle={currentChatRoom.roomName ? `${currentChatRoom.roomName} ChatRoom` : "Create ChatRoom"}
                    btnTitle={currentChatRoom._id ? "Update" : "Create"}
                    altBtnTitle="Cancel"
                />
            )}
        </div>
    );
}

export default Chat;
