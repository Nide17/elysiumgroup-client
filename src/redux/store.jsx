import { configureStore } from '@reduxjs/toolkit'

import logger from 'redux-logger' // A middleware for logging the state
import appReducer from './slices/appSlice'
import usersReducer from './slices/usersSlice'
import clientsReducer from './slices/clientsSlice'
import contactsReducer from './slices/contactsSlice'
import footerReducer from './slices/footerSlice'
import membersReducer from './slices/membersSlice'
import projectsReducer from './slices/projectsSlice'
import projectTypesReducer from './slices/projectTypesSlice'
import servicesReducer from './slices/servicesSlice'
import messagesReducer from './slices/messagesSlice'
import notificationsReducer from './slices/notificationsSlice'
import chatRoomsReducer from './slices/chatRoomsSlice'
import alertsReducer from './slices/alertsSlice'

const store = configureStore({
    reducer: {
        app: appReducer,
        users: usersReducer,
        clients: clientsReducer,
        contacts: contactsReducer,
        iconsData: footerReducer,
        members: membersReducer,
        projects: projectsReducer,
        pTypes: projectTypesReducer,
        services: servicesReducer,
        messages: messagesReducer,
        notifications: notificationsReducer,
        chatRooms: chatRoomsReducer,
        alerts: alertsReducer,
    },
    devTools: process.env.NODE_ENV === 'development',
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false  // Disable the SerializableStateInvariantMiddleware
    })

    // .concat(logger)
})

export default store