import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Account, JoinRide, RideDetails, StartRide } from "pages";
import { stackScreenOptions, tabScreenOptions } from "./screen-options";
import { Provider } from "react-native-paper";
import { theme } from "core/theme";
import { Start, Login, Register, ResetPassword } from "pages";
import { RiderDetails } from "pages/home/RiderDetails";
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const isLoggedIn = true;

export const AppRouter = () => {
  return (
    <Tab.Navigator screenOptions={tabScreenOptions}>
      <Tab.Screen name="Join Ride" component={JoinRideNavigator} />
      <Tab.Screen name="Start Ride" component={StartRideNavigator} />
      <Tab.Screen name="Account" component={AccountNavigator} />
    </Tab.Navigator>
  );
};

const JoinRideNavigator = () => {
  return (
    <Stack.Navigator screenOptions={stackScreenOptions}>
      <Stack.Screen name="/" component={JoinRide} />
      <Stack.Screen name="RiderDetails" component={RiderDetails} />
    </Stack.Navigator>
  );
};

const StartRideNavigator = () => {
  return (
    <Stack.Navigator screenOptions={stackScreenOptions}>
      <Stack.Screen name="/" component={StartRide} />
    </Stack.Navigator>
  );
};

const AccountNavigator = () => {
  return (
    <Stack.Navigator screenOptions={stackScreenOptions}>
      <Stack.Screen name="/" component={Account} />
    </Stack.Navigator>
  );
};

export const LoginNavigator = () => {
  return (
    <Provider theme={theme}>
      <Stack.Navigator
        initialRouteName={isLoggedIn ? "Home" : "Start"}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="ResetPasswordScreen" component={ResetPassword} />
        <Stack.Screen name="Home" component={AppRouter} />
      </Stack.Navigator>
    </Provider>
  );
};
