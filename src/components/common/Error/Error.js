import React from "react";
import { Text, StyleSheet } from "react-native";

function Error({ message }) {
  return (
    <Text style={styles.container}>
      {message}
    </Text>
  );
}

const styles = StyleSheet.create({
  container: {
    fontSize: 22, 
    lineHeight: 48, 
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
});

export default Error;