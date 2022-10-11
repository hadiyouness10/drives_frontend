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
import MapCardView from "@paraboly/react-native-map-card-view";

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
        <RiderCard
          title={"James Corden"}
          subTitle={"Devloper"}
          profile={{
            uri: "https://i2-prod.mirror.co.uk/incoming/article26827828.ece/ALTERNATES/s1200c/4_MAIN_CHP_280422SLUG_18300.jpg",
          }}
          icon={"forward"}
          iconColor={"grey"}
          navigation={navigation}
        />

        <RiderCard
          title={"Tom Holland"}
          subTitle={"Devloper"}
          profile={{
            uri: "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/2/2f/Tom_Holland.jpg/revision/latest?cb=20220213015022",
          }}
          icon={"forward"}
          iconColor={"grey"}
          navigation={navigation}
        />

        <RiderCard
          title={"Zendaya"}
          subTitle={"Devloper"}
          profile={{
            uri: "https://assets.teenvogue.com/photos/62ab3da8f40650219cbb86f8/master/pass/GettyImages-1401828538.jpg",
          }}
          icon={"forward"}
          iconColor={"grey"}
          navigation={navigation}
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
