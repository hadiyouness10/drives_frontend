import React from 'react'
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { theme } from '../core/theme'
import {
  Start,
  Login,
  Register,
  ResetPassword,
} from '../pages'

const Stack = createStackNavigator()

export default function NavigatorStack() {
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
          <Stack.Screen
            name="ResetPasswordScreen"
            component={ResetPassword}
          />
        </Stack.Navigator>
    </Provider>
  )
}