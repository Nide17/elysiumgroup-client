import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { Input, Button, Typography } from "@material-tailwind/react"
import { login } from '@/redux/slices/usersSlice'
import Loading from '@/components/utils/Loading'
import Notification from '@/components/utils/Notification'
import { clearErrors, clearSuccess } from '@/redux/slices/alertsSlice'

export function Login() {

  const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val)
  const validPassword = (val) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i.test(val)
  const [errorsState, setErrorsState] = useState([])
  const [state, setState] = useState({ email: '', password: '' })
  const { email, password } = state

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { isLoading } = useSelector(state => state.users)

  useEffect(() => { document.title = "Login" }, [])

  const onChangeHandler = e => {
    setErrorsState([])
    clearSuccess()
    clearErrors()
    setState(prevState => ({ ...prevState, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // VALIDATE
    if (password.length < 8) {
      setErrorsState(['Password must be at least 8 characters long!'])
      return
    }

    if (!validEmail(email)) {
      setErrorsState(['Invalid email!'])
      return
    }

    if (!validPassword(password)) {
      setErrorsState(['Invalid password!'])
      return
    }

    // Attempt to contact
    const result = dispatch(login({ email, password }))

    result.then((res) => {
      if (res.payload) {

        // Redirect to OTP after 2 seconds
        setTimeout(() => {
          navigate('/auth/verifyOTP', { state: { email } })
        }, 2000)
      }
    })

    // Reset fields
    setState({ email: '', password: '' })
  }

  return (
    <section className="m-8 flex gap-4">
      <div className="w-full lg:w-3/5 mt-24">
        <div className="text-center">

          <Typography variant="h2" className="font-bold mb-4">
            Sign In
          </Typography>

          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">
            Enter your email and password to Sign In.
          </Typography>

        </div>
        <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2" onSubmit={handleSubmit}>

          <Notification errorsState={errorsState} progress={null} initFn="login" />

          <div className="mb-1 flex flex-col gap-6">

            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Your email
            </Typography>

            <Input size="lg" placeholder="name@mail.com" className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }} name='email' onChange={onChangeHandler} value={email} />
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Password
            </Typography>

            <Input type="password" size="lg" placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }} name='password' onChange={onChangeHandler} value={password} />

          </div>

          <Button className="mt-6" fullWidth type="submit" disabled={isLoading}>
            {isLoading ? <Loading /> : "Sign In"}
          </Button>

          <div className="flex items-center justify-between gap-2 mt-6">
            <Typography variant="small" className="font-medium text-gray-900">
              <Link to="/auth/forgotPassword" className="text-blue-600 underline">
                Forgot Password
              </Link>
            </Typography>
          </div>

          <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
            Not registered?
            <Link to="/auth/signup" className="text-gray-900 ml-1">
              Create account
            </Link>
          </Typography>
        </form>
      </div>

      <div className="w-2/5 h-full hidden lg:block">
        {isLoading ? <Loading /> : <img src="/img/pattern.png" className="h-full w-full object-cover rounded-3xl" />}
      </div>

    </section>
  )
}

export default Login
