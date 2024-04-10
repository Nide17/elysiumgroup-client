import React, { useState, useEffect } from 'react'
import { Card, Input, Button, Typography, Select, Option, Spinner } from "@material-tailwind/react"
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getClients } from '@/redux/slices/clientsSlice'
import { getPTypes } from '@/redux/slices/projectTypesSlice'
import { getOneProject, updateProject } from '@/redux/slices/projectsSlice'
import DatePicker from './DatePicker'

export function EditProjectForm() {

    const { project, isLoading } = useSelector(state => state.projects)
    const { projectID } = useParams()
    const { clients } = useSelector(state => state.clients)
    const { pTypes } = useSelector(state => state.pTypes)
    const { user } = useSelector(state => state.users)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getClients())
        dispatch(getPTypes())
        dispatch(getOneProject(projectID))
    }, [dispatch, projectID])

    const [pName, setPname] = useState('')
    const [pDescription, setDescription] = useState('')
    const [pLocation, setLocation] = useState('')
    const [pClient, setClient] = useState(null)
    const [pType, setPType] = useState(null)
    const [status, setStatus] = useState('Pending')
    const [pStartDate, setDate] = useState(new Date())
    const statuses = ["Pending", "Ongoing", "Blocked", "Completed", "Abandoned"]

    useEffect(() => {
        if (project) {
            setPname(project.pName || '')
            setDescription(project.pDescription || '')
            setLocation(project.pLocation || '')
            setClient(project.pClient || null)
            setPType(project.pType || null)
            setStatus(project.status || 'Pending')
            setDate(project.pStartDate || new Date())
        }
    }, [project])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const projectData = {
            pName,
            pDescription,
            pLocation,
            pClient,
            pType,
            pStartDate: pStartDate ? pStartDate : new Date(),
            status,
            lastUpdatedBy: user ? user._id : null
        }

        let data = dispatch(updateProject({ id: projectID, data: projectData }))
        data.then((res) => {
            if (res.payload) {

                // Redirect to projects page
                navigate('/dashboard/projects')
            }
        })

        // clear form
        setPname('')
        setDescription('')
        setLocation('')
        setClient(null)
        setPType(null)
        setStatus('Pending')
        setDate(new Date())
    }

    return (

        isLoading ? <Spinner color="blue" /> :

            project && <Card color="transparent" shadow={false}>

                <Typography variant="h4" color="blue-gray">
                    Edit "{project.pName}" project
                </Typography>

                <Typography color="gray" className="mt-1 font-normal">
                    Provide some details below ...
                </Typography>

                <form className="mt-8 mb-2 w-full max-w-screen-lg" onSubmit={handleSubmit}>

                    <div className="my-4 flex flex-col gap-6">
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Project Name
                        </Typography>
                        <Input size="lg" placeholder="Project Name ..." className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{ className: "before:content-none after:content-none" }}
                            onChange={(e) => setPname(e.target.value)} name='pName' value={pName} />
                    </div>

                    <div className="my-4 flex flex-col gap-6">
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Project Description
                        </Typography>
                        <Input size="lg" placeholder="Project Description ..." className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{ className: "before:content-none after:content-none" }} onChange={(e) => setDescription(e.target.value)}
                            name='pDescription' value={pDescription} />
                    </div>

                    <div className="my-4 flex flex-col gap-6">
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Project Location
                        </Typography>
                        <Input size="lg" placeholder="Project Location ..." className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{ className: "before:content-none after:content-none" }}

                            onChange={(e) => setLocation(e.target.value)} name='pLocation' value={pLocation} />
                    </div>

                    <div className="my-4 flex flex-col gap-6">

                        <Typography variant="h6" color="blue-gray" className="-mb-3">Project Client</Typography>

                        {!isLoading && clients ? (
                            <Select placeholder="Select a client" className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                                labelProps={{ className: "before:content-none after:content-none", }}
                                menuProps={{ className: "h-48" }} value={pClient} onChange={(e) => setClient(e)}>
                                {clients.map(({ _id, clientName, clientLogo }) => (
                                    <Option key={_id} value={_id}>
                                        <div className="flex items-center gap-x-2">
                                            <img src={clientLogo ? clientLogo.url : '/img/team-2.jpeg'}
                                                alt={clientName} className="h-8 w-8 rounded" />
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
                            <Select placeholder="Select a type" className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                                labelProps={{ className: "before:content-none after:content-none", }} menuProps={{ className: "h-48" }} value={pType}
                                onChange={(e) => setPType(e)}>
                                {pTypes.map(({ _id, typeName }) => (
                                    <Option key={_id} value={_id}>
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
                        <Select placeholder="Select a status" className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{ className: "before:content-none after:content-none", }}
                            menuProps={{ className: "h-48" }} value={status} onChange={(e) => setStatus(e)}>

                            {statuses.map((status, id) => (
                                <Option key={id} value={status}>
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
    )
}

export default EditProjectForm
