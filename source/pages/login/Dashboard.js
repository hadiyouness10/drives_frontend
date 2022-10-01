import React from "react";
import { Background, Logo, Header, Paragraph, Button } from "components";

export default function Dashboard({ navigation }) {
  return (
    <Background>
      <Logo />
      <Header>Let’s start</Header>
      <Paragraph>
        Your amazing app starts here. Open you favorite code editor and start
        editing this project.
      </Paragraph>
      <Button
        mode="outlined"
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: "Start" }],
          })
        }
      >
        Logout
      </Button>
    </Background>
  );
}
