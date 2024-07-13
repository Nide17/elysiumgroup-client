import React, { useState } from 'react'
import { TrashIcon, PencilSquareIcon } from '@heroicons/react/24/solid'
import { IconButton } from '@material-tailwind/react'
import { deleteChatRoom } from '@/redux/slices/chatRoomsSlice'
import { DeleteDialog } from '@/portal/widgets/dialogs/DeleteDialog'
import { openDialog, closeDialog } from "@/redux/slices/appSlice";
import { useDispatch, useSelector } from 'react-redux'
import { getUserChatList } from '@/redux/slices/messagesSlice'
import toast from 'react-hot-toast'

const MessagesHeader = ({ receiver, openCreateEditDialog }) => {

    const { onlineUsers, user } = useSelector(state => state.users);
    const { isDialogOpen } = useSelector(state => state.app);
    const dispatch = useDispatch();
    const [chatRoomToDelete, setChatRoomToDelete] = useState(null);
    const userImg = receiver.picture ? receiver.picture.url : "/img/team-2.jpeg";
    const receiverName = receiver.name ? receiver.name : receiver.roomName ? receiver.roomName : "General Chat";
    const status = receiver && receiver.name ? onlineUsers && onlineUsers.find(user => user.userID === receiver._id) ?
        "Online" : "Offline" : receiver.roomName ? "Chatroom" : "Broadcast";

    const handleDelete = (roomID) => {
        dispatch(deleteChatRoom(roomID))
            .then((res) => {
                if (res.payload) {
                    setChatRoomToDelete(null)
                    dispatch(getUserChatList(user._id));
                    toast.success('Chatroom deleted successfully')
                }
                dispatch(closeDialog());
            });
    };

    return (
        <div className="flex justify-between items-center bg-blue-gray-200 p-2 lg:p-4">
            <div className="flex items-center gap-2">
                {
                    receiver.picture && receiver.name ?
                        <img className="size-8 rounded-full object-cover" src={userImg} alt="avatar" /> :
                        <div className="size-8 rounded-full bg-blue-gray-500 text-white flex items-center justify-center">
                            {receiverName.charAt(0).toUpperCase()}
                        </div>
                }

                <div className="flex flex-col">
                    <span className="text-sm xl:text-lg font-semibold text-black dark:text-white">
                        {receiverName}
                    </span>
                    <span className={`text-xs text-${status == 'Online' ? 'green' : 'grey'}-500 dark:text-green-400`}>
                        {status}
                    </span>
                </div>
            </div>

            <span className={`flex items-center gap-2 ${status == 'Chatroom' && user.role === 'admin' ? 'visible' : 'hidden'}`}>
                <IconButton color="blue-gray" size="sm"
                    onClick={() => openCreateEditDialog({ _id: receiver._id, roomName: receiver.roomName })}>
                    <PencilSquareIcon className="w-6 h-6" />
                </IconButton>
                <IconButton color="blue-gray" size="sm" onClick={() => {
                    if (typeof receiver === "object" && receiver.roomName) {
                        setChatRoomToDelete(receiver);
                        dispatch(openDialog());
                    }
                }}>
                    <TrashIcon className="w-6 h-6" />
                </IconButton>

                {chatRoomToDelete && isDialogOpen &&
                    <DeleteDialog gotoUrl={null}
                        action={() => handleDelete(chatRoomToDelete._id)}
                        dialogTitle="Delete Chatroom"
                        btnTitle="Delete"
                        altBtnTitle="No, Thanks"
                        message={`Would you like to delete "${chatRoomToDelete.roomName}" chatroom?`} />
                }
            </span>
        </div>
    )
}

export default MessagesHeader
