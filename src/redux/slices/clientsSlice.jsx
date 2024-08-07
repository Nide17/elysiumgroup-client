/**
 * @module clientsSlice
 * @file clientsSlice - Redux Slice for clients
 */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiCallHelper, apiCallHelperUpload } from '../configHelpers';

// Async actions with createAsyncThunk
export const getClients = createAsyncThunk('clients/getClients', async (_, { getState, dispatch }) =>
    apiCallHelper('/api/clients', 'get', null, getState, dispatch, 'getClients')
);

export const createClient = createAsyncThunk('clients/createClient', async (data, { getState, dispatch }) =>
    apiCallHelper('/api/clients', 'post', data, getState, dispatch, 'createClient')
);

export const updateClient = createAsyncThunk('clients/updateClient', async ({ id, data }, { getState, dispatch }) =>
    apiCallHelper(`/api/clients/${id}`, 'put', data, getState, dispatch, 'updateClient')
);

export const deleteClient = createAsyncThunk('clients/deleteClient', async (clientID, { getState, dispatch }) =>
    apiCallHelper(`/api/clients/${clientID}`, 'delete', null, getState, dispatch, 'deleteClient')
);

export const addClientLogo = createAsyncThunk('clients/addClientLogo', async ({ formData, id }, { getState, dispatch }) =>
    apiCallHelperUpload(`/api/clients/add-logo/${id}`, 'put', formData, getState, dispatch, 'addClientLogo')
);

// Initial state
const initialState = {
    clients: [],
    client: null,
    isLoading: false,
};

// Clients slice
const clientsSlice = createSlice({
    name: 'clients',
    initialState,
    reducers: {
        clearClients: (state) => {
            state.clients = [];
            state.client = null;
            state.isLoading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fulfilled actions
            .addCase(getClients.fulfilled, (state, action) => {
                state.clients = action.payload;
                state.isLoading = false;
            })
            .addCase(createClient.fulfilled, (state, action) => {
                state.isLoading = false;
                state.clients.push(action.payload);
            })
            .addCase(updateClient.fulfilled, (state, action) => {
                state.isLoading = false;
                state.clients = state.clients.map((client) =>
                    client._id === action.payload.client._id ? action.payload : client
                );
            })
            .addCase(deleteClient.fulfilled, (state, action) => {
                state.isLoading = false;
                state.clients = state.clients.filter(client => client._id !== action.payload);
            })
            .addCase(addClientLogo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.clients = state.clients.map((client) =>
                    client._id === action.payload.client._id ? action.payload.client : client
                );
            })
            // Pending actions
            .addMatcher(
                (action) =>
                    [getClients.pending, createClient.pending, updateClient.pending, deleteClient.pending, addClientLogo.pending].includes(
                        action.type
                    ),
                (state) => {
                    state.isLoading = true;
                }
            )
            // Rejected actions
            .addMatcher(
                (action) =>
                    [getClients.rejected, createClient.rejected, updateClient.rejected, deleteClient.rejected, addClientLogo.rejected].includes(
                        action.type
                    ),
                (state) => {
                    state.isLoading = false;
                }
            );
    },
});

// Export actions and reducer
export const { clearClients } = clientsSlice.actions;
export default clientsSlice.reducer;
