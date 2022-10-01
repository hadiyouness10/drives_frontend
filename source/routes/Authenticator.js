import { AppRouter } from "./AppRouter";
import { Start, Login, Register, ResetPassword } from "pages";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-native-paper";
import { theme } from "core";

const isLoggedIn = true;

const Stack = createStackNavigator();

export const Authenticator = () => {
  return isLoggedIn ? <AppRouter /> : <LoginNavigator />;
};

export const LoginNavigator = () => {
  return (
    <Provider theme={theme}>
      <Stack.Navigator
        initialRouteName="Start"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="ResetPasswordScreen" component={ResetPassword} />
      </Stack.Navigator>
    </Provider>
  );
};
