import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiCallHelper } from '../configHelpers'


// Async actions with createAsyncThunk
export const getContacts = createAsyncThunk("contacts/getContacts", async (_, { getState, dispatch }) =>
  apiCallHelper(`/api/contacts`, 'get', null, getState, dispatch, 'getContacts'))

export const getUserContacts = createAsyncThunk("contacts/getUserContacts", async (userEmail, { getState, dispatch }) =>
  apiCallHelper(`/api/contacts/sent-by/${userEmail}`, 'get', null, getState, dispatch, 'getUserContacts'))

export const contactUs = createAsyncThunk("contacts/contactUs", async (contactMsg, { getState, dispatch }) =>
  apiCallHelper('/api/contacts', 'post', contactMsg, getState, dispatch, 'contactUs'))

export const deleteContact = createAsyncThunk("contacts/deleteContact", async (contactID, { getState, dispatch }) =>
  apiCallHelper(`/api/contacts/${contactID}`, 'delete', null, getState, dispatch, 'deleteContact'))

// Contacts slice
const initialState = {
  contacts: [],
  userContacts: [],
  oneContact: null,
  isLoading: false
}

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    clearContacts: state => {
      state.contacts = []
      state.userContacts = []
      state.oneContact = null
      state.isLoading = false
    }
  },
  extraReducers: (builder) => {

    // Full filled actions
    builder.addCase(getContacts.fulfilled, (state, action) => {
      state.contacts = action.payload
      state.isLoading = false
    })
    builder.addCase(getUserContacts.fulfilled, (state, action) => {
      state.userContacts = action.payload
      state.isLoading = false
    })
    builder.addCase(contactUs.fulfilled, (state, action) => {
      state.contacts.push(action.payload)
      state.isLoading = false
    })
    builder.addCase(deleteContact.fulfilled, (state, action) => {
      state.contacts = state.contacts.filter(contact => contact._id !== action.payload)
      state.isLoading = false
    })

      // Pending actions
      .addMatcher((action) => [getContacts.pending, getUserContacts.pending, contactUs.pending, deleteContact.pending].includes(action.type), (state) => {
        state.isLoading = true
      })

      // Rejected actions
      .addMatcher((action) => [getContacts.rejected, getUserContacts.rejected, contactUs.rejected, deleteContact.rejected].includes(action.type), (state) => {
        state.isLoading = false
      })
  }
})

export const { clearContacts } = contactsSlice.actions
export default contactsSlice.reducer