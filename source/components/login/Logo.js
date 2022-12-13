import React from "react";
import { Image, StyleSheet, View } from "react-native";

export const Logo = ({ mode }) => {
  return (
    <View
      style={[
        styles.view,
        mode === "Register" && { marginTop: "-8%", marginBottom: "5%" },
        mode === "Login" && { marginTop: "-55%", marginBottom: "30%" },
        mode === "Reset" && { marginTop: "-90%", marginBottom: "30%" },
      ]}
    >
      <Image
        source={require("../../assets/carpooling_logo.jpg")}
        style={[styles.image]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 110,
    height: 110,
    marginBottom: 8,
  },
  view: {
    backgroundColor: "#08082C",
    paddingHorizontal: "50%",
    paddingTop: "5%",
    position: "fixed",
  },
});
