import { SET_SERVICES } from "./services.types";

const INITIAL_STATE = {
  dataServices: [],
};

const servicesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_SERVICES:
      return {
        ...state,
        dataServices: action.payload,
      };

    default:
      return state;
  }
};

export default servicesReducer;
