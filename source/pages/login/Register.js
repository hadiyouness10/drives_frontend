import React, { useContext,useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import {
  Background,
  Logo,
  Header,
  Button,
  TextInput,
  BackButton,
} from "components";
import { theme } from "core";
import { emailValidator, passwordValidator, nameValidator } from "utils";
import { AuthenticationContext } from "routes/authentication-context";
import client from "api/client";

export const Register = ({ navigation }) => {
  const [firstName, setFirstName] = useState({ value: "", error: "" });
  const [lastName, setLastName] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });

  const { signIn } = useContext(AuthenticationContext);


  const Register = async () => {
    const firstnameError = nameValidator(firstName.value);
    const lastnameError = nameValidator(lastName.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError || firstnameError || lastnameError) {
      setFirstName({ ...firstName, error: firstnameError });
      setLastName({ ...lastName, error: lastnameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }
    try {
        await client.post('/authentication/register', {
            firstname: firstName.value,
            lastname:lastName.value,
            email: email.value,
            password: password.value,
        }).then(res =>{
          console.log(res.data)
          // Login logic will get us the ID and name of the user
          signIn("123", 1, "User", "Generic");
          navigation.navigate("Home");
        });
        
    } catch (error) {
      
    }
}


  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Create Account</Header>
      <TextInput
        label="First Name"
        returnKeyType="next"
        value={firstName.value}
        onChangeText={(text) => setFirstName({ value: text, error: "" })}
        error={!!firstName.error}
        errorText={firstName.error}
      />
      <TextInput
        label="Last Name"
        returnKeyType="next"
        value={lastName.value}
        onChangeText={(text) => setLastName({ value: text, error: "" })}
        error={!!lastName.error}
        errorText={lastName.error}
      />
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: "" })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: "" })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <Button
        mode="contained"
        onPress={Register}
        style={{ marginTop: 24 }}
      >
        Register
      </Button>
      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace("Login")}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});
