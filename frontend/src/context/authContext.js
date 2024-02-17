import { jwtDecode } from "jwt-decode";
import { APP_TOKEN_KEY } from "../constants";
import { createContext, useReducer } from "react";

const initialState = {
  user: null,
};

if (localStorage.getItem(APP_TOKEN_KEY)) {
  const decodedToken = jwtDecode(localStorage.getItem(APP_TOKEN_KEY));

  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem(APP_TOKEN_KEY);
  } else {
    initialState.user = decodedToken;
  }
}

const AuthContext = createContext({
  user: null,
  login: (userData) => {},
  logOut: () => {},
});

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };

    case "LOGOUT":
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
};

function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (userData) => {
    localStorage.setItem(APP_TOKEN_KEY, userData.token);
    dispatch({
      type: "LOGIN",
      payload: {
        userId: userData.user.id,
      },
    });
  };

  const logOut = (userData) => {
    localStorage.removeItem(APP_TOKEN_KEY);
    dispatch({
      type: "LOGOUT",
    });
  };

  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logOut }}
      {...props}
    />
  );
}

export { AuthContext, AuthProvider };
