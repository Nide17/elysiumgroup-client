/**
 * @module footerSlice
 * @file footerSlice - Redux Slice for footer
 * 
 */
import { createSlice } from '@reduxjs/toolkit';
import dataIcons from "../data/iconsData"

// Slice will produce an action that we will use for dispatch and a reducer that we will use in configureStore.
// Slice is a function that accepts an initial state, an object full of reducer functions, and a "slice name", and automatically generates action creators and action types that correspond to the reducers and state.
export const footerSlice = createSlice({
    name: 'footer',
    initialState: {
        iconsFooter: dataIcons,
        popoverOpen: false,
        loading: false,
    },

    reducers: {
        setFooterIcons: (state, action) => {
            state.iconsFooter = action.payload;
        },
        toggle: (state) => {
            state.popoverOpen = !state.popoverOpen;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setFooterIcons, toggle, setLoading } = footerSlice.actions;

// Export the reducer, either as a default or named export
export default footerSlice.reducer;