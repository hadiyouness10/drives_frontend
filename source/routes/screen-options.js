import Icon from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export const tabScreenOptions = ({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => {
    if (route.name === "New Ride") {
      return (
        <Icon
          name={focused ? "car-sport" : "car-sport-outline"}
          size={size}
          color={color}
        />
      );
    } else if (route.name === "Your Rides") {
      return (
        <Icon
          name={focused ? "ios-list" : "ios-list-outline"}
          size={size}
          color={color}
        />
      );
    } else if (route.name === "Account") {
      return (
        <MaterialCommunityIcons
          name={focused ? "account" : "account-outline"}
          size={size}
          color={color}
        />
      );
    }
  },
  tabBarActiveTintColor: "rgb(0, 125, 200)",
  tabBarInactiveTintColor: "gray",
  headerShown: false,
  tabBarStyle: { height: 65 },
  tabBarItemStyle: { height: 50 },
});

export const stackScreenOptions = {
  headerShown: false,
};
