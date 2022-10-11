import React from "react";

export const AuthenticationContext = React.createContext({
  token: null,
  signOut: () => {},
});
