/**
 * @module notificationsSlice
 * @file notificationsSlice - Redux Slice for notifications
 * 
 */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiCallHelper } from '../configHelpers'

// Async actions with createAsyncThunk
export const getUserNotifications = createAsyncThunk("notifications/getUserNotifications", async (userID, { getState, dispatch }) =>
    apiCallHelper(`/api/notifications/${userID}`, 'get', null, getState, dispatch, 'getUserNotifications'))

export const createNotification = createAsyncThunk("notifications/createNotification", async (notification, { getState, dispatch }) =>
    apiCallHelper(`/api/notifications`, 'post', notification, getState, dispatch, 'createNotification'))

export const markAsRead = createAsyncThunk("notifications/markAsRead", async (notificationID, { getState, dispatch }) =>
    apiCallHelper(`/api/notifications/markAsRead/${notificationID}`, 'delete', null, getState, dispatch, 'markAsRead'))

// Notifications slice
const initialState = {
    notifications: null,
    isLoading: false,
};

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        clearNotifications: state => {
            state.notifications = []
            state.isLoading = false
        }
    },
    extraReducers: (builder) => {

        // Full filled actions
        builder.addCase(getUserNotifications.fulfilled, (state, action) => {
            state.notifications = action.payload
            state.isLoading = false
        })
        builder.addCase(createNotification.fulfilled, (state, action) => {
            state.isLoading = false
        })
        builder.addCase(markAsRead.fulfilled, (state, action) => {
            state.isLoading = false
        })
            // Pending actions
            .addMatcher((action) => [getUserNotifications.pending, createNotification.pending, markAsRead.pending]
                .includes(action.type), (state, action) => {
                    state.isLoading = true
                })

            // Rejected actions
            .addMatcher((action) => [getUserNotifications.rejected, createNotification.rejected, markAsRead.rejected]
                .includes(action.type), (state, action) => {
                    state.isLoading = false
                    state.notifications = null
                    console.log('Error Notification:')
                    console.log(action.error)
                })
    }
})

export const { clearNotifications } = notificationsSlice.actions
export default notificationsSlice.reducer