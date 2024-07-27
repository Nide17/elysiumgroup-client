import React, { useEffect, useState } from "react"
import { Routes, Route, useNavigate } from "react-router-dom"
import { Login, Signup, VerifyOTP, ForgotPassword, ResetPassword } from "@/portal/pages/auth"
import Loading from '@/components/utils/Loading';
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "@/redux/slices/usersSlice"

export function Auth() {

  const { isLoading, user, } = useSelector(state => state.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Add a new state to track if the auth check has completed
  const [authCheckCompleted, setAuthCheckCompleted] = useState(false);

  useEffect(() => {
    dispatch(loadUser()).then(() => {
      setAuthCheckCompleted(true)
    });
  }, [dispatch]);

  useEffect(() => {
    if (!isLoading && authCheckCompleted && user) {
      navigate("/dashboard/home");
    }
  }, [isLoading, navigate, authCheckCompleted]);

  if (isLoading || !authCheckCompleted) {
    return <Loading />;
  }
  
  return (
    <div className="relative min-h-screen w-full">

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verifyOTP" element={<VerifyOTP />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
      </Routes>
    </div>
  )
}

Auth.displayName = "/src/portal/layout/Auth.jsx"

export default Auth
