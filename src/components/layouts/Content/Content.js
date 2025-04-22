// function Content({ children, className }) {
//   return children;
// }

// export default Content;

import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import Header from "../Header/Header";

function Content({ children }) {
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {children}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    flexGrow: 1,
  },
});

export default Content;