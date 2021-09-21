import { SET_CLIENTS } from "./clients.types";

const INITIAL_STATE = {
  dataClients: [],
};

const clientsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CLIENTS:
      return {
        ...state,
        dataClients: action.payload,
      };

    default:
      return state;
  }
};

export default clientsReducer;
