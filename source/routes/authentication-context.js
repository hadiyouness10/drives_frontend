import React from "react";

export const AuthenticationContext = React.createContext({
  token: null,
  userId: null,
  firstName: null,
  lastName: null,
  signIn: () => {},
  signOut: () => {},
});
