import { DISABLE_BALANCE_ON_ADD } from "./types";
import { DISABLE_BALANCE_ON_EDIT } from "./types";
import { ALLOW_REGISTRATION } from "./types";

export const disableBalanceOnAdd = () => {
  const settings = JSON.parse(localStorage.getItem("settings"));
  settings.disableBalanceOnAdd = !settings.disableBalanceOnAdd;
  localStorage.setItem("settings", JSON.stringify(settings));
  console.log(settings.disableBalanceOnAdd);
  return {
    type: DISABLE_BALANCE_ON_ADD,
    payload: settings.disableBalanceOnAdd
  };
};

export const disableBalanceOnEdit = () => {
  const settings = JSON.parse(localStorage.getItem("settings"));
  settings.disableBalanceOnEdit = !settings.disableBalanceOnEdit;
  localStorage.setItem("settings", JSON.stringify(settings));
  return {
    type: DISABLE_BALANCE_ON_EDIT,
    payload: settings.disableBalanceOnEdit
  };
};

export const allowRegistration = () => {
  const settings = JSON.parse(localStorage.getItem("settings"));
  settings.allowRegistration = !settings.allowRegistration;
  localStorage.setItem("settings", JSON.stringify(settings));
  return {
    type: ALLOW_REGISTRATION,
    payload: settings.allowRegistration
  };
};
