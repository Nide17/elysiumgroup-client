import { SET_PROJECTS } from "./projects.types";

const INITIAL_STATE = {
  dataProjects: [],
};

const projectsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_PROJECTS:
      return {
        ...state,
        dataProjects: action.payload,
      };

    default:
      return state;
  }
};

export default projectsReducer;
