import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sendNewMessage } from '@/redux/slices/messagesSlice';
import { createNotification } from '@/redux/slices/notificationsSlice';
import { socket } from '@/portal/socket';
import { Button, Input } from '@material-tailwind/react';

const MessageForm = ({ receiver }) => {
    const [userInput, setUserInput] = useState('');
    const dispatch = useDispatch();
    const { isLoading } = useSelector(state => state.messages);
    const { user } = useSelector(state => state.users);

    const handleSubmit = (e) => {
        e.preventDefault();

        const message = {
            sender: user._id,
            receiver: (receiver.roomName || receiver === 'broadcast') ? null : receiver._id,
            message: userInput,
            chatroom: receiver.roomName ? receiver._id : null,
        };

        dispatch(sendNewMessage(message))
            .then(() => {
                if (receiver === 'broadcast') {
                    socket.emit('broadcast', message);
                } else if (receiver && receiver.roomName) {
                    socket.emit('chatroom', { chatroom: receiver._id, message });
                } else {
                    socket.emit('dm', { message, toSocketID: receiver.socketID });

                    // Save notification for the receiver
                    dispatch(createNotification({
                        user: receiver._id,
                        sender: user._id,
                        message: `New message from ${user.name}`,
                    }));
                }
            })
            .catch(err => console.error(err));

        setUserInput('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            handleSubmit(e);
        }
    };

    return (
        <div className="flex flex-row gap-4 bg-blue-gray-200 p-2 sticky bottom-2 rounded-lg">
            <Input
                type="text"
                placeholder="Your message"
                className="flex-grow p-2 bg-white rounded-lg"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={handleKeyDown}
            />

            <Button
                color="light-blue"
                className="text-white p-2 rounded-lg"
                onClick={handleSubmit}
            >
                {isLoading ? 'Sending ...' : 'Send'}
            </Button>
        </div>
    );
};

export default MessageForm;
