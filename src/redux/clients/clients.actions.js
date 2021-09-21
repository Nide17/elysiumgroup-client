import { SET_CLIENTS } from './clients.types';
import clientsData from "./clientsData";

export const setClients = () => {

    return {
        type: SET_CLIENTS,
        payload: clientsData
    };

};