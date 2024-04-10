import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { Progress, Spinner } from "@material-tailwind/react";
import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";
import { toggleDialog, closeDialog } from "@/redux/slices/appSlice";

export function UploadImageDialog({ dialogTitle, message, uploadAction, btnTitle, altBtnTitle, uploadName, id }) {

    const dispatch = useDispatch();
    const { isDialogOpen } = useSelector(state => state.app);
    const { user } = useSelector(state => state.users);

    const [image, setImage] = useState(null)
    const [previewUrl, setPreviewUrl] = useState(null);
    const [uploading, setUploading] = useState(false)

    const handleToggle = () => dispatch(toggleDialog());
    const handleClose = () => dispatch(closeDialog());

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file)
        setPreviewUrl(URL.createObjectURL(file))
    }

    const handleUpload = async () => {
        if (!uploadAction || typeof uploadAction !== 'function') {
            alert('Upload action is not properly defined');
            return;
        }

        setUploading(true);

        const formData = new FormData();
        if (!image) {
            alert('Please select an image to upload');
            setUploading(false);
            return;
        }

        formData.append(uploadName, image);

        try {
            await uploadAction({ formData, id })
                .then((res) => {
                    if (res.payload) {
                        setUploading(false);
                        setImage(null);
                        setPreviewUrl(null);
                    }
                })
        } catch (error) {
            setUploading(false);
        }

        dispatch(closeDialog());
    };

    const handleRemoveImage = () => {
        setPreviewUrl(null)
        setImage(null)
    }

    return (
        <Transition show={isDialogOpen}>
            <Dialog className="relative z-10" onClose={handleToggle}>
                <TransitionChild enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100"
                    leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </TransitionChild>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <TransitionChild enter="ease-out duration-300" enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100" leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">

                            <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">

                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className="sm:flex flex-column">
                                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                            <ArrowUpTrayIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                                        </div>
                                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                            <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                {dialogTitle && dialogTitle}
                                            </DialogTitle>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">
                                                    {message && message}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 px-3 py-3 sm:px-6">
                                    <div className="flex flex-col gap-4 mb-4">
                                        <input id="file-upload" type="file" accept="image/*" onChange={handleImageChange} name={uploadName}
                                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg 
                                                    file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                        />
                                    </div>

                                    {previewUrl &&
                                        <div className="previews mt-4 flex flex-wrap gap-2 items-center justify-center">
                                            <div className="relative">
                                                <img src={previewUrl} alt="Preview" className="w-auto h-32 object-cover rounded-lg shadow" />
                                                <button
                                                    onClick={() => handleRemoveImage()}
                                                    className="absolute top-1 right-1 bg-red-600 text-white rounded px-1.5 py-0.5 text-xs">x</button>
                                            </div>
                                        </div>
                                    }
                                </div>

                                {uploading && <Progress value={uploading ? 99 : 0} className="my-4 mx-auto" />}
                                {uploading && <Spinner color="blue" className="my-4 mx-auto" />}

                                <div className="bg-gray-50 px-3 py-3 sm:flex sm:flex-row justify-around sm:px-6">

                                    <button type="button"
                                        className="inline-flex w-full justify-center rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold 
                                        text-white shadow-sm hover:bg-blue-400 sm:ml-3 sm:w-auto"
                                        onClick={handleClose}> {altBtnTitle && altBtnTitle}
                                    </button>

                                    {btnTitle &&
                                        <button type="button"
                                            className="inline-flex w-full justify-center rounded-md bg-green-600  px-3 py-2 text-sm font-semibold text-white 
                                            shadow-sm ring-1 ring-inset ring-green-200 hover:bg-green-300 sm:mt-0 sm:w-auto"
                                            onClick={handleUpload} disabled={uploading} data-autofocus>
                                            {uploading ? 'Uploading...' : btnTitle}
                                        </button>}
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}