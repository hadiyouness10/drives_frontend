import React from "react";
import { Background, Logo, Header, Button, Paragraph } from "components";

export const Start = ({ navigation }) => {
  return (
    <Background mode="Start">
      <Logo mode="Start" />
      <Header>Khedne Maak</Header>
      <Button mode="contained" onPress={() => navigation.navigate("Login")}>
        Login
      </Button>
      <Button mode="outlined" onPress={() => navigation.navigate("Register")}>
        Register
      </Button>
    </Background>
  );
};
