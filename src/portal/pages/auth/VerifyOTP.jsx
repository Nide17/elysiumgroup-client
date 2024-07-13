import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Input, Button, Typography } from "@material-tailwind/react";
import { verifyOTP } from '@/redux/slices/usersSlice';
import Loading from '@/components/utils/Loading';
import Notification from '@/components/utils/Notification';
import { clearErrors, clearSuccess } from '@/redux/slices/alertsSlice';
import toast from 'react-hot-toast';

export function VerifyOTP() {

    const [errorsState, setErrorsState] = useState([]);
    const [userOTP, setUserOTP] = useState('');

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { isLoading } = useSelector(state => state.users);
    let { state } = useLocation();
    useEffect(() => { document.title = "Verify OTP" }, []);

    const onChangeHandler = e => {
        setErrorsState([]);
        clearSuccess();
        clearErrors();
        setUserOTP(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if state exists before accessing email
        if (!state || !state.email) {
            toast.error('Invalid request');
            return;
        }

        // VALIDATE
        if (userOTP.length !== 6 || isNaN(userOTP)) {
            setErrorsState(['Invalid code!']);
            return;
        }

        // Attempt to verify
        const result = dispatch(verifyOTP({
            email: state.email,
            userOTP
        }));

        result.then((res) => {
            if (res.payload.user) {
                // Redirect to dashboard after 2 seconds
                setTimeout(() => {
                    navigate('/dashboard/home')
                }, 2000)
            }
            else {
                setTimeout(() => {
                    navigate('/auth/login')
                }, 2000)
            }
        })

        // Reset fields
        setUserOTP('');
    }

    return (
        <section className="m-8 flex gap-4 justify-center items-center">
            <div className="w-full lg:w-3/5 mt-24">
                <div className="text-center">

                    <Typography variant="h2" className="font-bold mb-4 text-[#0070ba]">
                        Verify your account
                    </Typography>

                    <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">
                        Enter the 6 digits code sent to your email here ...
                    </Typography>

                </div>
                <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2" onSubmit={handleSubmit}>

                    <Notification errorsState={errorsState} progress={null} initFn="verifyOTP" />
                    <div className="mb-1 flex flex-col gap-6">

                        <Input size="lg" placeholder="OTP code" className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{ className: "before:content-none after:content-none", }}
                            type='text' maxLength={6} minLength={6} autoComplete='off' autoFocus={true}
                            name='userOTP' value={userOTP} onChange={onChangeHandler} />
                    </div>

                    <Button className="mt-6 bg-[#F0AD4E]" fullWidth type='submit' disabled={isLoading}>
                        {isLoading ? <Loading /> : "Verify"}
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

export default VerifyOTP;
