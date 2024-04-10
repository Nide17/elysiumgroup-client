import { io } from 'socket.io-client';

export const devApiURL = 'http://localhost:5000/';
const serverUrl = devApiURL;

export const socket = io(serverUrl, {
    autoConnect: false,
    withCredentials: true
});