import React from "react";
import { SafeAreaView, StyleSheet, ScrollView, View, Text } from "react-native";

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
    <View style={styles.mainView}>
      <Text style={{ marginLeft: 26, marginTop: 40, fontSize: 24 }}>
        Available Rides
      </Text>
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <RideView
          riderInfo={riderdummydata[0]}
          rideInfo={ridedummydata[0]}
          navigation={navigation}
        />
        <RideView
          riderInfo={riderdummydata[1]}
          rideInfo={ridedummydata[1]}
          navigation={navigation}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: "white",
  },
});
