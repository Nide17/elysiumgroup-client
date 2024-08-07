import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { toggleDialog, closeDialog } from "@/redux/slices/appSlice";
import { getUsers } from "@/redux/slices/usersSlice";

export function NewReceiverForm({ setReceiver }) {
    const dispatch = useDispatch();
    const { isDialogOpen } = useSelector(state => state.app);
    const { isLoading, users, user } = useSelector(state => state.users);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    const handleClose = () => {
        dispatch(closeDialog());
        setReceiver(null);
    };

    const handleReceiverSelection = () => {
        if (selectedUser) {
            const selectedUserData = users.find(usr => usr._id === selectedUser);
            setReceiver(selectedUserData || null);
            handleClose();
        }
    };

    return (
        <Transition show={isDialogOpen}>
            <Dialog className="relative z-10" onClose={handleClose}>
                <TransitionChild
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </TransitionChild>

                <div className="fixed inset-0 z-10 w-screen">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <TransitionChild
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className="text-center sm:text-left">
                                        <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                            New Message
                                        </DialogTitle>
                                    </div>
                                </div>

                                <div className="bg-gray-50 px-3 py-3 sm:px-6">
                                    <div className="flex flex-col gap-4">
                                        <label htmlFor='receiver' className="block text-sm font-semibold text-gray-700">
                                            To:
                                        </label>

                                        {isLoading ? (
                                            <div>Loading...</div>
                                        ) : (
                                            <select
                                                name='receiver'
                                                className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                onChange={(e) => setSelectedUser(e.target.value)}
                                            >
                                                <option value="">Choose someone</option>
                                                {users.map((usr) => (
                                                    user._id !== usr._id && (
                                                        <option key={usr._id} value={usr._id}>
                                                            {usr.name}
                                                        </option>
                                                    )
                                                ))}
                                            </select>
                                        )}
                                    </div>
                                </div>

                                <div className="bg-gray-50 px-3 py-3 sm:flex sm:flex-row justify-around sm:px-6">
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 sm:ml-3 sm:w-auto"
                                        onClick={handleClose}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-500 sm:mt-0 sm:w-auto"
                                        onClick={handleReceiverSelection}
                                    >
                                        Chat
                                    </button>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
