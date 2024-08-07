import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { Input, Checkbox, Button, Typography } from "@material-tailwind/react"
import { signup } from '@/redux/slices/usersSlice'
import Loading from '@/components/utils/Loading'
import Notification from '@/components/utils/Notification'
import { clearErrors, clearSuccess } from '@/redux/slices/alertsSlice'


export function Signup() {

  const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val)
  const validPassword = (val) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i.test(val)
  const [errorsState, setErrorsState] = useState([])
  const [terms, setTerms] = useState(false)
  const [state, setState] = useState({ name: '', email: '', password: '' })
  const { name, email, password } = state

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isLoading } = useSelector(state => state.users)

  useEffect(() => { document.title = "Signup" }, [])

  const onChangeHandler = e => {
    setErrorsState([])
    clearSuccess()
    clearErrors()
    if (e.target.name === 'terms') setTerms(!terms)
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // VALIDATE
    if (name.length < 4 || password.length < 4) {
      setErrorsState(['Please fill all fields!'])
      return
    }

    if (!validEmail(email)) {
      setErrorsState(['Invalid email!'])
      return
    }

    if (!validPassword(password)) {
      setErrorsState(['Password must contain at least one uppercase, lowercase, number, special character, and have at least 8 characters!'])
      return
    }

    if (!terms) {
      setErrorsState(['Please agree to the terms and conditions!'])
      return
    }

    // Attempt to signup
    const result = dispatch(signup({ name, email, password }))

    result.then((res) => {
      if (res.payload) {

        // Redirect to OTP after 2 seconds
        setTimeout(() => {
          navigate('/auth/verifyOTP', { state: { email } })
        }, 2000) 
      }
    })

    // Reset fields
    setState({ name: '', email: '', password: '' })
    setTerms(false)
  }

  return (
    <section className="m-8 flex">

      <div className="w-2/5 h-full hidden lg:block">
        {
          isLoading ? <Loading /> : <img src="/img/pattern.png" className="h-full w-full object-cover rounded-3xl" />
        }
      </div>

      <div className="w-full lg:w-3/5 flex flex-col items-center justify-center">
        <div className="text-center">

          <Typography variant="h2" className="font-bold mb-4">
            Sign up Today
          </Typography>

          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">
            Enter your name, email, and password to sign up.
          </Typography>
        </div>

        <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2" onSubmit={handleSubmit}>

          <Notification errorsState={errorsState} progress={null} initFn="signup" />

          <div className="my-2 mt-4 flex flex-col gap-6">

            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Your name
            </Typography>

            <Input size="lg" placeholder="John Doe" className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{ className: "before:content-none after:content-none" }}
              name='name' onChange={onChangeHandler} value={name} />

            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Your email
            </Typography>

            <Input size="lg" placeholder="name@mail.com" className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{ className: "before:content-none after:content-none" }}
              name='email' onChange={onChangeHandler} value={email} />

            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Password
            </Typography>

            <Input type="password" size="lg" placeholder="********" className=" !border-t-blue-gray-200 focus:!border-t-gray-900" labelProps={{ className: "before:content-none after:content-none", }}
              name='password' onChange={onChangeHandler} value={password} />
          </div>

          <Checkbox
            ripple={false}
            label={
              <Typography variant="small" color="gray"
                className="flex items-center justify-start font-medium">
                I agree the&nbsp;&nbsp;
                <a href="#"
                  className="font-normal text-black transition-colors hover:text-gray-900 underline">
                  Terms and Conditions
                </a>
              </Typography>
            }

            containerProps={{ className: "-ml-2.5 hover:before:opacity-0" }}
            checked={terms} onChange={onChangeHandler} name="terms" />

          <Button className="mt-6" fullWidth type="submit">
            Sign up Now
          </Button>

          <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
            Already have an account?

            <Link to="/auth/login" className="text-gray-900 ml-1">
              Sign in
            </Link>

          </Typography>
        </form>

      </div>
    </section>
  )
}

export default Signup
