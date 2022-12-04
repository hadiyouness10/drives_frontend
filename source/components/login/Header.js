import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { theme } from "core";

export const Header = (props) => {
  return <Text style={styles.header} {...props} />;
};

const styles = StyleSheet.create({
  header: {
    fontSize: 21,
    color: '#1D67E2',
    fontWeight: "bold",
    paddingVertical: 12,
  },
});
