import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUserChatList, markAsRead } from "@/redux/slices/messagesSlice";
import { UserCircleIcon, UserGroupIcon, UsersIcon } from "@heroicons/react/24/solid"

const ChatListItem = ({ name, latestMessage, unreadMessages, receiver, setReceiver }) => {

    const dispatch = useDispatch();
    const { onlineUsers, user } = useSelector(state => state.users);
    const color = onlineUsers && onlineUsers.find(usr => usr.userID === receiver._id) ? 'teal' : 'gray';
    let unreadMessagesIDs = unreadMessages && unreadMessages.map(msg => msg._id);

    return (
        <div className="flex items-center mb-2 lg:mb-4 cursor-pointer hover:bg-gray-100 p-1 lg:p-2 rounded-md"
            onClick={() => {
                localStorage.removeItem('msgReceiver');
                setReceiver(receiver)

                if (typeof receiver === "object" && !receiver.roomName) {
                    dispatch(markAsRead(unreadMessagesIDs))
                    dispatch(getUserChatList(user._id))
                }
            }}>

            <div className="p-1 w-6 h-6 lg:w-10 lg:h-10 bg-gray-300 rounded-full mr-2 lg:mr-3 flex items-center justify-center">
                {
                    receiver && receiver.name ?
                        <UserCircleIcon className={`w-4 h-4 lg:w-6 lg:h-6 text-${color}-500`} /> :
                        receiver && receiver.roomName ? <UsersIcon className={`w-4 h-4 lg:w-6 lg:h-6 text-${color}-500`} /> :
                            <UserGroupIcon className={`w-4 h-4 lg:w-6 lg:h-6 text-${color}-500`} />
                }
            </div>

            <div className="flex-1">
                <h2 className="text-sm lg:text-lg font-semibold leading-3 line-clamp-1">
                    {name && name.charAt(0).toUpperCase() + name.slice(1)}
                </h2>

                <p className="text-gray-600 leading-3 line-clamp-1">
                    {latestMessage && latestMessage.charAt(0).toUpperCase() + latestMessage.slice(1)}
                </p>
            </div>

            <div className="flex flex-col items-center justify-center">
                {unreadMessages.length > 0 && (
                    <span className="text-xs lg:text-sm bg-teal-400 text-white rounded-full px-2 py-1">
                        {unreadMessages.length}
                    </span>
                )}
            </div>

        </div>
    )
}

export default ChatListItem
