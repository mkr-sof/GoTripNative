import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

function Button({ disabled, text, onPress, style, type = "button" }) {
    return (
        <TouchableOpacity
            style={[styles.button, disabled && styles.disabled, style]}
            onPress={onPress}
            disabled={disabled}
        >
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        width: 90,
        borderRadius: 7,
        backgroundColor: "#3137C9",
        padding: 10,
        alignItems: "center",
    },
    text: {
        color: "white",
        fontSize: 16,
    },
    disabled: {
        backgroundColor: "#a0a0a0",
    },
});

export default Button;