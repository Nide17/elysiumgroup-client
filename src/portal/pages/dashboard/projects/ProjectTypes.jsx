import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardHeader, CardBody, Typography, IconButton } from "@material-tailwind/react";
import { PlusIcon, TrashIcon, PencilSquareIcon, HomeModernIcon } from "@heroicons/react/24/solid";
import { parseISO, format } from 'date-fns';
import { getPTypes, createPType, updatePType, deletePType } from "@/redux/slices/projectTypesSlice"
import { openDialog, closeDialog } from "@/redux/slices/appSlice";
import Loading from '@/components/utils/Loading';
import { DeleteDialog } from '@/portal/widgets/dialogs/DeleteDialog';
import { CreateEditDialog } from '@/portal/widgets/dialogs/CreateEditDialog';

export function ProjectTypes() {

  const dispatch = useDispatch();
  const { isLoading, pTypes } = useSelector(state => state.pTypes);
  const { user } = useSelector(state => state.users);
  const [pTypeToDelete, setPTypeToDelete] = useState(null);
  const [currentpType, setCurrentPType] = useState({ _id: '', typeName: '', createdBy: '', lastUpdatedBy: '', createdAt: '', updatedAt: '' });
  useEffect(() => { dispatch(getPTypes()) }, [dispatch]);

  const openCreateEditDialog = (data) => {

    if (data === null || data._id === '') {
      setCurrentPType({
        typeName: '',
        createdBy: user ? user._id : null,
        lastUpdatedBy: user ? user._id : null,
      });
      dispatch(openDialog());
      return;
    }

    setPTypeToDelete(null);
    setCurrentPType(data);
    dispatch(openDialog());
  };

  const openDeleteDialog = (_id, typeName) => {

    if (_id === null) return;

    setCurrentPType(null);
    setPTypeToDelete({ _id, typeName });
    dispatch(openDialog());
  };

  const handleDelete = (pTypeID) => {
    const result = dispatch(deletePType(pTypeID));

    result.then((res) => {
      if (res.payload) {
        setPTypeToDelete(null);
        dispatch(getPTypes());
      }
      dispatch(closeDialog());
    });
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>

        <CardHeader variant="gradient" color="gray" className="mb-8 p-6 flex flex-row justify-between">
          <Typography variant="h6" color="white">Project types</Typography>
          <IconButton color="blue" className="p-2 cursor-pointer hover:bg-[#F0AD4E] rounded-full" onClick={() => openCreateEditDialog(currentpType)}>
            <PlusIcon className="h-3 w-3 text-white font-bold" />
          </IconButton>
        </CardHeader>

        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["project", "creator", "created at", "updated at", "", ""].map((el, id) => (
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
                {pTypes && pTypes.map(({ _id, typeName, createdBy, lastUpdatedBy, createdAt, updatedAt }, key) => {
                  const className = `py-3 px-2 ${key === pTypes.length - 1 ? "" : "border-b border-blue-gray-50"}`;

                  return (
                    <tr key={_id}>

                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <HomeModernIcon className="h-5 w-5 text-blue-gray-500" />
                          <div>
                            <Typography variant="small" color="blue-gray" className="text-[10px] font-semibold">
                              {typeName ? typeName : "Project Name"}
                            </Typography>
                          </div>
                        </div>
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

                      <td className={className} onClick={() =>
                        openCreateEditDialog({ _id, typeName, createdBy, lastUpdatedBy, createdAt, updatedAt })}>
                        <Typography as="a" href="#" className={`text-[9px] font-semibold text-blue-gray-600
                        ${user.role === 'admin' ? 'visible' : 'hidden'}`}>
                          <PencilSquareIcon className="h-3 w-3 text-blue font-bold" color="blue" />
                        </Typography>
                      </td>

                      <td className={className} onClick={() =>
                        openDeleteDialog(_id, typeName)}>
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
        {pTypeToDelete && pTypeToDelete._id && (
          <DeleteDialog gotoUrl={null}
            action={() => handleDelete(pTypeToDelete._id)}
            dialogTitle="Delete Project Type"
            btnTitle="Delete"
            altBtnTitle="No, Thanks"
            message={`Would you like to delete "${pTypeToDelete.typeName}" project type?`} />
        )}

        {currentpType && (
          <CreateEditDialog
            formData={currentpType}
            functionToCall={currentpType._id ? updatePType : createPType}
            refresh={getPTypes}
            dialogTitle={currentpType && currentpType.typeName !== '' ? `${currentpType.typeName} PType` : "Create PType"}
            btnTitle={currentpType._id ? "Update" : "Create"}
            altBtnTitle="Cancel" />
        )}
      </>
    </div>
  );
}

export default ProjectTypes;
