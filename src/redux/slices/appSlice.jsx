/**
 * @module appSlice
 * @file appSlice - Redux Slice for App
 * 
 */
import { createSlice } from '@reduxjs/toolkit'

export const appSlice = createSlice({

    name: 'app',

    initialState: {
        isServices: false,
        isProjects: false,
        menuOpen: false,
        contentHeight: 0,
        isDialogOpen: false,
    },

    reducers: {
        openNav: (state) => {
            state.menuOpen = !state.menuOpen
        },
        showServices: (state) => {
            state.isServices = !state.isServices
            state.isProjects = false
        },
        showProjects: (state) => {
            state.isServices = false
            state.isProjects = !state.isProjects
        },
        setHeight: (state, action) => {
            state.contentHeight = action.payload
        },
        handleClose: (state) => {
            state.menuOpen = false
            state.isServices = false
            state.isProjects = false
        },
        openDialog: (state) => {
            state.isDialogOpen = true
        },
        closeDialog: (state) => {
            state.isDialogOpen = false
        },
        toggleDialog: (state) => {
            state.isDialogOpen = !state.isDialogOpen
        }
    },
})

// Action creators are generated for each case reducer function
export const { openNav, showServices, showProjects, setHeight, handleClose, isDialogOpen, openDialog, closeDialog, toggleDialog } = appSlice.actions

// Export the reducer, either as a default or named export
export default appSlice.reducer
