import React from "react";
import { View, StyleSheet, Text, Keyboard } from "react-native";
import { TextInput as Input } from "react-native-paper";
import { theme } from "core";

export const TextInput = ({ errorText, description, ...props }) => {
  return (
    <View style={styles.container}>
      <Input
        on={Keyboard.dismiss}
        style={styles.input}
        selectionColor='#1D67E2'
        underlineColor="transparent"
        mode="outlined"
        {...props}
      />
      {description && !errorText ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 12,
  },
  input: {
    backgroundColor: theme.colors.surface,
  },
  description: {
    fontSize: 13,
    color: theme.colors.secondary,
    paddingTop: 8,
  },
  error: {
    fontSize: 13,
    color: theme.colors.error,
    paddingTop: 8,
  },
});
