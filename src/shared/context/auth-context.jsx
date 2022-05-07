import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  userId: "",
  petId: "",
  token: null,
  login: () => {},
  logout: () => {},
  isAdmin: true
});

export default AuthContext;
