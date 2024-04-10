import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiCallHelper, apiCallHelperUpload } from '../configHelpers'

export const loadUser = createAsyncThunk("users/loadUser", async (_, { getState, dispatch }) =>
  apiCallHelper('/api/users/loadUser', 'get', null, getState, dispatch, 'loadUser'))

export const getOneUser = createAsyncThunk("users/getOneUser", async (userID, { getState, dispatch }) =>
  apiCallHelper(`/api/users/${userID}`, 'get', null, getState, dispatch, 'getOneUser'))

export const signup = createAsyncThunk("users/signup", async ({ name, email, password }, { getState, dispatch }) =>
  apiCallHelper('/api/users/signup', 'post', { name, email, password }, getState, dispatch, 'signup'))

export const login = createAsyncThunk("users/login", async ({ email, password }, { getState, dispatch }) =>
  apiCallHelper('/api/users/login', 'post', { email, password }, getState, dispatch, 'login'))

export const verifyOTP = createAsyncThunk("users/verifyOTP", async ({ email, userOTP }, { getState, dispatch }) =>
  apiCallHelper('/api/users/verifyOTP', 'post', { email, userOTP }, getState, dispatch, 'verifyOTP'))

export const forgotPassword = createAsyncThunk("users/forgotPassword", async ({ email }, { getState, dispatch }) =>
  apiCallHelper('/api/users/forgotPassword', 'post', { email }, getState, dispatch, 'forgotPassword'))

export const resetPassword = createAsyncThunk("users/resetPassword", async ({ email, password, userOTP }, { getState, dispatch }) =>
  apiCallHelper('/api/users/resetPassword', 'post', { email, password, userOTP }, getState, dispatch, 'resetPassword'))

export const logout = createAsyncThunk("users/logout", async (_, { getState, dispatch }) =>
  apiCallHelper('/api/users/logout', 'post', {}, getState, dispatch, 'logout'))

export const getUsers = createAsyncThunk("users/getUsers", async (_, { getState, dispatch }) =>
  apiCallHelper('/api/users', 'get', null, getState, dispatch, 'getUsers'))

export const editProfile = createAsyncThunk("users/editProfile", async (dt, { getState, dispatch }) =>
  apiCallHelper(`/api/users/edit-profile/${dt.id}`, 'put',
    { name: dt.data.name, bio: dt.data.bio, phone: dt.data.phone }, getState, dispatch, 'editProfile'))

export const updateUser = createAsyncThunk("users/updateUser", async ({ _id, title, department, role, active }, { getState, dispatch }) =>
  apiCallHelper(`/api/users/${_id}`, 'put', { title, department, role, active }, getState, dispatch, 'updateUser'))

export const deleteUser = createAsyncThunk("users/deleteUser", async (userID, { getState, dispatch }) =>
  apiCallHelper(`/api/users/${userID}`, 'delete', null, getState, dispatch, 'deleteUser'))

export const editProfilePicture = createAsyncThunk("users/editProfilePicture", async ({ formData, id }, { getState, dispatch }) =>
  apiCallHelperUpload(`/api/users/editProfilePicture/${id}`, 'put', formData, getState, dispatch, 'editProfilePicture'))

export const editProfilePlatformSettings = createAsyncThunk("users/editProfilePlatformSettings",
  async ({ settingID, optionID, isChecked, userID }, { getState, dispatch }) =>
    apiCallHelper(`/api/users/editProfilePlatformSettings/${userID}`, 'put',
      { settingID, optionID, isChecked }, getState, dispatch, 'editProfilePlatformSettings'))

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    isLoading: false,
    user: null,
    selectedUser: null,
    users: [],
    onlineUsers: []
  },
  reducers: {
    updateOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(getOneUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedUser = action.payload;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = null
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.user = action.payload.user
        state.isLoading = false
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isLoading = false
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.user = null
        state.isLoading = false
        window.location.href = '/auth/login'
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = action.payload
        state.isLoading = false
      })
      .addCase(editProfile.fulfilled, (state, action) => {
        state.user = action.payload.user
        state.isLoading = false
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(user => user._id !== action.payload)
        state.isLoading = false
      })
      .addCase(editProfilePicture.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.user
      })
      .addCase(editProfilePlatformSettings.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.user
      })

      // Pending actions
      .addMatcher(
        (action) =>
          [loadUser.pending, signup.pending, login.pending, verifyOTP.pending, logout.pending, getUsers.pending, getOneUser.pending,
          editProfile.pending, deleteUser.pending, forgotPassword.pending, resetPassword.pending, editProfilePicture.pending, updateUser.pending,
          editProfilePlatformSettings.pending]
            .includes(action.type), (state) => {
              state.isLoading = true
            })

      // Rejected actions
      .addMatcher(
        (action) =>
          [loadUser.rejected, signup.rejected, login.rejected, verifyOTP.rejected, logout.rejected, getUsers.rejected, getOneUser.rejected,
          editProfile.rejected, deleteUser.rejected, forgotPassword.rejected, resetPassword.rejected, editProfilePicture.rejected, updateUser.rejected,
          editProfilePlatformSettings.rejected]
            .includes(action.type),
        (state) => {
          state.isLoading = false;
          state.user = null;
        })
  },
})
export const { updateOnlineUsers } = usersSlice.actions
export default usersSlice.reducer
