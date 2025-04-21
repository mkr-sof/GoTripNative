import React from "react";
import { View, Text, StyleSheet } from "react-native";

function Logo() {
    return (
        <View style={styles.logo}>
            <Text style={styles.logoText}>GO TRIP</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    logo: {
        marginBottom: 10,
    },
    logoText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#fff",
    },
});

export default Logo;