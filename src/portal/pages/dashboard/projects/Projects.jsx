import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardHeader, CardBody, Typography, Avatar, Chip, IconButton } from "@material-tailwind/react";
import { PlusIcon, TrashIcon, PencilSquareIcon, PhotoIcon } from "@heroicons/react/24/solid";
import { parseISO, format } from 'date-fns';
import { getProjects, deleteProject } from "@/redux/slices/projectsSlice";
import { openDialog, closeDialog } from "@/redux/slices/appSlice";
import { DeleteDialog } from '@/portal/widgets/dialogs/DeleteDialog';
import Loading from '@/components/utils/Loading';
import houseDefault from "@/images/house-default.jpg";

export function Projects() {

  const dispatch = useDispatch();
  const { isLoading, projects } = useSelector(state => state.projects);
  const { user } = useSelector(state => state.users);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [preloadedImages, setPreloadedImages] = useState({});

  useEffect(() => { dispatch(getProjects()) }, [dispatch]);

  const openCreateEditDialog = (_id, pName) => {
    dispatch(openDialog());
    setProjectToDelete({ _id, pName });
  };

  const handleDelete = (projectID) => {
    dispatch(deleteProject(projectID))
      .then(() => {
        setProjectToDelete(null);
        dispatch(getProjects());
      })
    dispatch(closeDialog());
  };

  useEffect(() => {

    const preloadImages = async () => {

      const imagesToPreload = projects.map(project => ({
        projectID: project._id,
        imageUrl: project.pGallery.length > 0 ? project.pGallery[0].url : houseDefault,
      }));

      const preloaded = await Promise.all(imagesToPreload.map(async ({ projectID, imageUrl }) => {
        const response = await fetch(imageUrl);

        if (response.ok) {
          const blob = await response.blob();
          return { projectID, blob };
        }

        return { projectID, blob: null };
      }));

      const preloadedImagesObject = {};
      preloaded.forEach(({ projectID, blob }) => {
        preloadedImagesObject[projectID] = blob ? URL.createObjectURL(blob) : houseDefault;
      });

      setPreloadedImages(preloadedImagesObject);
    };

    preloadImages();
  }, [projects]);

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6 flex flex-row justify-between">
          <Typography variant="h6" color="white">Projects</Typography>
          <Link to="/dashboard/projects/new-project">
            <IconButton color="blue" className="p-2 cursor-pointer hover:bg-[#F0AD4E] rounded-full">
              <PlusIcon className="h-3 w-3 text-white font-bold" />
            </IconButton>
          </Link>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["project", "client/type", "status", "date", "gallery", "", ""].map((el, id) => (
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
                {projects && projects.map(({ _id, pName, pClient, pStartDate, pType, status, pLocation }, key) => {
                  const className = `py-3 px-2 ${key === projects.length - 1 ? "" : "border-b border-blue-gray-50"}`;

                  return (
                    <tr key={_id}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <Avatar src={preloadedImages[_id]}
                          alt={pName ? pName : "Project Name"} size="sm" variant="rounded" />
                          <div>
                            <Typography variant="small" color="blue-gray" className="text-[10px] font-semibold">
                              {pName ? pName : "Project Name"}
                            </Typography>
                            <Typography className="text-[9px] font-normal text-blue-gray-500">
                              {pLocation ? pLocation : "Rwanda"}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={className}>
                        <Typography className="text-[9px] font-normal text-blue-gray-500">
                          {pClient ? pClient.clientName : "Client N/A"}
                        </Typography>
                        <Typography className="text-[9px] font-normal text-blue-gray-500">
                          {pType ? pType.typeName : "Project Type N/A"}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Chip variant="gradient" color={status === 'Completed' ? "green" : "blue-gray"}
                          value={status && status}
                          className="pt-1 pb-0.5 px-2 text-[8px] font-medium w-fit" />
                      </td>
                      <td className={className}>
                        <Typography className="text-[9px] font-semibold text-blue-gray-600">
                          {pStartDate ? format(parseISO(pStartDate), "dd-MM-yyyy") : "00-00-0000"}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography as="a" href={`projects/add-images/${_id}`} className="text-[9px] font-semibold text-blue-gray-600 flex" >
                          <PhotoIcon className="h-3 w-3 text-gray font-bold" color="gray" />
                          <PhotoIcon className="h-3 w-3 text-gray font-bold" color="gray" />
                        </Typography>
                      </td>
                      <td className={className} onClick={() => window.location.href = `/dashboard/projects/edit-project/${_id}`}>
                        <Typography as="a" href="#" className={`text-[9px] font-semibold text-blue-gray-600
                        ${user.role === 'admin' ? 'visible' : 'hidden'}`}>
                          <PencilSquareIcon className="h-3 w-3 text-blue font-bold" color="blue" />
                        </Typography>
                      </td>
                      <td className={className} onClick={() => openCreateEditDialog(_id, pName)}>
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

      {projectToDelete && (
        <DeleteDialog gotoUrl={null}
          action={() => handleDelete(projectToDelete._id)}
          dialogTitle="Delete Project"
          btnTitle="Delete"
          altBtnTitle="No, Thanks"
          message={`Would you like to delete "${projectToDelete.pName}" project?`} />
      )}
    </div>
  );
}

export default Projects;
