import axios from 'axios';
import { returnErrors, returnSuccess } from './slices/alertsSlice';
import toast from 'react-hot-toast';

// Axios instance
const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE === "development" ? import.meta.env.VITE_LOCAL_URL : import.meta.env.VITE_API_URL
});

// Function to format action type
const formatActionType = (actionType) => {
    const splittedWords = actionType.match(/[A-Z]?[a-z]+/g).map(word => word.toLowerCase());
    splittedWords[0] = splittedWords[0].charAt(0).toUpperCase() + splittedWords[0].slice(1);
    return splittedWords.join(' ');
};

// List of action types that don't require a reload
const noReloadActionTypes = ['verifyOTP', 'login', 'signup', 'logout', 'clearErrors', 'clearSuccess', 'returnSuccess', 'returnErrors'];

// Helper function to handle success and errors
const handleResponse = (response, actionType, dispatch) => {
    const formattedActionType = formatActionType(actionType);
    dispatch(returnSuccess({ msg: `${formattedActionType} success!`, status: response.status, id: actionType }));
    // toast(response.data.message, { icon: '❇️', style: { borderRadius: '10px', background: '#333', color: '#fff' } });
    return response.data;
};

const handleError = (err, actionType, dispatch) => {
    dispatch(returnErrors({ msg: err.response.data.message, status: err.response.status, id: actionType }));
    toast(err.response.data.message, { icon: '⭕', style: { borderRadius: '10px', background: '#333', color: '#fff' } });
    return Promise.reject(err.response.data);
};

// API call helper function to make async actions with createAsyncThunk
export const apiCallHelper = async (url, method, body, getState, dispatch, actionType) => {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        };
        const response = method === 'get' || method === 'delete'
            ? await axiosInstance[method](url, config)
            : await axiosInstance[method](url, body, config);

        if (method === 'delete') {
            toast(response.data.message, { icon: '❇️', style: { borderRadius: '10px', background: '#333', color: '#fff' } });
        }

        return handleResponse(response, actionType, dispatch);
    } catch (err) {
        return handleError(err, actionType, dispatch);
    }
};

// API call helper function to make async actions with createAsyncThunk for file uploads
export const apiCallHelperUpload = async (url, method, formData, getState, dispatch, actionType) => {
    if (!formData) {
        toast('No form data given!', { icon: '⭕', style: { borderRadius: '10px', background: '#333', color: '#fff' } });
        return Promise.reject(new Error('No form data given!'));
    }

    try {
        const response = await axiosInstance[method](url, formData, { headers: { 'Content-Type': 'multipart/form-data' }, withCredentials: true });
        return handleResponse(response, actionType, dispatch);
    } catch (err) {
        return handleError(err, actionType, dispatch);
    }
};
