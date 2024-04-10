import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardHeader, CardBody, Typography, Avatar, IconButton } from "@material-tailwind/react";
import { PlusIcon, TrashIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import { parseISO, format } from 'date-fns';
import { getServices, createService, updateService, deleteService } from "@/redux/slices/servicesSlice"
import { openDialog, closeDialog } from "@/redux/slices/appSlice";
import { addServiceImage } from "@/redux/slices/servicesSlice";
import Loading from '@/components/utils/Loading';
import { DeleteDialog } from '@/portal/widgets/dialogs/DeleteDialog';
import { CreateEditDialog } from '@/portal/widgets/dialogs/CreateEditDialog';
import { UploadImageDialog } from '@/portal/widgets/dialogs/UploadImageDialog';
import houseDefault from "@/images/house-default.jpg";

export function Services() {

    const dispatch = useDispatch();
    useEffect(() => { dispatch(getServices()) }, [dispatch]);
    const { isLoading, services } = useSelector(state => state.services);
    const { user } = useSelector(state => state.users);
    const [serviceToDelete, setServiceToDelete] = useState(null);
    const [isUploadImageOpen, setIsUploadImageOpen] = useState(false);
    const [preloadedImages, setPreloadedImages] = useState({});
    const [currentService, setCurrentService] =
        useState({ _id: '', serviceName: '', serviceTitle: '', serviceDetail: '', createdBy: '', lastUpdatedBy: '', createdAt: '', updatedAt: '' });

    const openCreateEditDialog = (data) => {

        if (data === null || data._id === '') {
            setCurrentService({
                serviceName: '',
                serviceTitle: '',
                serviceDetail: '',
                createdBy: user ? user._id : null,
                lastUpdatedBy: user ? user._id : null,
            });
            dispatch(openDialog());
            return;
        }

        setServiceToDelete(null);
        setCurrentService(data);
        dispatch(openDialog());
    };

    const openDeleteDialog = (_id, serviceName) => {

        if (_id === null) {
            return;
        }

        setCurrentService(null);
        setServiceToDelete({ _id, serviceName });
        dispatch(openDialog());
    };

    const handleDelete = (serviceID) => {
        const result = dispatch(deleteService(serviceID));

        result.then((res) => {
            if (res.payload) {
                setServiceToDelete(null);
                dispatch(getServices());
            }
            dispatch(closeDialog());
        });
    };

    useEffect(() => {
        const preloadImages = async () => {

            const imagesToPreload = services.map(service => ({
                serviceID: service._id,
                imageUrl: service.serviceImage || houseDefault,
            }));

            const preloaded = await Promise.all(imagesToPreload.map(async ({ serviceID, imageUrl }) => {
                const response = await fetch(imageUrl);

                if (response.ok) {
                    const blob = await response.blob();
                    return { serviceID, blob };
                }

                return { serviceID, blob: null };
            }));

            const preloadedImagesObject = {};
            preloaded.forEach(({ serviceID, blob }) => {
                preloadedImagesObject[serviceID] = blob ? URL.createObjectURL(blob) : houseDefault;
            });

            setPreloadedImages(preloadedImagesObject);
        }

        preloadImages();
    }, [services]);

    return (
        <div className="mt-12 mb-8 flex flex-col gap-12">
            <Card>

                <CardHeader variant="gradient" color="gray" className="mb-8 p-6 flex flex-row justify-between">
                    <Typography variant="h6" color="white">Services</Typography>
                    <IconButton color="blue" className="p-2 cursor-pointer hover:bg-[#F0AD4E] rounded-full" onClick={() => openCreateEditDialog(currentService)}>
                        <PlusIcon className="h-3 w-3 text-white font-bold" />
                    </IconButton>
                </CardHeader>

                <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                    <table className="w-full min-w-[640px] table-auto">
                        <thead>
                            <tr>
                                {["name", "title", "details", , "creator", "created at", "updated at", "", ""].map((el, id) => (
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
                                {services && services.map((
                                    { _id, serviceName, serviceDetail, serviceTitle, createdBy, lastUpdatedBy, createdAt, updatedAt },
                                    key) => {
                                    const className = `py-3 px-2 ${key === services.length - 1 ? "" : "border-b border-blue-gray-50"}`;

                                    return (
                                        <tr key={key}>

                                            <td className={className}>
                                                <div className="flex items-center gap-4">
                                                    <Avatar src={preloadedImages[_id]}
                                                        alt={serviceName ? serviceName : "Service Name"} size="sm" variant="rounded" />
                                                    <div>
                                                        <Typography variant="small" color="blue-gray" className="text-[10px] font-semibold">
                                                            {serviceName ? serviceName : "Service Name"}
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className={className}>
                                                <Typography className="text-[9px] font-semibold text-blue-gray-600">
                                                    {serviceTitle ? serviceTitle : 'N/A'}
                                                </Typography>
                                            </td>
                                            <td className={className}>
                                                <Typography className="text-[9px] font-semibold text-blue-gray-600">
                                                    {serviceDetail ? serviceDetail : 'N/A'}
                                                </Typography>
                                            </td>
                                            <td className={className}>
                                                <Typography className="text-[9px] font-semibold text-blue-gray-600">
                                                    {createdBy && createdBy.name ? createdBy.name : 'N/A'}
                                                </Typography>
                                            </td>

                                            <td className={className}>
                                                <Typography className="text-[9px] font-semibold text-blue-gray-600">
                                                    {createdAt ? format(parseISO(createdAt), "dd-MM-yyyy") : "00-00-0000"}
                                                </Typography>
                                            </td>

                                            <td className={className}>
                                                <Typography className="text-[9px] font-semibold text-blue-gray-600">
                                                    {updatedAt ? format(parseISO(updatedAt), "dd-MM-yyyy") : "00-00-0000"}
                                                </Typography>
                                            </td>

                                            <td className={className}
                                                onClick={() => {
                                                    setCurrentService(null);
                                                    setServiceToDelete(null);
                                                    setIsUploadImageOpen(true);
                                                    dispatch(openDialog());
                                                }}>
                                                <Typography as="a" href="#" className="text-[9px] font-semibold text-center text-blue-gray-600 
                                                border border-blue-gray-200 rounded p-1 mx-2 hover:bg-blue-gray-50">
                                                    Add Image
                                                </Typography>

                                                {isUploadImageOpen && (
                                                    <UploadImageDialog
                                                        id={_id}
                                                        uploadAction={({ formData, id }) => dispatch(addServiceImage({ formData, id }))}
                                                        uploadName="serviceImage"
                                                        dialogTitle="Upload Service Image"
                                                        btnTitle="Upload Picture"
                                                        altBtnTitle="No, Thanks"
                                                        message={`Would you like to update your service image?`}
                                                    />
                                                )}
                                            </td>

                                            <td className={className} onClick={() =>
                                                openCreateEditDialog({ _id, serviceName, serviceDetail, serviceTitle, createdBy, lastUpdatedBy, createdAt, updatedAt })}>
                                                <Typography as="a" href="#" className={`text-[9px] font-semibold text-blue-gray-600
                                                ${user.role === 'admin' ? 'visible' : 'hidden'}`}>
                                                    <PencilSquareIcon className="h-3 w-3 text-blue font-bold" color="blue" />
                                                </Typography>
                                            </td>

                                            <td className={className} onClick={() => openDeleteDialog(_id, serviceName)}>
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
                {serviceToDelete && serviceToDelete._id && (
                    <DeleteDialog gotoUrl={null}
                        action={() => handleDelete(serviceToDelete._id)}
                        dialogTitle="Delete Project"
                        btnTitle="Delete"
                        altBtnTitle="No, Thanks"
                        message={`Would you like to delete "${serviceToDelete.serviceName}" project?`} />
                )}

                {currentService && (
                    <CreateEditDialog
                        formData={currentService}
                        functionToCall={currentService._id ? updateService : createService}
                        refresh={getServices}
                        dialogTitle={currentService && currentService.serviceName !== '' ? `${currentService.serviceName} Service` : "Create Service"}
                        btnTitle={currentService._id ? "Update" : "Create"}
                        altBtnTitle="Cancel" />
                )}
            </>
        </div>
    );
}

export default Services;
