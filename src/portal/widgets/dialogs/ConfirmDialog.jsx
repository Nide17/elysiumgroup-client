import { useSelector, useDispatch } from "react-redux";
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { toggleDialog, closeDialog } from "@/redux/slices/appSlice";

export function ConfirmDialog({ dialogTitle = "Confirm", message = "", gotoUrl, action, btnTitle = "Confirm", altBtnTitle = "Cancel", cancelUrl }) {

    const dispatch = useDispatch();
    const { isDialogOpen } = useSelector(state => state.app);

    const handleToggle = () => dispatch(toggleDialog());

    const handleClose = () => {
        if (cancelUrl) {
            window.location.href = cancelUrl;
        }
        dispatch(closeDialog());
    };

    const handleAction = () => {
        if (action) action();
        dispatch(closeDialog());
    };

    const handleNavigation = () => {
        if (gotoUrl) window.location.href = gotoUrl;
        dispatch(closeDialog());
    };

    return (
        <Transition show={isDialogOpen}>
            <Dialog className="relative z-10" onClose={handleToggle}>
                <TransitionChild
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0">
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </TransitionChild>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <TransitionChild
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                            <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className="flex items-center justify-center sm:justify-start">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                                            <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                                        </div>
                                        <div className="ml-4">
                                            <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                {dialogTitle}
                                            </DialogTitle>
                                            <p className="mt-2 text-sm text-gray-500">
                                                {message}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-3 py-3 sm:flex sm:flex-row justify-around sm:px-6">
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 sm:ml-3 sm:w-auto"
                                        onClick={handleClose}
                                    >
                                        {altBtnTitle}
                                    </button>

                                    <button
                                        type="button"
                                        className={`inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm sm:mt-0 sm:w-auto ${gotoUrl ? 'bg-red-600 text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-500' : 'bg-red-600 text-white ring-1 ring-inset ring-gray-300 hover:bg-gray-500'
                                            }`}
                                        onClick={gotoUrl ? handleNavigation : handleAction}
                                    >
                                        {btnTitle}
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
