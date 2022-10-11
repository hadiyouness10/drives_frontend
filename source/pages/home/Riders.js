import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  StatusBar,
  View,
} from "react-native";

import RiderCard from "components/home/RiderCard";
import {} from "react-native";
import MapCardView from "components/home/MapCardView";

const dummyData = [
  {
    name: "Azamat Zhanisov",
    source:
      "https://images.unsplash.com/photo-1566807810030-3eaa60f3e670?ixlib=rb-1.2.1&auto=format&fit=crop&w=3334&q=80",
  },
  {
    name: "Ayo Ogunseinde",
    source:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3000&q=80",
  },
];

export const Riders = ({ navigation }) => {
  return (
    <ScrollView style={{ marginTop: 20 }}>
      <SafeAreaView style={styles.container}>
        <MapCardView
          data={dummyData}
          title="Hello"
          colors={["red", "black", "gray"]}
        />
        <MapCardView
          data={dummyData}
          title="Hello"
          colors={["red", "black", "gray"]}
        />
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
