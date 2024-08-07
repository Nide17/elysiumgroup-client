import React from 'react';
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/solid';
import { Button, Typography } from '@material-tailwind/react';
import { useDispatch } from 'react-redux';
import { openDialog } from '@/redux/slices/appSlice';

const EmptyChat = ({ setOpenNewReceiverForm }) => {
    const dispatch = useDispatch();

    return (
        <div className="flex flex-col items-center justify-center gap-4 h-full text-center">
            <ChatBubbleLeftRightIcon className="w-8 h-8 lg:w-16 lg:h-16 text-blue-gray-400" />

            <Typography color="blue-gray" variant="h6">
                Your messages
            </Typography>

            <Typography color="blue-gray" variant="small">
                Send a message to start a conversation
            </Typography>

            <Button
                color="light-blue"
                className="py-2 px-4 lg:py-3 lg:px-6"
                onClick={() => {
                    dispatch(openDialog());
                    setOpenNewReceiverForm(true);
                }}
            >
                Send Message
            </Button>
        </div>
    );
};

export default EmptyChat;
