/**
 * @module membersSlice
 * @file membersSlice - Redux Slice for members
 * 
 */
import membersData from "../data/membersData";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiCallHelper } from '../configHelpers'

// Async actions with createAsyncThunk
export const getMembers = createAsyncThunk("members/getMembers", async (_, { getState, dispatch }) =>
    apiCallHelper(`/api/members`, 'get', null, getState, dispatch, 'getMembers'))

export const getOneMember = createAsyncThunk("members/getOneMember", async (memberID, { getState, dispatch }) =>
    apiCallHelper(`/api/members/${memberID}`, 'get', null, getState, dispatch, 'getOneMember'))


// Members slice
const initialState = {
    members: [],
    member: null,
    isLoading: false
}

const membersSlice = createSlice({
    name: 'members',
    initialState,
    reducers: {
        clearMembers: state => {
            state.members = []
            state.member = null
            state.isLoading = false
        }
    },
    extraReducers: (builder) => {

        // Full filled actions
        builder.addCase(getMembers.fulfilled, (state, action) => {
            state.members = action.payload ? action.payload : membersData
            state.isLoading = false
        })
        builder.addCase(getOneMember.fulfilled, (state, action) => {
            state.member = action.payload ? action.payload : membersData[0]
            state.isLoading = false
        })

        // Pending actions
        builder.addCase(getMembers.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(getOneMember.pending, (state, action) => {
            state.isLoading = true
        })

        // Rejected actions
        builder.addCase(getMembers.rejected, (state, action) => {
            state.isLoading = false
            state.members = membersData
        })
        builder.addCase(getOneMember.rejected, (state, action) => {
            state.isLoading = false
            state.member = membersData[0]
        })
    }
})

export const { clearMembers } = membersSlice.actions
export default membersSlice.reducer