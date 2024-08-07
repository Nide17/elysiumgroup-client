import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardHeader, CardBody, Typography, IconButton } from "@material-tailwind/react";
import { EnvelopeIcon, TrashIcon } from "@heroicons/react/24/solid";
import { parseISO, format } from 'date-fns';
import { getContacts, deleteContact } from "@/redux/slices/contactsSlice";
import { openDialog, closeDialog } from "@/redux/slices/appSlice";
import Loading from '@/components/utils/Loading';
import { DeleteDialog } from '@/portal/widgets/dialogs/DeleteDialog';

export function Contacts() {
    const dispatch = useDispatch();
    const { isLoading, contacts } = useSelector(state => state.contacts);
    const { user } = useSelector(state => state.users);
    const [contactToDelete, setContactToDelete] = useState(null);

    useEffect(() => {
        if (user) {
            dispatch(getContacts());
        }
    }, [dispatch, user]);

    const openDeleteDialog = (_id, contactName) => {
        setContactToDelete({ _id, contactName });
        dispatch(openDialog());
    };

    const handleDelete = async (contactID) => {
        const result = await dispatch(deleteContact(contactID));
        if (result.payload) {
            setContactToDelete(null);
            dispatch(getContacts());
        }
        dispatch(closeDialog());
    };

    if (isLoading) return <Loading />;

    return (
        <div className="mt-12 mb-8 flex flex-col gap-12">
            <Card>
                <CardHeader variant="gradient" color="gray" className="mb-8 p-6 flex flex-row justify-between">
                    <Typography variant="h6" color="white">Contacts</Typography>
                    <IconButton color="blue" className="p-2 cursor-pointer hover:bg-[#F0AD4E] rounded-full">
                        <EnvelopeIcon className="h-3 w-3 text-white font-bold" />
                    </IconButton>
                </CardHeader>

                <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                    {contacts.length === 0 ? (
                        <Typography className="text-center">No contacts available.</Typography>
                    ) : (
                        <table className="w-full min-w-[640px] table-auto">
                            <thead>
                                <tr>
                                    {["name", "email", "message", "sent on", ""].map((el, id) => (
                                        <th key={id} className="border-b border-blue-gray-50 py-3 pl-2 pr-5 text-left">
                                            <Typography variant="small" className="text-[9px] font-bold uppercase text-blue-gray-400">
                                                {el}
                                            </Typography>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {contacts.map(({ _id, contactName, contactEmail, contactMessage, createdAt }, key) => {
                                    const className = `py-3 px-2 ${key === contacts.length - 1 ? "" : "border-b border-blue-gray-50"}`;
                                    return (
                                        <tr key={_id}>
                                            <td className={className}>
                                                <div className="flex items-center gap-4">
                                                    <EnvelopeIcon className="h-5 w-5 text-blue-gray-500" />
                                                    <div>
                                                        <Typography variant="small" color="blue-gray" className="text-[10px] font-semibold">
                                                            {contactName || "Contact Name"}
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className={className}>
                                                <Typography variant="small" color="blue-gray" className="text-[10px] font-semibold">
                                                    {contactEmail || "Contact Email N/A"}
                                                </Typography>
                                            </td>
                                            <td className={className}>
                                                <Typography variant="small" color="blue-gray" className="text-[10px] font-semibold">
                                                    {contactMessage || "Message N/A"}
                                                </Typography>
                                            </td>
                                            <td className={className}>
                                                <Typography className="text-[9px] font-semibold text-blue-gray-600">
                                                    {createdAt ? format(parseISO(createdAt), "dd-MM-yyyy") : "00-00-0000"}
                                                </Typography>
                                            </td>
                                            {user.role === 'admin' && (
                                                <td className={className} onClick={() => openDeleteDialog(_id, contactName)}>
                                                    <Typography as="a" href="#" className="text-[9px] font-semibold text-blue-gray-600">
                                                        <TrashIcon className="h-3 w-3 text-red font-bold" />
                                                    </Typography>
                                                </td>
                                            )}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}
                </CardBody>
            </Card>

            {contactToDelete && contactToDelete._id && (
                <DeleteDialog
                    gotoUrl={null}
                    action={() => handleDelete(contactToDelete._id)}
                    dialogTitle="Delete Contact"
                    btnTitle="Delete"
                    altBtnTitle="No, Thanks"
                    message={`Would you like to delete "${contactToDelete.contactName}" contact?`}
                />
            )}
        </div>
    );
}

export default Contacts;
