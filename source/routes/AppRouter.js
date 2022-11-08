import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { stackScreenOptions, tabScreenOptions } from "./screen-options";
import { Provider } from "react-native-paper";
import { theme } from "core/theme";
import {
  Start,
  Login,
  Register,
  ResetPassword,
  NewRide,
  DropPin,
  DriverDetails,
  RideDetails,
  Account,
  Riders,
  YourRides,
} from "pages";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { AuthenticationContext } from "./authentication-context";
import { View } from "react-native";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export const AppRouter = () => {
  return (
    <Tab.Navigator screenOptions={tabScreenOptions}>
      <Tab.Screen name="New Ride" component={NewRideNavigator} />
      <Tab.Screen name="Your Rides" component={YourRidesNavigator} />
      <Tab.Screen name="Account" component={AccountNavigator} />
    </Tab.Navigator>
  );
};

const NewRideNavigator = () => {
  return (
    <Stack.Navigator screenOptions={stackScreenOptions}>
      <Stack.Screen name="/" component={NewRide} />
      <Stack.Screen name="Drop Pin" component={DropPin} />
      <Stack.Screen name="Riders" component={Riders} />
      <Stack.Screen name="Ride Details" component={RideDetails} />
      <Stack.Screen name="Driver Details" component={DriverDetails} />
    </Stack.Navigator>
  );
};

const YourRidesNavigator = () => {
  return (
    <Stack.Navigator screenOptions={stackScreenOptions}>
      <Stack.Screen name="/" component={YourRides} />
      <Stack.Screen name="Ride Details (Your Rides)" component={RideDetails} />
      <Stack.Screen
        name="Driver Details (Your Rides)"
        component={DriverDetails}
      />
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
  const [authentication, setAuthentication] = useState(undefined);

  const getToken = async () => {
    const storedAuthentication = await AsyncStorage.getItem("authentication");
    if (!storedAuthentication) setAuthentication(null);
    else setAuthentication(JSON.parse(storedAuthentication));
  };

  useEffect(() => {
    getToken();
  }, []);

  return typeof authentication === "undefined" ? (
    <View />
  ) : (
    <Provider theme={theme}>
      <AuthenticationContext.Provider
        value={{
          token: authentication?.token,
          userID: authentication?.userID,
          firstName: authentication?.firstName,
          lastName: authentication?.lastName,

          signIn: async (token, userID, firstName, lastName) => {
            await AsyncStorage.setItem(
              "authentication",
              JSON.stringify({
                token: "123",
                userID: 1,
                firstName: "User",
                lastName: "Generic",
              })
            );
            setAuthentication({ token, userID, firstName, lastName });
          },
          signOut: () => setAuthentication(null),
        }}
      >
        <Stack.Navigator
          initialRouteName={authentication ? "Home" : "Start"}
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
      </AuthenticationContext.Provider>
    </Provider>
  );
};
