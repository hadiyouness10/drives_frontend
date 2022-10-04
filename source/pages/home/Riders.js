import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from "react-native";

import RiderCard from "components/home/RiderCard";

export default function Riders() {
  return (
    <ScrollView>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <RiderCard
          title={"James Corden"}
          subTitle={"Devloper"}
          profile={{
            uri: "https://i2-prod.mirror.co.uk/incoming/article26827828.ece/ALTERNATES/s1200c/4_MAIN_CHP_280422SLUG_18300.jpg",
          }}
          icon={"forward"}
          iconColor={"grey"}
        />

        <RiderCard
          title={"Tom Holland"}
          subTitle={"Devloper"}
          profile={{
            uri: "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/2/2f/Tom_Holland.jpg/revision/latest?cb=20220213015022",
          }}
          icon={"forward"}
          iconColor={"grey"}
        />

        <RiderCard
          title={"Zendaya"}
          subTitle={"Devloper"}
          profile={{
            uri: "https://assets.teenvogue.com/photos/62ab3da8f40650219cbb86f8/master/pass/GettyImages-1401828538.jpg",
          }}
          icon={"forward"}
          iconColor={"grey"}
        />
      </SafeAreaView>
    </ScrollView>
  );
}

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
