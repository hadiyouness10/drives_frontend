import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  StatusBar,
  View,
  Dimensions,
} from "react-native";

import { RideView } from "components";

const riderdummydata = [
  {
    name: "Sara Al Arab",
    source:
      "https://images.unsplash.com/photo-1566807810030-3eaa60f3e670?ixlib=rb-1.2.1&auto=format&fit=crop&w=3334&q=80",
  },
  {
    name: "Khaled Jalloul",
    source:
      "https://images.unsplash.com/photo-1566807810030-3eaa60f3e670?ixlib=rb-1.2.1&auto=format&fit=crop&w=3334&q=80",
  },
];

const ridedummydata = [
  {
    price: 20,
    nbofRiders: 3,
    destination: "LAU",
    departure: "Bchamoun",
    date: "10/15/2020 at 12:00 P.M.",
  },
  {
    price: 18,
    nbofRiders: 4,
    destination: "LAU",
    departure: "Beirut",
    date: "10/15/2020 at 10:00 A.M.",
  },
];

export const Riders = ({ navigation }) => {
  return (
    <ScrollView style={{ marginTop: 20 }}>
      <SafeAreaView style={styles.container}>
        <RideView riderInfo={riderdummydata[0]} rideInfo={ridedummydata[0]} />
        <RideView riderInfo={riderdummydata[1]} rideInfo={ridedummydata[1]} />
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
    alignItems: "center", // Centered horizontally
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "500",
    color: "white",
  },
  card: {
    height: 180,
    width: "100%",
    backgroundColor: "#f18484",
    justifyContent: "center", //Centered vertically
    alignItems: "center", // Centered horizontally
    margin: 5,
  },
});
