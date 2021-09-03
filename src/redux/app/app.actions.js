import {
  OPEN_NAV,
  SHOW_SERVICES,
  SHOW_PROJECTS,
  HANDLE_CLOSE,
  SET_HEIGHT,
} from "./app.types";

export const openNav = () => {
  return {
    type: OPEN_NAV,
  };
};

export const showServices = () => {
  return {
    type: SHOW_SERVICES,
  };
};

export const showProjects = () => {
  return {
    type: SHOW_PROJECTS,
  };
};

export const setHeight = (contentHeight) => {
  return {
    type: SET_HEIGHT,
    payload: contentHeight,
  };
};

export const handleClose = () => {
  return {
    type: HANDLE_CLOSE,
  };
};
