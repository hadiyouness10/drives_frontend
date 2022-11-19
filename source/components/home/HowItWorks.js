import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export const HowItWorks = ({ type }) => {
  let howItWorksInfo =
    type == "joinRide"
      ? [
          ["Search", "Find rides across Lebanon.", true],
          ["Compare", "Choose the fastest and cheapest ride.", true],
          ["Request", "Request a seat and message the driver.", false],
        ]
      : [
          ["Create", "Create a ride from or to your university.", true],
          ["Chat", "Chat with potential riders.", false],
          ["Ride", "Accept riders and complete the ride.", false],
        ];
  var steps = [];
  for (let i = 0; i < howItWorksInfo.length; i++) {
    steps.push(
      <View key={i}>
        <View
          style={{
            flexDirection: "row",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <Icon
            name={"cloud-done"}
            size={30}
            color={howItWorksInfo[i][2] ? "green" : "gray"}
            style={{ marginBottom: 10, marginLeft: 10, marginTop: 10 }}
          />
          <View style={{ marginLeft: 10, color: "#66869c" }}>
            <Text style={{ fontWeight: "500", fontSize: 18 }}>
              {howItWorksInfo[i][0]}{" "}
            </Text>
            <Text style={{ fontWeight: "400", fontSize: 15 }}>
              {howItWorksInfo[i][1]}
            </Text>
          </View>
        </View>
        <View style={styles.drawInnerLine}></View>
      </View>
    );
  }
  return (
    <View style={[styles.mainDiv]}>
      <Text style={{ fontWeight: "600", fontSize: 20, color: "#092436" }}>
        How It Works
      </Text>
      <View style={styles.drawLine}></View>
      {steps}
    </View>
  );
};

const styles = StyleSheet.create({
  mainDiv: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "space-between",
    color: "#092436",
    fontWeight: 600,
    marginBottom: 200,
  },
  drawLine: {
    borderBottomColor: "gray",
    marginTop: 10,
    borderBottomWidth: 0.4,
    width: "95%",
    marginLeft: "2%",
    marginRight: "2%",
  },
  drawInnerLine: {
    borderBottomColor: "gray",
    marginTop: 10,
    borderBottomWidth: 0.4,
    width: "80%",
    marginLeft: "10%",
    marginRight: "5%",
  },
});
