/**
 * @module messagesSlice
 * @file messagesSlice - Redux Slice for messages
 * 
 */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiCallHelper } from '../configHelpers'

// Async actions with createAsyncThunk
export const getMessages = createAsyncThunk("messages/getMessages", async (_, { getState, dispatch }) =>
    apiCallHelper(`/api/messages`, 'get', null, getState, dispatch, 'getMessages'))

export const deleteMessage = createAsyncThunk("messages/deleteMessage", async (messageID, { getState, dispatch }) =>
    apiCallHelper(`/api/messages/${messageID}`, 'delete', null, getState, dispatch, 'deleteMessage'))

export const updateMessage = createAsyncThunk("messages/updateMessage", async ({ id, data }, { getState, dispatch }) =>
    apiCallHelper(`/api/messages/${id}`, 'put', data, getState, dispatch, 'updateMessage'))

export const createChat = createAsyncThunk("messages/createChat", async (msg, { getState, dispatch }) =>
    apiCallHelper(`/api/messages`, 'post', msg, getState, dispatch, 'createChat'))

export const updateChat = createAsyncThunk("messages/updateChat", async ({ id, data }, { getState, dispatch }) =>
    apiCallHelper(`/api/messages/${id}`, 'put', data, getState, dispatch, 'updateChat'))

export const deleteChat = createAsyncThunk("messages/deleteChat", async (chatID, { getState, dispatch }) =>
    apiCallHelper(`/api/messages/${chatID}`, 'delete', null, getState, dispatch, 'deleteChat'))

export const sendNewMessage = createAsyncThunk("messages/sendNewMessage", async (message, { getState, dispatch }) =>
    apiCallHelper(`/api/messages`, 'post', message, getState, dispatch, 'sendNewMessage'))

export const getChatMessages = createAsyncThunk("messages/getChatMessages", async ({ sender, receiver }, { getState, dispatch }) =>
    apiCallHelper(`/api/messages/chat/${sender}/${receiver}`, 'get', null, getState, dispatch, 'getChatMessages'))

export const getChatRoomMessages = createAsyncThunk("messages/getChatRoomMessages", async (chatroom, { getState, dispatch }) =>
    apiCallHelper(`/api/messages/chatroom/${chatroom}`, 'get', null, getState, dispatch, 'getChatRoomMessages'))

export const getBroadcastMessages = createAsyncThunk("messages/getBroadcastMessages", async (_, { getState, dispatch }) =>
    apiCallHelper(`/api/messages/broadcast`, 'get', null, getState, dispatch, 'getBroadcastMessages'))

export const getUserChatList = createAsyncThunk("messages/getUserChatList", async (userID, { getState, dispatch }) =>
    apiCallHelper(`/api/messages/userChatList/${userID}`, 'get', null, getState, dispatch, 'getUserChatList'))

export const markAsRead = createAsyncThunk("messages/markAsRead", async (messagesIDs, { getState, dispatch }) =>
    apiCallHelper(`/api/messages/markAsRead`, 'put', messagesIDs, getState, dispatch, 'markAsRead'))


// Messages slice
const initialState = {
    messages: null,
    chat: null,
    chatList: null,
    isLoading: false,
};

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        clearMessages: state => {
            state.messages = []
            state.chat = null
            state.isLoading = false
        }
    },
    extraReducers: (builder) => {

        // Full filled actions
        builder.addCase(getMessages.fulfilled, (state, action) => {
            state.messages = action.payload
            state.isLoading = false
        })
        builder.addCase(createChat.fulfilled, (state, action) => {
            state.isLoading = false
            state.messages = [...state.messages, action.payload]
        })
        builder.addCase(updateChat.fulfilled, (state, action) => {
            state.isLoading = false
            state.messages = state.messages.map(chat => action.payload &&
                chat._id === action.payload._id ? action.payload : chat)
        })
        builder.addCase(deleteChat.fulfilled, (state, action) => {
            state.isLoading = false
            state.messages = state.messages.filter(chat => chat._id !== action.payload)
        })
        builder.addCase(sendNewMessage.fulfilled, (state, action) => {
            state.isLoading = false
            state.messages = [...state.messages, action.payload]
        })
        builder.addCase(getChatMessages.fulfilled, (state, action) => {
            state.messages = action.payload
            state.isLoading = false
        })
        builder.addCase(getChatRoomMessages.fulfilled, (state, action) => {
            state.messages = action.payload
            state.isLoading = false
        })
        builder.addCase(getBroadcastMessages.fulfilled, (state, action) => {
            state.messages = action.payload
            state.isLoading = false
        })
        builder.addCase(getUserChatList.fulfilled, (state, action) => {
            state.chatList = action.payload
            state.isLoading = false
        })
        builder.addCase(markAsRead.fulfilled, (state, action) => {
            state.isLoading = false
        })
            // Pending actions
            .addMatcher((action) => [getMessages.pending, createChat.pending, updateChat.pending,
            deleteChat.pending, sendNewMessage.pending, getChatMessages.pending, getUserChatList.pending,
            getChatRoomMessages.pending, getBroadcastMessages.pending, markAsRead.pending]
                .includes(action.type), (state, action) => {
                    state.isLoading = true
                })

            // Rejected actions
            .addMatcher((action) => [getMessages.rejected, createChat.rejected, updateChat.rejected,
            deleteChat.rejected, sendNewMessage.rejected, getChatMessages.rejected, getUserChatList.rejected,
            getChatRoomMessages.rejected, getBroadcastMessages.rejected, markAsRead.rejected]
                .includes(action.type), (state, action) => {
                    state.isLoading = false
                    state.messages = null
                    state.chat = null
                    state.chatList = null
                    console.log('Error Message:')
                    console.log(action.error)
                })
    }
})

export const { clearMessages } = messagesSlice.actions
export default messagesSlice.reducer