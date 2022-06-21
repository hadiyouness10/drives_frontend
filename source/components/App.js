import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import NavigatorBar from './NavigatorBar';

export default function App() {
  return (
    <NavigationContainer>
      <NavigatorBar />
    </NavigationContainer>
  );
}

