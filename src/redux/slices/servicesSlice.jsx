/**
 * @module servicesSlice
 * @file servicesSlice - Redux Slice for services
 * 
 */
import sData from "../data/servicesData";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiCallHelper, apiCallHelperUpload } from '../configHelpers'

// Async actions with createAsyncThunk
export const getServices = createAsyncThunk("services/getServices", async (_, { getState, dispatch }) =>
    apiCallHelper(`/api/services`, 'get', null, getState, dispatch, 'getServices'))

export const createService = createAsyncThunk("services/createService", async (data, { getState, dispatch }) =>
    apiCallHelper(`/api/services`, 'post', data, getState, dispatch, 'createService'))

export const addServiceImage = createAsyncThunk("services/addServiceImage", async ({ formData, id }, { getState, dispatch }) =>
    apiCallHelperUpload(`/api/services/add-image/${id}`, 'put', formData, getState, dispatch, 'addServiceImage'))

export const updateService = createAsyncThunk("services/updateService", async (editData, { getState, dispatch }) =>
    apiCallHelper(`/api/services/${editData.serviceID}`, 'put', editData.serviceData, getState, dispatch, 'updateService'))

export const deleteService = createAsyncThunk("services/deleteService", async (serviceID, { getState, dispatch }) =>
    apiCallHelper(`/api/services/${serviceID}`, 'delete', null, getState, dispatch, 'deleteService'))

// Services slice
const initialState = {
    services: [],
    service: null,
    isLoading: false
}

const servicesSlice = createSlice({
    name: 'services',
    initialState,
    reducers: {
        clearServices: state => {
            state.services = []
            state.service = null
            state.isLoading = false
        }
    },

    extraReducers: (builder) => {
        // Full filled actions
        builder.addCase(getServices.fulfilled, (state, action) => {
            state.services = action.payload ? action.payload : sData
            state.isLoading = false
        })
        builder.addCase(createService.fulfilled, (state, action) => {
            state.isLoading = false
            state.services = [...state.services, action.payload]
        })
        builder.addCase(addServiceImage.fulfilled, (state, action) => {
            state.isLoading = false
            state.services = state.services.map(service => service._id === action.payload &&
                action.payload._id ? action.payload : service)
        })
        builder.addCase(updateService.fulfilled, (state, action) => {
            state.isLoading = false
            state.services = state.services.map(service => service._id === action.payload &&
                action.payload._id ? action.payload : service)
        })
        builder.addCase(deleteService.fulfilled, (state, action) => {
            state.isLoading = false
            state.services = state.services.filter(service => service._id !== action.payload._id)
        })

            // Pending actions
            .addMatcher((action) => [getServices.pending, createService.pending, updateService.pending,
            deleteService.pending, addServiceImage.pending]
                .includes(action.type), (state, action) => {
                    state.isLoading = true
                })

            // Rejected actions
            .addMatcher((action) => [getServices.rejected, createService.rejected, updateService.rejected,
            deleteService.rejected, addServiceImage.rejected]
                .includes(action.type), (state, action) => {
                    state.isLoading = false
                })
    }
})

export const { clearServices } = servicesSlice.actions
export default servicesSlice.reducer