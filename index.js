import { registerRootComponent } from 'expo';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import NavigatorBar from './source/components/NavigatorBar';

export default function App() {
  return (
    <NavigationContainer>
      <NavigatorBar />
    </NavigationContainer>
  );
}

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
