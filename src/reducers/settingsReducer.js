import { DISABLE_BALANCE_ON_ADD } from "../actions/types";
import { DISABLE_BALANCE_ON_EDIT } from "../actions/types";
import { ALLOW_REGISTRATION } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case DISABLE_BALANCE_ON_ADD:
      return {
        ...state,
        disableBalanceOnAdd: action.payload
      };
    case DISABLE_BALANCE_ON_EDIT:
      return {
        ...state,
        disableBalanceOnEdit: action.payload
      };
    case ALLOW_REGISTRATION:
      return {
        ...state,
        allowRegistration: action.payload
      };

    default:
      return state;
  }
};
