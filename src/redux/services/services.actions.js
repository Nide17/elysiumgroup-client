import { SET_SERVICES } from './services.types';
import sData from "./servicesData";

export const setServices = () => {

    return {
        type: SET_SERVICES,
        payload: sData
    };

};