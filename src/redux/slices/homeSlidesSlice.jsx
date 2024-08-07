/**
 * @module homeSlidesSlice
 * @file homeSlidesSlice - Redux Slice for homeSlides
 */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiCallHelper, apiCallHelperUpload } from '../configHelpers';

// Async actions with createAsyncThunk
export const getHomeSlides = createAsyncThunk("homeSlides/getHomeSlides", async (_, { getState, dispatch }) =>
    apiCallHelper(`/api/homeSlides`, 'get', null, getState, dispatch, 'getHomeSlides')
);

export const getValidHomeSlides = createAsyncThunk("homeSlides/getValidHomeSlides", async (_, { getState, dispatch }) =>
    apiCallHelper(`/api/homeSlides/valid`, 'get', null, getState, dispatch, 'getValidHomeSlides')
);

export const createHomeSlide = createAsyncThunk("homeSlides/createHomeSlide", async (data, { getState, dispatch }) =>
    apiCallHelper(`/api/homeSlides`, 'post', data, getState, dispatch, 'createHomeSlide')
);

export const updateHomeSlide = createAsyncThunk("homeSlides/updateHomeSlide", async ({ id, data }, { getState, dispatch }) =>
    apiCallHelper(`/api/homeSlides/${id}`, 'put', data, getState, dispatch, 'updateHomeSlide')
);

export const deleteHomeSlide = createAsyncThunk("homeSlides/deleteHomeSlide", async (homeSlideID, { getState, dispatch }) =>
    apiCallHelper(`/api/homeSlides/${homeSlideID}`, 'delete', null, getState, dispatch, 'deleteHomeSlide')
);

export const toggleHomeSlide = createAsyncThunk("homeSlides/toggleHomeSlide", async (homeSlideID, { getState, dispatch }) =>
    apiCallHelper(`/api/homeSlides/toggleHomeSlide/${homeSlideID}`, 'put', {}, getState, dispatch, 'toggleHomeSlide')
);

export const updateHomeSlideImage = createAsyncThunk("homeSlides/updateHomeSlideImage", async ({ formData, id }, { getState, dispatch }) =>
    apiCallHelperUpload(`/api/homeSlides/image/${id}`, 'put', formData, getState, dispatch, 'updateHomeSlideImage')
);

const initialState = {
    homeSlides: [],
    homeSlide: null,
    isLoading: false,
};

const homeSlidesSlice = createSlice({
    name: 'homeSlides',
    initialState,
    reducers: {
        clearHomeSlides: state => {
            state.homeSlides = [];
            state.homeSlide = null;
            state.isLoading = false;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(getHomeSlides.fulfilled, (state, action) => {
                state.homeSlides = action.payload;
                state.isLoading = false;
            })
            .addCase(getValidHomeSlides.fulfilled, (state, action) => {
                state.homeSlides = action.payload;
                state.isLoading = false;
            })
            .addCase(createHomeSlide.fulfilled, (state, action) => {
                state.homeSlides.push(action.payload);
                state.isLoading = false;
            })
            .addCase(updateHomeSlide.fulfilled, state => {
                state.isLoading = false;
            })
            .addCase(deleteHomeSlide.fulfilled, (state, action) => {
                state.homeSlides = state.homeSlides.filter(homeSlide => homeSlide._id !== action.payload.homeSlide._id);
                state.isLoading = false;
            })
            .addCase(toggleHomeSlide.fulfilled, (state, action) => {
                state.homeSlides = state.homeSlides.map(homeSlide =>
                    homeSlide._id === action.payload.homeSlide._id ? action.payload.homeSlide : homeSlide
                );
                state.isLoading = false;
            })
            .addCase(updateHomeSlideImage.fulfilled, (state, action) => {
                state.homeSlides = state.homeSlides.map(homeSlide =>
                    homeSlide._id === action.payload.homeSlide._id ? action.payload.homeSlide : homeSlide
                );
                state.isLoading = false;
            })
            .addMatcher(
                action => [
                    getHomeSlides.pending,
                    getValidHomeSlides.pending,
                    createHomeSlide.pending,
                    updateHomeSlide.pending,
                    deleteHomeSlide.pending,
                    toggleHomeSlide.pending,
                    updateHomeSlideImage.pending,
                ].includes(action.type),
                state => {
                    state.isLoading = true;
                }
            )
            .addMatcher(
                action => [
                    getHomeSlides.rejected,
                    getValidHomeSlides.rejected,
                    createHomeSlide.rejected,
                    updateHomeSlide.rejected,
                    deleteHomeSlide.rejected,
                    toggleHomeSlide.rejected,
                    updateHomeSlideImage.rejected,
                ].includes(action.type),
                state => {
                    state.isLoading = false;
                }
            );
    },
});

export const { clearHomeSlides } = homeSlidesSlice.actions;
export default homeSlidesSlice.reducer;
