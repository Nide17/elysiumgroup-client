import { SET_MEMBERS } from './members.types';
import membersData from "./membersData";

export const setMembers = () => {

    // Async actions with dispatch, using thunk
    return dispatch => {
        setTimeout(() => {
            
            // callback function after 2s, call dispatch func passed as arg above
            dispatch({
                type: SET_MEMBERS,
                payload: membersData
            })
        }, 2000);
    }
};