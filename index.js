import "react-native-gesture-handler";
import { registerRootComponent } from "expo";
import React from "react";
import AppRouter from "./source/routes/app-router";
import { NavigationContainer } from "@react-navigation/native";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <View style={{ flex: 1 }}>
          <StatusBar style="dark-content" />
          <AppRouter />
        </View>
      </NavigationContainer>
    </QueryClientProvider>
  );
}

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);