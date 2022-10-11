import React from "react";

export const AuthenticationContext = React.createContext({
  token: null,
  userID: null,
  signIn: () => {},
  signOut: () => {},
});
