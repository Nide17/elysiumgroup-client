import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Input, Button, Typography } from "@material-tailwind/react";
import { forgotPassword } from '@/redux/slices/usersSlice';
import Loading from '@/components/utils/Loading';
import Notification from '@/components/utils/Notification';
import { clearErrors, clearSuccess } from '@/redux/slices/alertsSlice';

export function ForgotPassword() {

    const [errorsState, setErrorsState] = useState([]);
    const [email, setEmail] = useState('');

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { isLoading } = useSelector(state => state.users);

    useEffect(() => { document.title = "Forgot password" }, []);

    const onChangeHandler = e => {
        setErrorsState([]);
        clearSuccess();
        clearErrors();
        setEmail(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // VALIDATE
        let validEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
        if (!validEmail) {
            setErrorsState(['Invalid email!']);
            return;
        }

        // Attempt to forgot password
        const result = dispatch(forgotPassword({ email }));

        result.then((res) => {
            if (res.payload.email) {

                // Redirect to dashboard after 3 seconds
                setTimeout(() => {
                    navigate('/auth/resetPassword', { state: { email } })
                }, 3000)
            }
            else {
                setErrorsState([res.payload.message || 'Something went wrong!']);
            }
        })

        // Reset fields
        setEmail('');
    }

    return (
        <section className="m-8 flex gap-4 justify-center items-center">
            <div className="w-full lg:w-3/5 mt-24">
                <div className="text-center">

                    <Typography variant="h2" className="font-bold mb-4 text-[#0070ba]">
                        Forgot password
                    </Typography>

                    <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">
                        Enter your email address to receive a password reset code
                    </Typography>

                </div>
                <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2" onSubmit={handleSubmit}>

                    <Notification errorsState={errorsState} progress={null} initFn="forgotPassword" />
                    <div className="mb-1 flex flex-col gap-6">

                        <Input size="lg" placeholder="Email address" className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{ className: "before:content-none after:content-none", }}
                            type='text' autoComplete='off' autoFocus={true}
                            name='email' value={email} onChange={onChangeHandler} />
                    </div>

                    <Button className="mt-6 bg-[#F0AD4E]" fullWidth type='submit' disabled={isLoading}>
                        {isLoading ? <Loading /> : "Forgot password"}
                    </Button>

                    <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4 flex justify-around">
                        <Link to="/auth/login" className="text-blue-600 underline">
                            Login
                        </Link>

                        <Link to="/auth/signup" className="text-blue-600 underline">
                            Signup
                        </Link>
                    </Typography>
                </form>
            </div>

            <div className="w-2/5 h-full hidden lg:block">
                {isLoading ? <Loading /> : <img src="/img/pattern.png" className="h-full w-full object-cover rounded-3xl" />}
            </div>
        </section>
    );
}

export default ForgotPassword;
