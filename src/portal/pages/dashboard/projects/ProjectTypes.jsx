import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardHeader, CardBody, Typography, IconButton } from "@material-tailwind/react";
import { PlusIcon, TrashIcon, PencilSquareIcon, HomeModernIcon } from "@heroicons/react/24/solid";
import { parseISO, format } from 'date-fns';
import { getPTypes, createPType, updatePType, deletePType } from "@/redux/slices/projectTypesSlice";
import { openDialog, closeDialog } from "@/redux/slices/appSlice";
import Loading from '@/components/utils/Loading';
import { DeleteDialog } from '@/portal/widgets/dialogs/DeleteDialog';
import { CreateEditDialog } from '@/portal/widgets/dialogs/CreateEditDialog';

export function ProjectTypes() {
  const dispatch = useDispatch();
  const { isLoading, pTypes } = useSelector(state => state.pTypes);
  const { user } = useSelector(state => state.users);
  const [pTypeToDelete, setPTypeToDelete] = useState(null);
  const [currentpType, setCurrentPType] = useState({
    _id: '',
    typeName: '',
    createdBy: '',
    lastUpdatedBy: '',
    createdAt: '',
    updatedAt: ''
  });

  useEffect(() => {
    dispatch(getPTypes());
  }, [dispatch]);

  const openCreateEditDialog = useCallback((data) => {
    if (!data?._id) {
      setCurrentPType({
        typeName: '',
        createdBy: user?._id || null,
        lastUpdatedBy: user?._id || null,
      });
    } else {
      setCurrentPType(data);
    }
    dispatch(openDialog());
  }, [dispatch, user]);

  const openDeleteDialog = useCallback((_id, typeName) => {
    if (_id) {
      setPTypeToDelete({ _id, typeName });
      dispatch(openDialog());
    }
  }, [dispatch]);

  const handleDelete = useCallback((pTypeID) => {
    dispatch(deletePType(pTypeID)).then((res) => {
      if (res.payload) {
        setPTypeToDelete(null);
        dispatch(getPTypes());
      }
      dispatch(closeDialog());
    });
  }, [dispatch]);

  const tableColumns = useMemo(() => [
    "project", "creator", "created at", "updated at", "", ""
  ], []);

  const renderTableBody = () => {
    if (isLoading) {
      return <Loading />;
    }

    return (
      <tbody>
        {pTypes.map(({ _id, typeName, createdBy, createdAt, updatedAt }, key) => {
          const className = `py-3 px-2 ${key === pTypes.length - 1 ? "" : "border-b border-blue-gray-50"}`;

          return (
            <tr key={_id}>
              <td className={className}>
                <div className="flex items-center gap-4">
                  <HomeModernIcon className="h-5 w-5 text-blue-gray-500" />
                  <div>
                    <Typography variant="small" color="blue-gray" className="text-[10px] font-semibold">
                      {typeName || "Project Name"}
                    </Typography>
                  </div>
                </div>
              </td>
              <td className={className}>
                <Typography className="text-[9px] font-semibold text-blue-gray-600">
                  {createdBy?.name || 'N/A'}
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
              {user.role === 'admin' && (
                <>
                  <td className={className} onClick={() =>
                    openCreateEditDialog({ _id, typeName, createdBy, createdAt, updatedAt })}>
                    <Typography as="a" href="#" className="text-[9px] font-semibold text-blue-gray-600">
                      <PencilSquareIcon className="h-3 w-3 text-blue font-bold" />
                    </Typography>
                  </td>
                  <td className={className} onClick={() =>
                    openDeleteDialog(_id, typeName)}>
                    <Typography as="a" href="#" className="text-[9px] font-semibold text-blue-gray-600">
                      <TrashIcon className="h-3 w-3 text-red font-bold" />
                    </Typography>
                  </td>
                </>
              )}
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
          <Typography variant="h6" color="white">Project Types</Typography>
          <IconButton
            color="blue"
            className="p-2 cursor-pointer hover:bg-[#F0AD4E] rounded-full"
            onClick={() => openCreateEditDialog(null)}
          >
            <PlusIcon className="h-3 w-3 text-white font-bold" />
          </IconButton>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {tableColumns.map((col, id) => (
                  <th key={id} className="border-b border-blue-gray-50 py-3 pl-2 pr-5 text-left">
                    <Typography variant="small" className="text-[9px] font-bold uppercase text-blue-gray-400">
                      {col}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            {renderTableBody()}
          </table>
        </CardBody>
      </Card>

      {pTypeToDelete && pTypeToDelete._id && (
        <DeleteDialog
          gotoUrl={null}
          action={() => handleDelete(pTypeToDelete._id)}
          dialogTitle="Delete Project Type"
          btnTitle="Delete"
          altBtnTitle="No, Thanks"
          message={`Would you like to delete "${pTypeToDelete.typeName}" project type?`}
        />
      )}

      {currentpType && (
        <CreateEditDialog
          formData={currentpType}
          functionToCall={currentpType._id ? updatePType : createPType}
          refresh={getPTypes}
          dialogTitle={currentpType.typeName ? `${currentpType.typeName} PType` : "Create PType"}
          btnTitle={currentpType._id ? "Update" : "Create"}
          altBtnTitle="Cancel"
        />
      )}
    </div>
  );
}

export default ProjectTypes;
