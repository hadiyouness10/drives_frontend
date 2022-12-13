import React from "react";
import {
  ImageBackground,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import { theme } from "core";

export const Background = ({ mode, children }) => {
  return (
    <ImageBackground
      onPress={Keyboard.dismiss}
      accessible={false}
      style={[
        styles.background,
        mode === "Start" && { backgroundColor: "#08082C", marginBottom: "0%" },
      ]}
    >
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        {children}
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    backgroundColor: theme.colors.surface,
    marginBottom: "5%",
  },
  container: {
    flex: 1,
    padding: 20,
    width: "100%",
    maxWidth: 340,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});
