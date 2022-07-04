import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import RiderCard from '../components/RiderCard';

export default function Riders() {

  return (
    <ScrollView>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <RiderCard style={styles.card}>
          <Text style={styles.sectionTitle}>Basic CardView Example</Text>
        </RiderCard>

        <RiderCard style={styles.card}>
          <Text style={styles.sectionTitle}>Basic CardView Example</Text>
        </RiderCard>

        <RiderCard style={styles.card}>
          <Text style={styles.sectionTitle}>Basic CardView Example</Text>
        </RiderCard>

        <RiderCard style={styles.card}>
          <Text style={styles.sectionTitle}>Basic CardView Example</Text>
        </RiderCard>




      </SafeAreaView>
    </ScrollView>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
    alignItems: 'center', // Centered horizontally
    
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: 'white',
  },
  card: {
    height: 180,
    width: '100%',
    backgroundColor: '#f18484',
    justifyContent: 'center', //Centered vertically
    alignItems: 'center', // Centered horizontally
    margin: 5
  },
});

