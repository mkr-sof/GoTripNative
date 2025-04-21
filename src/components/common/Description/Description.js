import React from "react";
import { Text, StyleSheet } from "react-native";

function Description({ children, style }) {
    return (
        <Text style={[styles.description, style]}>
            {children}
        </Text>
    );
}

const styles = StyleSheet.create({
    description: {
        fontSize: 16, 
        lineHeight: 24, 
        color: "#c5c0c0",
        marginBottom: 24, 
        textAlign: "left",
        padding: 16,
    },
});

export default Description;