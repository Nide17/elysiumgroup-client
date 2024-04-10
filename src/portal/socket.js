import { io } from 'socket.io-client'

export const socket = io(import.meta.env.MODE === "development" ? import.meta.env.VITE_LOCAL_URL : import.meta.env.VITE_API_URL, {
    autoConnect: false,
    withCredentials: true
})