import { Reducer } from "react";

export const reducer: Reducer<
  {
    auth: boolean,
    name: string
  },
  { type: ACTION; payload?: any }
> = (state, action) => {
  switch (action.type) {
    case ACTION.signIn:
      return { ...state, auth: true, name: action.payload };

    case ACTION.logout:
      return { ...state, auth: false, name: "" };


    default:
      break;
  }
  return;
};
enum ACTION {
  signIn = "signIn",
  logout = "logout",
  register = "register",
}
