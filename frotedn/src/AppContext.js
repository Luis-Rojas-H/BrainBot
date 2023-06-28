import React, { createContext, useReducer } from "react";

export const AppContext = createContext();

const initialState = {
  preguntas: "",
  nivel: "",
  curso: "",
  nota: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SELECT_PREGUNTAS":
      return {
        ...state,
        preguntas: action.payload
      };
    case "SELECT_NIVEL":
        return {
          ...state,
          nivel: action.payload
        };
        case "SELECT_CURSO":
        return {
          ...state,
          curso: action.payload
        };
        case "CALCULAR_NOTA":
          return {
            ...state,
            nota: action.payload
          };
    default:
      return state;
  }
};

export const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
