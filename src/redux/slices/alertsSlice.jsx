/**
 * @module alertsSlice
 * @file alertsSlice - Redux Slice for alerts
 * 
 */
import { createSlice } from '@reduxjs/toolkit'

export const alertsSlice = createSlice({
    name: 'alerts',
    initialState: {
        msg: {},
        status: null,
        id: null,
        type: null
    },

    reducers: {
        returnSuccess: (state, action) => {
            state.msg = action.payload.msg
            state.status = action.payload.status
            state.id = action.payload.id
            state.type = 'success'
        },

        clearSuccess: (state) => {
            state.msg = {}
            state.status = null
            state.id = null
            state.type = null
        },

        returnErrors: (state, action) => {
            state.msg = action.payload.msg
            state.status = action.payload.status
            state.id = action.payload.id
            state.type = 'error'
        },

        clearErrors: (state) => {
            state.msg = {}
            state.status = null
            state.id = null
            state.type = null
        },
    },
})

// Action creators are generated for each case reducer function
export const { returnSuccess, clearSuccess, returnErrors, clearErrors } = alertsSlice.actions

// Export the reducer, alert as a default or named export
export default alertsSlice.reducer
