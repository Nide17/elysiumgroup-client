import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

const MessagesList = ({ messages }) => {
    const { user } = useSelector(state => state.users);
    const currUser = user ? user._id : null;
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    // Inline styles for the invisible scrollbar
    const invisibleScrollbarStyles = {
        WebkitOverflowScrolling: 'touch', // For iOS smooth scrolling
        msOverflowStyle: 'none',          // For Internet Explorer and Edge
        scrollbarWidth: 'none',           // For Firefox
    };

    return (
        <div className="flex flex-col gap-4 p-2 xl:p-4 overflow-y-auto h-[calc(60vh)] border-2 border-slate-300 rounded-b-xl my-2"
            style={invisibleScrollbarStyles}>

            {messages.map((message, key) => (
                <div key={key} className={`flex items-end gap-2 ${message.sender && message.sender._id === currUser ? "ml-auto" : "mr-auto"}`}>
                    <div className={`flex max-w-[70%] flex-col gap-2 rounded-l-xl rounded-tr-xl 
                        ${message.sender && message.sender._id === currUser ? "bg-blue-400 text-slate-100" : "bg-gray-300 text-slate-700"} 
                        p-2 xl:p-4 md:max-w-[75%] dark:bg-slate-800 dark:text-slate-300`}>
                        {message.message}
                        <span className="ml-auto text-[0.6rem] text-gray-600 dark:text-gray-600">
                            {message.createdAt && new Date(message.createdAt).toLocaleString('en-GB', { hour12: false })}
                        </span>
                    </div>

                    {message.sender ?
                        <span className="flex size-9 items-center justify-center overflow-hidden rounded-full 
                    border border-slate-300 bg-slate-100 text-sm font-bold tracking-wider text-slate-700 
                    dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">

                            {message.sender.picture && message.sender.picture.url ?
                                <img src={message.sender.picture.url} alt="avatar"
                                    className="w-full h-full object-cover" /> :
                                message.sender.name && message.sender.name.charAt(0).toUpperCase()}
                        </span> :
                        <small className="text-red-600 dark:text-red-600">Unknown user</small>
                    }
                </div>
            ))}
            <div ref={messagesEndRef} />
        </div>
    );
};

export default MessagesList;
