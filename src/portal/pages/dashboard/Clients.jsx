import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardHeader, CardBody, Typography, Avatar, IconButton } from "@material-tailwind/react";
import { PlusIcon, TrashIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import { parseISO, format } from 'date-fns';
import { getClients, createClient, addClientLogo, updateClient, deleteClient } from "@/redux/slices/clientsSlice"
import { openDialog, closeDialog } from "@/redux/slices/appSlice";
import Loading from '@/components/utils/Loading';
import { DeleteDialog } from '@/portal/widgets/dialogs/DeleteDialog';
import { CreateEditDialog } from '@/portal/widgets/dialogs/CreateEditDialog';
import { UploadImageDialog } from '@/portal/widgets/dialogs/UploadImageDialog';
import houseDefault from "@/images/house-default.jpg";

export function Clients() {

    const dispatch = useDispatch();
    const { isLoading, clients } = useSelector(state => state.clients);
    const { user } = useSelector(state => state.users);
    const [clientToDelete, setclientToDelete] = useState(null);
    const [isUploadImageOpen, setIsUploadImageOpen] = useState(false);
    const [preloadedImages, setPreloadedImages] = useState({});
    const [currentClient, setCurrentClient] =
        useState({ _id: '', clientName: '', clientEmail: '', clientDetails: '', clientPhone: '', clientAddress: '', createdBy: '', lastUpdatedBy: '', createdAt: '', updatedAt: '' });

    useEffect(() => { dispatch(getClients()) }, [dispatch]);

    const openCreateEditDialog = (data) => {

        if (data === null || data._id === '') {
            setCurrentClient({
                clientName: '',
                clientEmail: '',
                clientDetails: '',
                clientPhone: '',
                clientAddress: '',
                createdBy: user ? user._id : null,
                lastUpdatedBy: user ? user._id : null,
            });
            dispatch(openDialog());
            return;
        }

        setclientToDelete(null);
        setCurrentClient(data);
        dispatch(openDialog());
    };

    const openDeleteDialog = (_id, clientName) => {
        if (_id === null) return;
        setCurrentClient(null);
        setclientToDelete({ _id, clientName });
        dispatch(openDialog());
    };

    const handleDelete = (clientID) => {
        const result = dispatch(deleteClient(clientID));

        result.then((res) => {
            if (res.payload) {
                setclientToDelete(null);
                dispatch(getClients());
            }
            dispatch(closeDialog());
        });
    };

    useEffect(() => {

        const preloadImages = async () => {

            const imagesToPreload = clients.map(client => ({
                clientID: client._id,
                imageUrl: client.clientLogo || houseDefault,
            }));

            const preloaded = await Promise.all(imagesToPreload.map(async ({ clientID, imageUrl }) => {
                const response = await fetch(imageUrl);

                if (response.ok) {
                    const blob = await response.blob();
                    return { clientID, blob };
                }

                return { clientID, blob: null };
            }));

            const preloadedImagesObject = {};
            preloaded.forEach(({ clientID, blob }) => {
                preloadedImagesObject[clientID] = blob ? URL.createObjectURL(blob) : houseDefault;
            });

            setPreloadedImages(preloadedImagesObject);
        };

        preloadImages();
    }, [clients]);

    return (
        <div className="mt-12 mb-8 flex flex-col gap-12">
            <Card>

                <CardHeader variant="gradient" color="gray" className="mb-8 p-6 flex flex-row justify-between">
                    <Typography variant="h6" color="white">Clients</Typography>
                    <IconButton color="blue" className="p-2 cursor-pointer hover:bg-[#F0AD4E] rounded-full"
                        onClick={() => openCreateEditDialog(null)}>
                        <PlusIcon className="h-3 w-3 text-white font-bold" />
                    </IconButton>
                </CardHeader>

                <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                    <table className="w-full min-w-[640px] table-auto">
                        <thead>
                            <tr>
                                {["name", "contact", "address", "updated at", "", ""].map((el, id) => (
                                    <th key={id} className="border-b border-blue-gray-50 py-3 pl-2 pr-5 text-left">
                                        <Typography variant="small" className="text-[9px] font-bold uppercase text-blue-gray-400">
                                            {el}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        {isLoading ? (
                            <Loading />
                        ) : (
                            <tbody>
                                {clients && clients.map(({ _id, clientName, clientEmail, clientPhone, clientAddress, clientDetails, clientLogo,
                                    lastUpdatedBy, createdAt, updatedAt }, key) => {
                                    const className = `py-3 px-2 ${key === clients.length - 1 ? "" : "border-b border-blue-gray-50"}`;

                                    return (
                                        <tr key={key}>

                                            <td className={className}>
                                                <div className="flex items-center gap-4">
                                                    <Avatar src={preloadedImages[_id]}
                                                        alt={clientName ? clientName : "Client Name"} size="sm" variant="rounded" />
                                                    <div>
                                                        <Typography variant="small" color="blue-gray" className="text-[10px] font-semibold">
                                                            {clientName ? clientName : "Client Name"}
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className={className}>
                                                <Typography variant="small" color="blue-gray" className="text-[10px] font-semibold">
                                                    {clientEmail ? clientEmail : "Client Email N/A"}
                                                </Typography>
                                                <Typography className="text-[9px] font-normal text-blue-gray-500">
                                                    {clientPhone ? clientPhone : "Client Phone N/A"}
                                                </Typography>
                                            </td>

                                            <td className={className}>
                                                <Typography className="text-[9px] font-normal text-blue-gray-500">
                                                    {clientAddress ? clientAddress : "Client Address N/A"}
                                                </Typography>
                                            </td>

                                            <td className={className}>
                                                <Typography className="text-[9px] font-semibold text-blue-gray-600">
                                                    {updatedAt ? format(parseISO(updatedAt), "dd-MM-yyyy") : "00-00-0000"}
                                                </Typography>
                                            </td>

                                            <td className={className}
                                                onClick={() => {
                                                    setCurrentClient(null)
                                                    setclientToDelete(null)
                                                    setIsUploadImageOpen(true);
                                                    dispatch(openDialog());
                                                }}>
                                                <Typography as="a" href="#" className="text-[9px] font-semibold text-center text-blue-gray-600 
                                                border border-blue-gray-200 rounded p-1 mx-2 hover:bg-blue-gray-50">
                                                    Add Logo
                                                </Typography>

                                                {isUploadImageOpen && (
                                                    <UploadImageDialog
                                                        id={_id}
                                                        uploadAction={({ formData, id }) => dispatch(addClientLogo({ formData, id }))}
                                                        uploadName="clientLogo"
                                                        dialogTitle="Upload Client Logo"
                                                        btnTitle="Upload Picture"
                                                        altBtnTitle="No, Thanks"
                                                        message={`Would you like to update your client logo?`}
                                                    />
                                                )}
                                            </td>

                                            <td className={className}
                                                onClick={() => openCreateEditDialog({
                                                    _id, clientName, clientEmail, clientPhone,
                                                    clientAddress, clientDetails, lastUpdatedBy, createdAt, updatedAt
                                                })}>
                                                <Typography as="a" href="#" className={`text-[9px] font-semibold text-blue-gray-600
                                                ${user.role === 'admin' ? 'visible' : 'hidden'}`}>
                                                    <PencilSquareIcon className="h-3 w-3 text-blue font-bold" color="blue" />
                                                </Typography>
                                            </td>

                                            <td className={className} onClick={() => openDeleteDialog(_id, clientName)}>
                                                <Typography as="a" href="#" className={`text-[9px] font-semibold text-blue-gray-600
                                                ${user.role === 'admin' ? 'visible' : 'hidden'}`}>
                                                    <TrashIcon className="h-3 w-3 text-red font-bold" color="red" />
                                                </Typography>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        )}
                    </table>
                </CardBody>

            </Card>

            <>
                {clientToDelete && clientToDelete._id && (
                    <DeleteDialog gotoUrl={null}
                        action={() => handleDelete(clientToDelete._id)}
                        dialogTitle="Delete Client"
                        btnTitle="Delete"
                        altBtnTitle="No, Thanks"
                        message={`Would you like to delete "${clientToDelete.clientName}" client?`} />
                )}

                {currentClient && (
                    <CreateEditDialog
                        formData={currentClient}
                        functionToCall={currentClient._id ? updateClient : createClient}
                        refresh={getClients}
                        dialogTitle={currentClient && currentClient.clientName !== '' ? `${currentClient.clientName} Client` : "Create Client"}
                        btnTitle={currentClient._id ? "Update" : "Create"}
                        altBtnTitle="Cancel" />
                )}
            </>
        </div>
    );
}

export default Clients;
