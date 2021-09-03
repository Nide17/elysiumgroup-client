import {
  OPEN_NAV,
  SHOW_SERVICES,
  SHOW_PROJECTS,
  HANDLE_CLOSE,
  SET_HEIGHT,
} from "./app.types";

// import dataIcons from "./iconsData";

const INITIAL_STATE = {
  menuOpen: false,
  isServices: false,
  isProjects: false,
  contentHeight: 0,
};

const appReducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {
    
    case OPEN_NAV:
      return {
        ...state,
        menuOpen: !state.menuOpen,
      };

    case SHOW_SERVICES:
      return {
        ...state,
        isProjects: false,
        isServices: !state.isServices,
      };

    case SHOW_PROJECTS:
      return {
        ...state,
        isServices: false,
        isProjects: !state.isProjects,
      };

    case SET_HEIGHT:
      return {
        ...state,
        contentHeight: action.payload,
      };

    case HANDLE_CLOSE:
      return {
        ...state,
        isProjects: false,
        isServices: false,
      };

    default:
      return state;
  }
};

export default appReducer;
