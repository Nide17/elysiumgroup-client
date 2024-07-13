import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { closeDialog } from "@/redux/slices/appSlice";

export function CreateEditDialog({ formData, dialogTitle, btnTitle, altBtnTitle, functionToCall, refresh }) {
    const dispatch = useDispatch();
    const [currentData, setCurrentData] = useState({});
    const { isDialogOpen } = useSelector(state => state.app);
    const handleClose = () => dispatch(closeDialog());
    useEffect(() => formData ? setCurrentData(formData) : setCurrentData({}), [formData]);


    const handleSubmit = () => {
        let action;
        if (currentData._id) {
            action = functionToCall({ id: currentData._id, data: currentData });
        } else {
            action = functionToCall(currentData);
        }

        dispatch(action).then((res) => {
            if (res.payload) {
                dispatch(closeDialog());
                dispatch(refresh())
            }
        });
    };

    return (
        <Transition show={isDialogOpen}>
            <Dialog className="relative z-10" onClose={handleClose}>
                <TransitionChild enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </TransitionChild>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <TransitionChild enter="ease-out duration-300" enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enterTo="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 translate-y-0 sm:scale-100" leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                            <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className="sm:flex flex-column">
                                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                            <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                {dialogTitle && dialogTitle}
                                            </DialogTitle>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 px-3 py-3 sm:px-6">
                                    {currentData && Object.keys(currentData).map((key, index) => {
                                        if (['createdBy', 'lastUpdatedBy', 'createdAt', 'updatedAt', '_id'].includes(key)) {
                                            return null;
                                        }
                                        return (
                                            <div key={index} className="flex flex-col gap-4 mb-4">
                                                <label htmlFor={key} className="block text-sm font-semibold text-gray-700">
                                                    {key.charAt(0).toUpperCase() + key.slice(1)}
                                                </label>
                                                <input
                                                    type="text"
                                                    id={key}
                                                    name={key}
                                                    value={currentData[key] || ''}
                                                    onChange={(e) => setCurrentData({ ...currentData, [key]: e.target.value })}
                                                    className="border border-blue-500 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm h-8 p-2 block w-full"
                                                />
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row justify-around sm:px-6">
                                    <button type="button" onClick={handleClose}
                                        className="inline-flex w-full justify-center rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 sm:ml-3 sm:w-auto"
                                    >
                                        {altBtnTitle && altBtnTitle}
                                    </button>
                                    <button type="button" onClick={handleSubmit}
                                        className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-blue-500 sm:mt-0 sm:w-auto"
                                    >
                                        {btnTitle && btnTitle}
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
