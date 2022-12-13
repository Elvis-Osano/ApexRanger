
import { valuType } from "@interfaces/index";
import React, { useContext, useMemo, useReducer } from "react";

import { reducer } from "../reducer";

//Create COntext
export const userContext = React.createContext<valuType>({
  state: {
    auth: false,
    name: ""
  },
  dispatch: (val) => { }
});
//ContextHook
export const useAuth: () => valuType = () => useContext(userContext);

//Contxt Provider
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    auth: false,
    name: ""
  })

  const value = useMemo(() => ({ state, dispatch }), [state, dispatch])
  return (
    <userContext.Provider
      value={value}
    >
      {children}
    </userContext.Provider>

  );
};
