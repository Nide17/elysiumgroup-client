/**
 * @module projectTypesSlice
 * @file projectTypesSlice - Redux Slice for pTypes
 * 
 */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiCallHelper } from '../configHelpers'

// Async actions with createAsyncThunk
export const getPTypes = createAsyncThunk("pTypes/getPTypes", async (_, { getState, dispatch }) =>
    apiCallHelper(`/api/projectTypes`, 'get', null, getState, dispatch, 'getPTypes'))

export const createPType = createAsyncThunk("pTypes/createPType", async ({ typeName, createdBy }, { getState, dispatch }) =>
    apiCallHelper(`/api/projectTypes`, 'post', { typeName, createdBy }, getState, dispatch, 'createPType'))

export const updatePType = createAsyncThunk("pTypes/updatePType", async ({ id, data }, { getState, dispatch }) =>
    apiCallHelper(`/api/projectTypes/${id}`, 'put', data, getState, dispatch, 'updatePType'))

export const deletePType = createAsyncThunk("pTypes/deletePType", async (pTypeID, { getState, dispatch }) =>
    apiCallHelper(`/api/projectTypes/${pTypeID}`, 'delete', null, getState, dispatch, 'deletePType'))


// PTypes slice
const initialState = {
    pTypes: [],
    pType: null,
    isLoading: false,
};

const projectTypesSlice = createSlice({
    name: 'pTypes',
    initialState,
    reducers: {
        clearPTypes: state => {
            state.pTypes = []
            state.pType = null
            state.isLoading = false
        }
    },
    extraReducers: (builder) => {

        // Full filled actions
        builder.addCase(getPTypes.fulfilled, (state, action) => {
            state.pTypes = action.payload
            state.isLoading = false
        })
        builder.addCase(createPType.fulfilled, (state, action) => {
            state.isLoading = false
            state.pTypes = [...state.pTypes, action.payload]
        })
        builder.addCase(updatePType.fulfilled, (state, action) => {
            state.isLoading = false
            state.pTypes = state.pTypes.map(pType => pType._id === action.payload._id ? action.payload : pType)
        })
        builder.addCase(deletePType.fulfilled, (state, action) => {
            state.isLoading = false
            state.pTypes = state.pTypes.filter(pType => pType._id !== action.payload)
        })

            // Pending actions
            .addMatcher((action) => [getPTypes.pending, createPType.pending, updatePType.pending, deletePType.pending]
                .includes(action.type), (state, action) => {
                    state.isLoading = true
                })

            // Rejected actions
            .addMatcher((action) => [getPTypes.rejected, createPType.rejected, updatePType.rejected, deletePType.rejected]
                .includes(action.type), (state, action) => {
                    state.isLoading = false
                })
    }
})

export const { clearPTypes } = projectTypesSlice.actions
export default projectTypesSlice.reducer