import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import JoinRide from './JoinRide'
import StartRide from './StartRide'
import Account from "./Account";
import Icon from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

const Tab = createBottomTabNavigator();

export default function NavigatorBar() {
    return (
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
                    tabBarActiveTintColor: '#00bbff',
                    tabBarInactiveTintColor: 'gray',
                    headerShown: false,
                })}>
                <Tab.Screen name="Join Ride" component={JoinRide} />
                <Tab.Screen name="Start Ride" component={StartRide} />
                <Tab.Screen name="Account" component={Account} />
            </Tab.Navigator>
    )
}