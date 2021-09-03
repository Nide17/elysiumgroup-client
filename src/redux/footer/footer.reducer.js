import { SET_FOOTER_ICONS } from "./footer.types";
import { TOGGLE_POPOVER } from "./footer.types";

const INITIAL_STATE = {
  iconsFooter: [],
  popoverOpen: false,
};

const footerReducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

    case SET_FOOTER_ICONS:
      return {
        ...state,
        iconsFooter: action.payload
      };

    case TOGGLE_POPOVER:
      return {
        ...state,
        popoverOpen: !state.popoverOpen,
      };

    default:
      return state;
  }
};

export default footerReducer;
