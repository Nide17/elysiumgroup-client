import { SET_FOOTER_ICONS } from "./footer.types";
import { TOGGLE_POPOVER } from "./footer.types";
import dataIcons from "./iconsData";

export const setFooterIcons = () => {

  return {
    type: SET_FOOTER_ICONS,
    payload: dataIcons
  };
};

export const toggle = () => {

  return {
    type: TOGGLE_POPOVER,
  };
  
};
