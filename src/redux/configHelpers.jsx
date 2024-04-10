import axios from 'axios'
import { returnErrors, returnSuccess } from './slices/alertsSlice'
import toast from 'react-hot-toast'

// Axios instance
const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE === "development" ? import.meta.env.VITE_LOCAL_URL : import.meta.env.VITE_API_URL
})

// Function to format action type
const formatActionType = (actionType) => {
    const splittedWords = actionType.match(/[A-Z]?[a-z]+/g)

    // Lowercase all words
    splittedWords.forEach((word, index) => { splittedWords[index] = word.toLowerCase() })

    // First letter of first word to uppercase
    splittedWords[0] = splittedWords[0].charAt(0).toUpperCase() + splittedWords[0].slice(1)

    // Join all words to form a sentence without commas
    return splittedWords.join(' ')
}

// List of action types that doesn't require a reload
const noReloadActionTypes = ['verifyOTP', 'login', 'signup', 'logout', 'clearErrors', 'clearSuccess', 'returnSuccess', 'returnErrors']

// API call helper function to make async actions with createAsyncThunk
export const apiCallHelper = async (url, method, body, getState, dispatch, actionType) => {
    const formattedActionType = formatActionType(actionType)

    try {
        
        if (method === 'get' || method === 'delete') {
            console.log('apiCallHelper: ', actionType, url)
            const response = await axiosInstance[method](url, { headers: { 'Content-Type': 'application/json' }, withCredentials: true })
            // console.log(`apiCallHelper ${method+url} response`, response)
            method === 'delete' && toast(response.data.message, { icon: '❇️', style: { borderRadius: '10px', background: '#333', color: '#fff' } })
            dispatch(returnSuccess({ msg: `${formattedActionType} success!`, status: response.status, id: actionType }))
            return response.data
        }

        else {
            console.log('apiCallHelper: ', body, actionType)
            const response = await axiosInstance[method](url, body, { headers: { 'Content-Type': 'application/json' }, withCredentials: true })
            console.log('apiCallHelper response', response)
            // toast(response.data.message, { icon: '❇️', style: { borderRadius: '10px', background: '#333', color: '#fff' } })
            dispatch(returnSuccess({ msg: `${formattedActionType} success!`, status: response.status, id: actionType }))
            console.log('apiCallHelper response.data', response.data)
            return response.data
        }

    } catch (err) {
        console.log('apiCallHelper err', err)
        toast(err.response.data.message, { icon: '⭕', style: { borderRadius: '10px', background: '#333', color: '#fff' } })
        dispatch(returnErrors({ msg: err.response.data.message, status: err.response.status, id: actionType }))
        return Promise.reject(err.response.data)
    }
}


// API call helper function to make async actions with createAsyncThunk for file uploads
export const apiCallHelperUpload = async (url, method, formData, getState, dispatch, actionType) => {

    if (formData === null) {
        toast('No form data given!', { icon: '⭕', style: { borderRadius: '10px', background: '#333', color: '#fff' } })
        return Promise.reject(new Error('No form data given!'))
    }

    const formattedActionType = formatActionType(actionType)

    try {
        const response = await axiosInstance[method](url, formData, { headers: { 'Content-Type': 'multipart/form-data' }, withCredentials: true })
        toast(response.data.message, { icon: '❇️', style: { borderRadius: '10px', background: '#333', color: '#fff' } })
        dispatch(returnSuccess({ msg: `${formattedActionType} success!`, status: response.status, id: actionType }))
        return response.data

    } catch (err) {
        toast(err.response.data.message, { icon: '⭕', style: { borderRadius: '10px', background: '#333', color: '#fff' } })
        dispatch(returnErrors({ msg: err.response.data.message, status: err.response.status, id: actionType }))
        return Promise.reject(err.response.data)
    }
}
