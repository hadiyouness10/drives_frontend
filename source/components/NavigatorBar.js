import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import JoinRide from '../pages/JoinRide'
import StartRide from '../pages/StartRide'
import Account from "../pages/Account";
import Icon from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

const Tab = createBottomTabNavigator();

export default function NavigatorBar() {
    return (
        <View style={{ flex: 1, marginBottom: 10 }}>
            <StatusBar style='dark-content' />
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {

                        if (route.name === 'Join Ride') {
                            return <Icon name={focused ? 'car-sport' : 'car-sport-outline'} size={size} color={color} />;
                        } else if (route.name === 'Start Ride') {
                            return <Icon name={focused ? 'create' : 'create-outline'} size={size} color={color} />;
                        } else if (route.name === 'Account') {
                            return <MaterialCommunityIcons name={focused ? 'account' : 'account-outline'} size={size} color={color} />;
                        }


                    },
                    tabBarActiveTintColor: 'rgb(0, 125, 200)',
                    tabBarInactiveTintColor: 'gray',
                    headerShown: false,
                    tabBarStyle: { height: 55 },
                    tabBarItemStyle: { height: 50 }
                })}>
                <Tab.Screen name="Join Ride" component={JoinRide} />
                <Tab.Screen name="Start Ride" component={StartRide} />
                <Tab.Screen name="Account" component={Account} />
            </Tab.Navigator>
        </View>
    )
}