import React, { useState, useEffect } from 'react';
import { Card, Input, Button, Typography, Select, Option } from "@material-tailwind/react";
import { useDispatch, useSelector } from 'react-redux';
import { getClients } from '@/redux/slices/clientsSlice';
import { getPTypes } from '@/redux/slices/projectTypesSlice';
import { createProject } from '@/redux/slices/projectsSlice';
import DatePicker from './DatePicker';
import { openDialog } from "@/redux/slices/appSlice";
import { ConfirmDialog } from '@/portal/widgets/dialogs/ConfirmDialog';

export function AddProjectForm() {

    const { clients, isLoading } = useSelector(state => state.clients);
    const { user } = useSelector(state => state.users)
    const { pTypes } = useSelector(state => state.pTypes);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getClients());
        dispatch(getPTypes());
    }, [dispatch]);

    const [projectID, setProjectID] = useState('');
    const [pName, setPname] = useState('');
    const [pDescription, setDescription] = useState('');
    const [pLocation, setLocation] = useState('');
    const [pClient, setClient] = useState(null);
    const [pType, setPType] = useState(null);
    const [status, setStatus] = useState('Pending');
    const [pStartDate, setDate] = useState(null);
    const statuses = ["Pending", "Ongoing", "Blocked", "Completed", "Abandoned"];

    const handleSubmit = async (e) => {
        e.preventDefault();

        const projectData = { pName, pDescription, pLocation, pClient, pType, pStartDate: pStartDate ? pStartDate : new Date(), status, createdBy: user && user._id };

        let data = dispatch(createProject(projectData));
        data.then((res) => {
            if (res.payload) {
                dispatch(openDialog());
                setProjectID(res.payload.project._id);
            }
        });

        // clear form
        setPname('');
        setDescription('');
        setLocation('');
        setClient(null);
        setPType(null);
        setStatus('Pending');
        setDate(null);
    };

    return (
        <Card color="transparent" shadow={false}>

            <ConfirmDialog gotoUrl={projectID ? `add-images/${projectID}` : null} action='' dialogTitle="Project Created" btnTitle="Add Images"
                altBtnTitle="No, Thanks" message="Would you like to add images to this project?" cancelUrl='/dashboard/projects/#' />

            <Typography variant="h4" color="blue-gray">
                Add a new project
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
                Provide some details below ...
            </Typography>

            <form className="mt-8 mb-2 w-full max-w-screen-lg" onSubmit={handleSubmit}>

                <div className="my-4 flex flex-col gap-6">
                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                        Project Name
                    </Typography>
                    <Input
                        size="lg"
                        placeholder="Project Name ..."
                        className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{ className: "before:content-none after:content-none" }}
                        onChange={(e) => setPname(e.target.value)}
                        name='pName'
                        value={pName}
                    />
                </div>

                <div className="my-4 flex flex-col gap-6">
                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                        Project Description
                    </Typography>
                    <Input
                        size="lg"
                        placeholder="Project Description ..."
                        className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{ className: "before:content-none after:content-none" }}
                        onChange={(e) => setDescription(e.target.value)}
                        name='pDescription'
                        value={pDescription}
                    />
                </div>

                <div className="my-4 flex flex-col gap-6">
                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                        Project Location
                    </Typography>
                    <Input
                        size="lg"
                        placeholder="Project Location ..."
                        className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{ className: "before:content-none after:content-none" }}
                        onChange={(e) => setLocation(e.target.value)}
                        name='pLocation'
                        value={pLocation}
                    />
                </div>

                <div className="my-4 flex flex-col gap-6">

                    <Typography variant="h6" color="blue-gray" className="-mb-3">Project Client</Typography>

                    {!isLoading && clients ? (
                        <Select
                            placeholder="Select a client"
                            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{ className: "before:content-none after:content-none", }}
                            menuProps={{ className: "h-48" }}>
                            {clients.map(({ _id, clientName, clientLogo }) => (
                                <Option key={_id} value={_id} onClick={() => setClient(_id)}>
                                    <div className="flex items-center gap-x-2">
                                        <img src={clientLogo} alt={clientName} className="h-8 w-8 rounded" />
                                        {clientName}
                                    </div>
                                </Option>
                            ))}
                        </Select>
                    ) : (
                        <Typography variant="small" color="gray">Loading clients...</Typography>
                    )}
                </div>

                <div className="my-4 flex flex-col gap-6">
                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                        Project Start Date
                    </Typography>

                    <DatePicker date={pStartDate} setDate={setDate} />
                </div>

                <div className="my-4 flex flex-col gap-6">

                    <Typography variant="h6" color="blue-gray" className="-mb-3">Project Type</Typography>

                    {pTypes ? (
                        <Select
                            placeholder="Select a type"
                            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{ className: "before:content-none after:content-none", }}
                            menuProps={{ className: "h-48" }}>
                            {pTypes.map(({ _id, typeName }) => (
                                <Option key={_id} value={_id} onClick={() => setPType(_id)}>
                                    <div className="flex items-center gap-x-2">
                                        {typeName}
                                    </div>
                                </Option>
                            ))}
                        </Select>
                    ) : (
                        <Typography variant="small" color="gray">Loading project types...</Typography>
                    )}
                </div>

                <div className="my-4 flex flex-col gap-6">

                    <Typography variant="h6" color="blue-gray" className="-mb-3">Project Status</Typography>
                    <Select
                        placeholder="Select a status"
                        className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{ className: "before:content-none after:content-none", }}
                        menuProps={{ className: "h-48" }}>

                        {statuses.map((status, id) => (
                            <Option key={id} value={status} onClick={() => setStatus(status)}>
                                <div className="flex items-center gap-x-2">
                                    {status}
                                </div>
                            </Option>
                        ))}
                    </Select>
                </div>

                <Button type="submit" color="blue-gray">
                    Submit
                </Button>
            </form>
        </Card>
    );
};

export default AddProjectForm;
