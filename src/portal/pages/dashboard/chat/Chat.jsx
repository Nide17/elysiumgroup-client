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

    const [receiver, setReceiver] = useState(localStorage.getItem('msgReceiver') ? JSON.parse(localStorage.getItem('msgReceiver')) : null);
    const [currentChatRoom, setCurrentChatRoom] = useState(null);
    const [openNewReceiverForm, setOpenNewReceiverForm] = useState(false);
    useEffect(() => { sender ? dispatch(getUserChatList(sender)) : null }, [dispatch, sender]);

    // Update the chat messages
    useEffect(() => {
        if (receiver === 'broadcast') {
            dispatch(getBroadcastMessages());
        }
        else if (receiver && receiver.roomName) {
            socket.emit('join', receiver._id);
            dispatch(getChatRoomMessages(receiver._id));
        }
        else if (receiver && receiver !== 'broadcast' && !receiver.roomName && sender) {
            dispatch(getChatMessages({ sender, receiver: receiver._id }));
        }

    }, [dispatch, receiver, sender]);

    // Listen for new messages
    useEffect(() => {
        socket.on('broadcast', (msg) => {
            dispatch(getBroadcastMessages())
                .then(() => {
                    toast.success('New Broadcast Message', {
                        icon: '📢',
                        style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff',
                        },
                    });
                    dispatch(getUserChatList(user._id));
                })
                .catch((error) => {
                    toast.error('Error getting broadcast messages');
                });
        });

        socket.on('chatroom', (message) => {
            dispatch(getChatRoomMessages(message.chatroom))
                .then(() => {
                    toast.success('New ChatRoom Message', {
                        icon: '📢',
                        style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff',
                        },
                    });
                    dispatch(getUserChatList(user._id));
                })
                .catch((error) => {
                    toast.error('Error getting chatroom messages');
                });
        });

        socket.on('dm', ({ message }) => {
            dispatch(getChatMessages({ sender: message.sender, receiver: message.receiver }))
                .then(() => {
                    toast.success('New DM Message', {
                        icon: '📩',
                        style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff',
                        },
                    });
                    dispatch(getUserChatList(user._id));
                })
                .catch((error) => {
                    toast.error('Error getting DM messages');
                });
        });

        return () => {
            socket.off('chatroom');
            socket.off('broadcast');
            socket.off('dm');
        }
    }, [dispatch, sender]);

    const openCreateEditDialog = (data) => {
        if (!data || !data._id) {
            setCurrentChatRoom({ roomName: '', createdBy: sender, });
        } else {
            setCurrentChatRoom(data);
        }
        dispatch(openDialog());
    };

    return (
        <div className="my-3 flex flex-col gap-x-12 bg-blue-gray-100 border border-blue-gray-300 rounded-xl p-2">
            <div className="flex flex-row gap-x-4">
                <div className="flex flex-col gap-x-4 w-1/4 bg-blue-gray-100">
                    <header className="p-2 border-b border-gray-300 flex justify-between items-center bg-black text-white">
                        <h1 className="text-lg lg:text-xl font-semibold">Chats</h1>
                        <span className="flex items-center gap-0 cursor-pointer hover:bg-gray-800 rounded-md"
                            onClick={() => openCreateEditDialog({ _id: '', roomName: '' })}>
                            <PlusCircleIcon className="w-4 h-4 lg:w-6 lg:h-6" />&nbsp;chatroom
                        </span>
                        <IconButton color="blue-gray" className="hover:bg-gray-800 rounded-md w-5 h-5 lg:w-6 lg:h-6"
                            onClick={() => { setOpenNewReceiverForm(true); dispatch(openDialog()); }}>
                            <PencilSquareIcon className="w-3 h-3 lg:w-4 lg:h-4" />
                        </IconButton>
                    </header>
                    <div className="overflow-y-auto p-1 mb-2 pb-2 xl:h-[70vh]">
                        {chatList && chatList.map((chat, key) => {

                            // Skip if user is null for direct messages
                            if (chat.type !== 'broadcast' && chat.type !== 'chatroom' && !chat.user) {
                                return null;
                            }

                            let unreadMessages = 0;

                            if (chat.type !== 'broadcast' && chat.type !== 'chatroom') {
                                unreadMessages = chat.allMessages && chat.allMessages.filter(message => message.receiver === sender && !message.read);
                            }

                            return (
                                <ChatListItem
                                    key={key}
                                    name={chat.type === 'broadcast' ? 'General' : chat.type === 'chatroom' ? chat.chatroom.roomName : chat.user.name}
                                    latestMessage={chat.latestMessage && chat.latestMessage.message}
                                    unreadMessages={unreadMessages}
                                    receiver={chat.type === 'broadcast' ? 'broadcast' : chat.type === 'chatroom' ? chat.chatroom : chat.user}
                                    setReceiver={setReceiver}
                                />
                            )
                        })}
                    </div>
                </div>

                <div className="flex flex-col gap-x-4 w-3/4 bg-blue-gray-100">
                    {!messages || !receiver ? (
                        <EmptyChat setOpenNewReceiverForm={setOpenNewReceiverForm} />
                    ) : (
                        <div className="flex flex-col gap-x-4">
                            <MessagesHeader receiver={receiver === 'broadcast' ? 'General Chat' : receiver.roomName ? receiver : receiver}
                                openCreateEditDialog={openCreateEditDialog} />
                            <MessagesList messages={messages} sender={sender} />
                            <MessageForm receiver={
                                onlineUsers.find((user) => user.userID === receiver._id) ?
                                    { ...receiver, socketID: onlineUsers.find((user) => user.userID === receiver._id).socketID } : receiver
                            } />
                        </div>
                    )}
                </div>
            </div>
            {openNewReceiverForm && <NewReceiverForm setReceiver={setReceiver} />}
            {currentChatRoom && (
                <CreateEditDialog
                    formData={currentChatRoom}
                    functionToCall={currentChatRoom._id ? updateChatRoom : createChatRoom}
                    refresh={() => getUserChatList(user._id)}
                    dialogTitle={currentChatRoom.roomName ? `${currentChatRoom.roomName} ChatRoom` : "Create ChatRoom"}
                    btnTitle={currentChatRoom._id ? "Update" : "Create"}
                    altBtnTitle="Cancel"
                />
            )}
        </div>
    );
}

export default Chat;
