import { SET_MEMBERS } from "./members.types";

const INITIAL_STATE = {
  members: [],
};

const membersReducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {
    
    case SET_MEMBERS:
      return {
        ...state,
        members: action.payload,
      };

    default:
      return state;
  }
};

export default membersReducer;
