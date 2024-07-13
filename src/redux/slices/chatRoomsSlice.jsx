/**
 * @module chatRoomsSlice
 * @file chatRoomsSlice - Redux Slice for chatRooms
 * 
 */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiCallHelper } from '../configHelpers'

// Async actions with createAsyncThunk
export const getChatRooms = createAsyncThunk("chatRooms/getChatRooms", async (_, { getState, dispatch }) =>
    apiCallHelper(`/api/chatrooms`, 'get', null, getState, dispatch, 'getChatRooms'))

export const createChatRoom = createAsyncThunk("chatRooms/createChatRoom", async (roomName, { getState, dispatch }) =>
    apiCallHelper(`/api/chatrooms`, 'post', roomName, getState, dispatch, 'createChatRoom'))

export const updateChatRoom = createAsyncThunk("chatRooms/updateChatRoom", async ({id, data}, { getState, dispatch }) =>
    apiCallHelper(`/api/chatrooms/${id}`, 'put', data, getState, dispatch, 'updateChatRoom'))

export const deleteChatRoom = createAsyncThunk("chatRooms/deleteChatRoom", async (chatRoomID, { getState, dispatch }) =>
    apiCallHelper(`/api/chatrooms/${chatRoomID}`, 'delete', null, getState, dispatch, 'deleteChatRoom'))


// ChatRooms slice
const initialState = {
    chatRooms: [],
    chatRoom: null,
    isLoading: false,
};

const chatRoomsSlice = createSlice({
    name: 'chatRooms',
    initialState,
    reducers: {
        clearChatRooms: state => {
            state.chatRooms = []
            state.chatRoom = null
            state.isLoading = false
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getChatRooms.fulfilled, (state, action) => {
            state.chatRooms = action.payload
            state.isLoading = false
        })
        builder.addCase(createChatRoom.fulfilled, (state, action) => {
            state.isLoading = false
            state.chatRooms = [...state.chatRooms, action.payload]
        })
        builder.addCase(updateChatRoom.fulfilled, (state, action) => {
            state.isLoading = false
            state.chatRooms = state.chatRooms.map(chatRoom => chatRoom._id === action.payload._id ? action.payload : chatRoom)
        })
        builder.addCase(deleteChatRoom.fulfilled, (state, action) => {
            state.isLoading = false
            state.chatRooms = state.chatRooms.filter(chatRoom => chatRoom._id !== action.payload)
        })

            // Pending actions
            .addMatcher((action) => [getChatRooms.pending, createChatRoom.pending, updateChatRoom.pending, deleteChatRoom.pending]
                .includes(action.type), (state, action) => {
                    state.isLoading = true
                })

            // Rejected actions
            .addMatcher((action) => [getChatRooms.rejected, createChatRoom.rejected, updateChatRoom.rejected, deleteChatRoom.rejected]
                .includes(action.type), (state, action) => {
                    state.isLoading = false
                })
    }
})

export const { clearChatRooms } = chatRoomsSlice.actions
export default chatRoomsSlice.reducer