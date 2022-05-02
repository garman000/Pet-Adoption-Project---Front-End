import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  userId: "",
  login: () => {},
  logout: () => {},
  isAdmin: true
});

export default AuthContext;
