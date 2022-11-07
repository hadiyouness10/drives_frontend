import React from "react";

export const AuthenticationContext = React.createContext({
  token: null,
  userID: null,
  firstName: null,
  lastName: null,
  signIn: () => {},
  signOut: () => {},
});
