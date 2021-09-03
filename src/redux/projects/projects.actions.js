import { SET_PROJECTS } from './projects.types';
import pData from "./projectsData";

export const setProjects = () => {

    return {

        type: SET_PROJECTS,
        payload: pData
    };

};