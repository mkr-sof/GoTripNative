import React from "react";
import { View, Text, StyleSheet } from "react-native";

function NotFound() {
    return (
        <View style={styles.notFoundContainer}>
            <Text style={styles.notFoundTitle}>404</Text>
            <Text style={styles.notFoundText}>Page not found</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    notFoundContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#2f3031",
    },
    notFoundTitle: {
        fontSize: 48,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 10,
    },
    notFoundText: {
        fontSize: 18,
        color: "#ccc",
    },
});

export default NotFound;