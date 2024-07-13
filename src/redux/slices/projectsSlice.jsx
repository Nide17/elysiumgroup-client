/**
 * @module projectsSlice
 * @file projectsSlice - Redux Slice for projects
 * 
 */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiCallHelper, apiCallHelperUpload } from '../configHelpers'

// Async actions with createAsyncThunk
export const getProjects = createAsyncThunk("projects/getProjects", async (_, { getState, dispatch }) =>
    apiCallHelper(`/api/projects`, 'get', null, getState, dispatch, 'getProjects'))

export const getOneProject = createAsyncThunk("projects/getOneProject", async (projectID, { getState, dispatch }) =>
    apiCallHelper(`/api/projects/${projectID}`, 'get', null, getState, dispatch, 'getOneProject'))

export const getProjectByPath = createAsyncThunk("projects/getProjectByPath", async (path, { getState, dispatch }) =>
    apiCallHelper(`/api/projects/path/${path}`, 'get', null, getState, dispatch, 'getProjectByPath'))

export const getProjectsLocations = createAsyncThunk("projects/getProjectsLocations", async (_, { getState, dispatch }) =>
    apiCallHelper(`/api/projects/projectsLocations`, 'get', null, getState, dispatch, 'getProjectsLocations'))

export const createProject = createAsyncThunk("projects/createProject", async (data, { getState, dispatch }) =>
    apiCallHelper(`/api/projects`, 'post', data, getState, dispatch, 'createProject'))

export const updateProject = createAsyncThunk("projects/updateProject", async ({ id, data }, { getState, dispatch }) =>
    apiCallHelper(`/api/projects/${id}`, 'put', data, getState, dispatch, 'updateProject'))

export const addProjectImages = createAsyncThunk("projects/addProjectImages", async ({ formData, projectID }, { getState, dispatch }) =>
    apiCallHelperUpload(`/api/projects/add-images/${projectID}`, 'put', formData, getState, dispatch, 'addProjectImages'))

export const deleteProjectImage = createAsyncThunk("projects/deleteProjectImage", async ({ projectID, imageID }, { getState, dispatch }) =>
    apiCallHelper(`/api/projects/delete-image/${projectID}/${imageID}`, 'delete', null, getState, dispatch, 'deleteProjectImage'))

export const deleteProject = createAsyncThunk("projects/deleteProject", async (projectID, { getState, dispatch }) =>
    apiCallHelper(`/api/projects/${projectID}`, 'delete', null, getState, dispatch, 'deleteProject'))

export const getFeaturedProjects = createAsyncThunk("projects/getFeaturedProjects", async (userID, { getState, dispatch }) =>
    apiCallHelper(`/api/projects/createdBy/${userID}`, 'get', null, getState, dispatch, 'getFeaturedProjects'))


// Projects slice
const initialState = {
    projects: [],
    project: null,
    featuredProjects: [],
    projectsLocations: [],
    isLoading: false
}

const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        clearProjects: state => {
            state.projects = []
            state.project = null
            state.isLoading = false
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getProjects.fulfilled, (state, action) => {
            state.projects = action.payload
            state.isLoading = false
        })
        builder.addCase(getOneProject.fulfilled, (state, action) => {
            state.project = action.payload
            state.isLoading = false
        })
        builder.addCase(getProjectByPath.fulfilled, (state, action) => {
            state.project = action.payload
            state.isLoading = false
        })
        builder.addCase(getProjectsLocations.fulfilled, (state, action) => {
            state.projectsLocations = action.payload
            state.isLoading = false
        })
        builder.addCase(createProject.fulfilled, (state, action) => {
            state.isLoading = false
            state.projects = [action.payload, ...state.projects]
        })
        builder.addCase(updateProject.fulfilled, (state, action) => {
            state.isLoading = false
            state.project = action.payload.updatedProject
        })
        builder.addCase(addProjectImages.fulfilled, (state, action) => {
            state.isLoading = false
            state.project.pGallery = [...state.project.pGallery, ...action.payload.newImages]
        })
        builder.addCase(deleteProjectImage.fulfilled, (state, action) => {
            state.isLoading = false
            state.project.pGallery = state.project.pGallery.filter(image => image._id !== action.payload.image_id)
        })
        builder.addCase(deleteProject.fulfilled, (state, action) => {
            state.isLoading = false
            state.projects = state.projects.filter(project => project._id !== action.payload._id)
        })
        builder.addCase(getFeaturedProjects.fulfilled, (state, action) => {
            state.featuredProjects = action.payload
            state.isLoading = false
        })
            // Pending actions
            .addMatcher((action) => [getProjects.pending, getOneProject.pending, getProjectByPath.pending, createProject.pending,
            addProjectImages.pending, deleteProject.pending, deleteProjectImage.pending, updateProject.pending,
            getFeaturedProjects.pending, getProjectsLocations.pending]
                .includes(action.type), (state, action) => {
                    state.isLoading = true
                })

            // Rejected actions
            .addMatcher((action) => [getProjects.rejected, getOneProject.rejected, getProjectByPath.rejected, createProject.rejected,
            addProjectImages.rejected, deleteProject.rejected, deleteProjectImage.rejected, updateProject.rejected,
            getFeaturedProjects.rejected, getProjectsLocations.rejected]
                .includes(action.type), (state, action) => {
                    state.isLoading = false
                })
    }
})

export const { clearProjects } = projectsSlice.actions
export default projectsSlice.reducer