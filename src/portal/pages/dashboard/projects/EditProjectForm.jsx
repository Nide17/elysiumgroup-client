import React, { useState, useEffect } from 'react';
import { Card, Input, Button, Typography, Select, Option, Spinner } from "@material-tailwind/react";
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getClients } from '@/redux/slices/clientsSlice';
import { getPTypes } from '@/redux/slices/projectTypesSlice';
import { getOneProject, updateProject } from '@/redux/slices/projectsSlice';
import DatePicker from './DatePicker';

export function EditProjectForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { projectID } = useParams();

    const { project, isLoading } = useSelector(state => state.projects);
    const { clients } = useSelector(state => state.clients);
    const { pTypes } = useSelector(state => state.pTypes);
    const { user } = useSelector(state => state.users);

    const [pName, setPName] = useState('');
    const [pDescription, setPDescription] = useState('');
    const [pLocation, setPLocation] = useState('');
    const [pClient, setPClient] = useState(null);
    const [pType, setPType] = useState(null);
    const [status, setStatus] = useState('Pending');
    const [pStartDate, setPStartDate] = useState(new Date());

    const statuses = ["Pending", "Ongoing", "Blocked", "Completed", "Abandoned"];

    useEffect(() => {
        dispatch(getClients());
        dispatch(getPTypes());
        dispatch(getOneProject(projectID));
    }, [dispatch, projectID]);

    useEffect(() => {
        if (project) {
            setPName(project.pName || '');
            setPDescription(project.pDescription || '');
            setPLocation(project.pLocation || '');
            setPClient(project.pClient || null);
            setPType(project.pType || null);
            setStatus(project.status || 'Pending');
            setPStartDate(project.pStartDate ? new Date(project.pStartDate) : new Date());
        }
    }, [project]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const projectData = {
            pName,
            pDescription,
            pLocation,
            pClient,
            pType,
            pStartDate,
            status,
            lastUpdatedBy: user ? user._id : null
        };

        try {
            const response = await dispatch(updateProject({ id: projectID, data: projectData }));
            if (response.payload) {
                navigate('/dashboard/projects');
            }
        } catch (error) {
            console.error('Failed to update project', error);
        }
    };

    if (isLoading) return <Spinner color="blue" />;

    return (
        project && (
            <Card color="transparent" shadow={false}>
                <Typography variant="h4" color="blue-gray">
                    Edit "{project.pName}" Project
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
                            onChange={(e) => setPName(e.target.value)}
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
                            onChange={(e) => setPDescription(e.target.value)}
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
                            onChange={(e) => setPLocation(e.target.value)}
                            value={pLocation}
                        />
                    </div>

                    <div className="my-4 flex flex-col gap-6">
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Project Client
                        </Typography>
                        {!isLoading && clients ? (
                            <Select
                                placeholder="Select a client"
                                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                                value={pClient}
                                onChange={(e) => setPClient(e)}
                            >
                                {clients.map(({ _id, clientName, clientLogo }) => (
                                    <Option key={_id} value={_id}>
                                        <div className="flex items-center gap-x-2">
                                            <img
                                                src={clientLogo ? clientLogo.url : '/img/team-2.jpeg'}
                                                alt={clientName}
                                                className="h-8 w-8 rounded"
                                            />
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
                        <DatePicker date={pStartDate} setDate={setPStartDate} />
                    </div>

                    <div className="my-4 flex flex-col gap-6">
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Project Type
                        </Typography>
                        {pTypes ? (
                            <Select
                                placeholder="Select a type"
                                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                                value={pType}
                                onChange={(e) => setPType(e)}
                            >
                                {pTypes.map(({ _id, typeName }) => (
                                    <Option key={_id} value={_id}>
                                        {typeName}
                                    </Option>
                                ))}
                            </Select>
                        ) : (
                            <Typography variant="small" color="gray">Loading project types...</Typography>
                        )}
                    </div>

                    <div className="my-4 flex flex-col gap-6">
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Project Status
                        </Typography>
                        <Select
                            placeholder="Select a status"
                            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                            value={status}
                            onChange={(e) => setStatus(e)}
                        >
                            {statuses.map((status, index) => (
                                <Option key={index} value={status}>
                                    {status}
                                </Option>
                            ))}
                        </Select>
                    </div>

                    <Button type="submit" color="blue-gray">
                        Submit
                    </Button>
                </form>
            </Card>
        )
    );
}

export default EditProjectForm;
