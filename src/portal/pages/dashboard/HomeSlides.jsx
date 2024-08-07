import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardHeader, CardBody, Typography, Avatar, IconButton, Switch } from "@material-tailwind/react";
import { PlusIcon, TrashIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import { parseISO, format } from 'date-fns';
import {
    getHomeSlides,
    createHomeSlide,
    updateHomeSlideImage,
    toggleHomeSlide,
    updateHomeSlide,
    deleteHomeSlide
} from "@/redux/slices/homeSlidesSlice";
import { openDialog, closeDialog } from "@/redux/slices/appSlice";
import Loading from '@/components/utils/Loading';
import { DeleteDialog } from '@/portal/widgets/dialogs/DeleteDialog';
import { CreateEditDialog } from '@/portal/widgets/dialogs/CreateEditDialog';
import { UploadHomeSlideDialog } from '@/portal/widgets/dialogs/UploadHomeSlideDialog';
import img_thumbnail from "@/images/img_thumbnail.png";
import toast from 'react-hot-toast';

export function HomeSlides() {
    const dispatch = useDispatch();
    const { isLoading, homeSlides } = useSelector(state => state.homeSlides);
    const { user } = useSelector(state => state.users);
    const [homeSlideToDelete, setHomeSlideToDelete] = useState(null);
    const [isUploadImageOpen, setIsUploadImageOpen] = useState(false);
    const [preloadedImages, setPreloadedImages] = useState({});
    const [currentHomeSlide, setCurrentHomeSlide] = useState({
        _id: '',
        description: '',
        categoryTitle: '',
        createdAt: '',
        updatedAt: ''
    });

    useEffect(() => {
        dispatch(getHomeSlides());
    }, [dispatch]);

    const openCreateEditDialog = useCallback((data) => {
        if (!data || !data._id) {
            setCurrentHomeSlide({ _id: '', description: '', categoryTitle: '', createdAt: '', updatedAt: '' });
        } else {
            setCurrentHomeSlide(data);
        }
        setHomeSlideToDelete(null);
        setIsUploadImageOpen(false);
        dispatch(openDialog());
    }, [dispatch]);

    const openDeleteDialog = useCallback((_id, img, categoryTitle) => {
        if (_id) {
            setHomeSlideToDelete({ _id, img, categoryTitle });
            setCurrentHomeSlide(null);
            setIsUploadImageOpen(false);
            dispatch(openDialog());
        }
    }, [dispatch]);

    const handleDelete = useCallback(async (homeSlideID) => {
        const result = await dispatch(deleteHomeSlide(homeSlideID));
        if (result.payload) {
            setHomeSlideToDelete(null);
            dispatch(getHomeSlides());
        }
        dispatch(closeDialog());
    }, [dispatch]);

    useEffect(() => {
        const preloadImages = async () => {
            const imagesToPreload = homeSlides.map(homeSlide => ({
                homeSlideID: homeSlide._id,
                imageUrl: homeSlide.img?.url,
            }));

            const preloaded = await Promise.all(imagesToPreload.map(async ({ homeSlideID, imageUrl }) => {
                if (imageUrl) {
                    const response = await fetch(imageUrl);
                    if (response.ok) {
                        const blob = await response.blob();
                        return { homeSlideID, blob };
                    }
                }
                return { homeSlideID, blob: null };
            }));

            const preloadedImagesObject = {};
            preloaded.forEach(({ homeSlideID, blob }) => {
                preloadedImagesObject[homeSlideID] = blob ? URL.createObjectURL(blob) : null;
            });

            setPreloadedImages(preloadedImagesObject);
        };

        preloadImages();
    }, [homeSlides]);

    const columns = useMemo(() => [
        { id: "image", label: "Image" },
        { id: "description", label: "Description" },
        { id: "categoryTitle", label: "Category Title" },
        { id: "updatedAt", label: "Updated At" },
        { id: "actions", label: "Actions" }
    ], []);

    const renderTableBody = () => {
        if (isLoading) {
            return <Loading />;
        }

        return (
            <tbody>
                {homeSlides.map(({ _id, img, description, categoryTitle, isActive, updatedAt }) => {
                    const preloadedImage = preloadedImages[_id] || img_thumbnail;
                    return (
                        <tr key={_id}>
                            <td className="py-3 px-2 border-b border-blue-gray-50">
                                <div className="flex items-center gap-4">
                                    <Avatar src={preloadedImage} alt={categoryTitle || "HomeSlide"} size="sm" variant="rounded" />
                                    <div>
                                        <Typography variant="small" color="blue-gray" className="text-[10px] font-semibold">
                                            {categoryTitle || "HomeSlide"}
                                        </Typography>
                                    </div>
                                </div>
                            </td>
                            <td className="py-3 px-2 border-b border-blue-gray-50">
                                <Typography variant="small" color="blue-gray" className="text-[10px] font-semibold">
                                    {description || "HomeSlide Desc N/A"}
                                </Typography>
                            </td>
                            <td className="py-3 px-2 border-b border-blue-gray-50">
                                <Typography className="text-[9px] font-semibold text-blue-gray-600">
                                    {updatedAt ? format(parseISO(updatedAt), "dd-MM-yyyy") : "00-00-0000"}
                                </Typography>
                            </td>
                            <td className="py-3 px-2 border-b border-blue-gray-50">
                                <Typography as="a" href="#" className="text-[9px] font-semibold text-center text-blue-gray-600 
                    border border-blue-gray-200 rounded p-1 mx-2 hover:bg-blue-gray-50"
                                    onClick={() => {
                                        setCurrentHomeSlide({ _id, description, categoryTitle });
                                        setHomeSlideToDelete(null);
                                        setIsUploadImageOpen(true);
                                        dispatch(openDialog());
                                    }}>
                                    Update Image
                                </Typography>
                            </td>
                            <td className="py-3 px-2 border-b border-blue-gray-50">
                                <Switch
                                    key={_id}
                                    id={_id}
                                    label={isActive ? "Deactivate" : "Activate"}
                                    defaultChecked={isActive}
                                    color="blue"
                                    labelProps={{ className: "text-sm my-2 font-normal text-blue-gray-500" }}
                                    onChange={() => {
                                        if (!img) {
                                            toast.error("Please upload an image first.");
                                            return;
                                        }
                                        dispatch(toggleHomeSlide(_id));
                                    }}
                                />
                            </td>
                            <td className="py-3 px-2 border-b border-blue-gray-50">
                                <div className="flex items-center gap-4">
                                    {user.role === 'admin' && (
                                        <>
                                            <IconButton onClick={() => openCreateEditDialog({ _id, description, categoryTitle })} className="bg-white mx-1">
                                                <PencilSquareIcon className="h-3 w-3 text-blue font-bold" color="blue" />
                                            </IconButton>
                                            <IconButton onClick={() => openDeleteDialog(_id, img, categoryTitle)} className="bg-white mx-1">
                                                <TrashIcon className="h-3 w-3 text-red font-bold" color="red" />
                                            </IconButton>
                                        </>
                                    )}
                                </div>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        );
    };

    return (
        <div className="mt-12 mb-8 flex flex-col gap-12">
            <Card>
                <CardHeader variant="gradient" color="gray" className="mb-8 p-6 flex flex-row justify-between">
                    <Typography variant="h6" color="white">Home Slides</Typography>
                    <IconButton color="blue" className="p-2 cursor-pointer hover:bg-[#F0AD4E] rounded-full"
                        onClick={() => openCreateEditDialog(null)}>
                        <PlusIcon className="h-3 w-3 text-white font-bold" />
                    </IconButton>
                </CardHeader>
                <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                    <table className="w-full min-w-[640px] table-auto">
                        <thead>
                            <tr>
                                {columns.map(({ id, label }) => (
                                    <th key={id} className="border-b border-blue-gray-50 py-3 pl-2 pr-5 text-left">
                                        <Typography variant="small" className="text-[9px] font-bold uppercase text-blue-gray-400">
                                            {label}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        {renderTableBody()}
                    </table>
                </CardBody>
            </Card>

            {homeSlideToDelete && homeSlideToDelete._id && (
                <DeleteDialog
                    gotoUrl={null}
                    action={() => handleDelete(homeSlideToDelete._id)}
                    dialogTitle="Delete HomeSlide"
                    btnTitle="Delete"
                    altBtnTitle="No, Thanks"
                    message={`Would you like to delete "${homeSlideToDelete.categoryTitle}" home slide?`}
                />
            )}

            {currentHomeSlide && !isUploadImageOpen && (
                <CreateEditDialog
                    formData={currentHomeSlide}
                    functionToCall={currentHomeSlide._id ? updateHomeSlide : createHomeSlide}
                    refresh={getHomeSlides}
                    dialogTitle={currentHomeSlide.categoryTitle ? `${currentHomeSlide.categoryTitle} HomeSlide` : "Create HomeSlide"}
                    btnTitle={currentHomeSlide._id ? "Update" : "Create"}
                    altBtnTitle="Cancel"
                />
            )}

            {isUploadImageOpen && currentHomeSlide && (
                <UploadHomeSlideDialog
                    id={currentHomeSlide._id}
                    uploadAction={({ formData, id }) => dispatch(updateHomeSlideImage({ formData, id }))}
                    uploadName="homeSlideImage"
                    dialogTitle="Upload HomeSlide Image"
                    btnTitle="Upload Picture"
                    altBtnTitle="No, Thanks"
                    message={`Would you like to update your home slide image?`}
                />
            )}
        </div>
    );
}

export default HomeSlides;
