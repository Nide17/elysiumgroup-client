import React, { useState } from 'react'
import { contactUs } from '@/redux/slices/contactsSlice'
import { clearErrors, clearSuccess } from '@/redux/slices/alertsSlice'
import { useDispatch } from 'react-redux'
import Notification from '../utils/Notification'

const Contact = () => {
    const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val)

    const dispatch = useDispatch()
    const [state, setState] = useState({ contactName: '', contactEmail: '', contactMessage: '' })

    // Errors state on form
    const [errorsState, setErrorsState] = useState([])

    const onChangeHandler = e => {
        setErrorsState([])
        clearSuccess()
        clearErrors()
        const { name, value } = e.target
        setState(prevState => ({ ...prevState, [name]: value }));
    }

    const onContact = e => {
        e.preventDefault()

        const { contactName, contactEmail, contactMessage } = state

        // VALIDATE
        if (contactName.length < 4 || contactMessage.length < 4) {
            setErrorsState(['Insufficient info!'])
            return
        }

        if (!validEmail(contactEmail)) {
            setErrorsState(['Invalid email!'])
            return
        }

        // Attempt to contact
        dispatch(contactUs({ contactName, contactEmail, contactMessage }))

        // Reset fields
        setState({ contactName: '', contactEmail: '', contactMessage: '' })
    }

    return (
        <section className="contacts-section py-0 py-lg-4" id="projects">
            <div className="container">

                <h1 className="mt-8 text-center font-weight-bolder text-2xl md:text-5xl">
                    Reach Out to Us.
                </h1>

                <p className="mb-12 text-sm md:text-xl text-center mt-0">
                    Teamwork | Ethical | Synergy | Professionalism | Innovation | Dynamism
                </p>

                <div className="flex justify-center items-center flex-col w-full md:w-3/4 lg:w-1/2 mx-auto">

                    <Notification errorsState={errorsState} progress={null} initFn="contactUs" />

                    <form className="w-100 md:w-50 bg-white border rounded px-2 md:px-8 pt-2 md:pt-6 pb-2 md:pb-8 my-4 md:my-16" onSubmit={onContact}>

                        <input className="border rounded w-full py-2 px-3 text-gray-700 mb-3" name='contactName'
                            type="text" placeholder="Your Name" onChange={onChangeHandler} value={state.contactName} />

                        <input className="border rounded w-full py-2 px-3 text-gray-700 mb-3" name='contactEmail'
                            type="email" placeholder="Your Email" onChange={onChangeHandler} value={state.contactEmail} />

                        <textarea className="min-h-[100px] w-full resize-none rounded-[7px] 
                        border border-blue-gray-200 mb-2 border-t-transparent bg-transparent px-3 py-2.5 text-sm
                         font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border 
                         placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 
                         focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0
                         disabled:bg-blue-gray-50 focus:shadow-outline"
                            placeholder="Your Message" name='contactMessage' onChange={onChangeHandler} value={state.contactMessage}></textarea>

                        <button className="bg-[#F0AD4E] hover:bg-blue-400 text-white font-bold py-2 px-4 rounded mx-auto" type="submit">
                            Send
                        </button>
                    </form>
                </div>
            </div>
        </section>)
}


export default Contact
