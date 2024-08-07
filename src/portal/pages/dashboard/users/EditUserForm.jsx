import React, { useState, useEffect } from 'react';
import { Card, Input, Button, Typography, Select, Option, Spinner, Switch } from "@material-tailwind/react";
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser, getOneUser } from '@/redux/slices/usersSlice';

export function EditUserForm() {
    const { isLoading, selectedUser } = useSelector(state => state.users);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userID } = useParams();

    const [title, setTitle] = useState('');
    const [department, setDepartment] = useState('');
    const [role, setRole] = useState('user');
    const [active, setActive] = useState(true);
    const roles = ["user", "admin"];

    useEffect(() => {
        dispatch(getOneUser(userID));
    }, [dispatch, userID]);

    useEffect(() => {
        if (selectedUser) {
            setTitle(selectedUser.title || '');
            setDepartment(selectedUser.department || '');
            setRole(selectedUser.role || 'user');
            setActive(selectedUser.active || true);
        }
    }, [selectedUser]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await dispatch(updateUser({ _id: userID, title, department, role, active }));
        if (result.payload) {
            navigate('/dashboard/users');
        }
        // Clear form
        setTitle('');
        setDepartment('');
        setRole('user');
        setActive(true);
    };

    if (isLoading) return <Spinner color="blue" />;

    return (
        <div className="mt-12 mb-8 flex flex-col gap-12">
            {selectedUser && (
                <Card color="transparent" shadow={false}>
                    <Typography variant="h4" color="blue-gray">
                        Edit {selectedUser.name}
                    </Typography>
                    <Typography color="gray" className="mt-1 font-normal">
                        Provide some details below ...
                    </Typography>
                    <form className="mt-8 mb-2 w-full max-w-screen-lg" onSubmit={handleSubmit}>
                        <div className="my-4 flex flex-col gap-6">
                            <Typography variant="h6" color="blue-gray" className="-mb-3">
                                Title
                            </Typography>
                            <Input
                                size="lg"
                                placeholder="User Title ..."
                                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                                labelProps={{ className: "before:content-none after:content-none" }}
                                onChange={(e) => setTitle(e.target.value)}
                                name="title"
                                value={title}
                            />
                        </div>

                        <div className="my-4 flex flex-col gap-6">
                            <Typography variant="h6" color="blue-gray" className="-mb-3">
                                Department
                            </Typography>
                            <Input
                                size="lg"
                                placeholder="User Department ..."
                                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                                labelProps={{ className: "before:content-none after:content-none" }}
                                onChange={(e) => setDepartment(e.target.value)}
                                name="department"
                                value={department}
                            />
                        </div>

                        <div className="my-4 flex flex-col gap-6">
                            <Typography variant="h6" color="blue-gray" className="-mb-3">
                                User Role
                            </Typography>
                            <Select
                                placeholder="Select a role"
                                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                                labelProps={{ className: "before:content-none after:content-none" }}
                                menuProps={{ className: "h-48" }}
                                value={role}
                                onChange={(e) => setRole(e)}
                            >
                                {roles.map((rl) => (
                                    <Option key={rl} value={rl}>
                                        <div className="flex items-center gap-x-2">
                                            {rl}
                                        </div>
                                    </Option>
                                ))}
                            </Select>
                        </div>

                        <div className="my-4 flex flex-col gap-6">
                            <Typography variant="h6" color="blue-gray" className="-mb-3">
                                User Active
                            </Typography>
                            <Switch checked={active} onChange={(e) => setActive(e.target.checked)} />
                        </div>

                        <Button type="submit" color="blue-gray">
                            Submit
                        </Button>
                    </form>
                </Card>
            )}
        </div>
    );
}

export default EditUserForm;
