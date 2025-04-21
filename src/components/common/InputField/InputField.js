import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet, Animated } from "react-native";

function InputField({ label, type = "default", placeholder, value, onChange }) {
    const [isFocused, setIsFocused] = useState(false);
    const labelPosition = new Animated.Value(value ? 1 : 0);

    const handleFocus = () => {
        setIsFocused(true);
        Animated.timing(labelPosition, {
            toValue: 1,
            duration: 300,
            useNativeDriver: false,
        }).start();
    };

    const handleBlur = () => {
        setIsFocused(false);
        if (!value) {
            Animated.timing(labelPosition, {
                toValue: 0,
                duration: 300,
                useNativeDriver: false,
            }).start();
        }
    };

    const labelStyle = {
        position: "absolute",
        left: 0,
        bottom: labelPosition.interpolate({
            inputRange: [0, 1],
            outputRange: [10, 30],
        }),
        fontSize: labelPosition.interpolate({
            inputRange: [0, 1],
            outputRange: [16, 12],
        }),
        color: labelPosition.interpolate({
            inputRange: [0, 1],
            outputRange: ["grey", "#007bff"],
        }),
    };

    return (
        <View style={styles.inputContainer}>
            <TextInput
                style={[
                    styles.inputField,
                    isFocused && styles.focusedInputField,
                ]}
                value={value}
                onChangeText={onChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder={placeholder}
                placeholderTextColor="transparent"
                keyboardType={type}
            />
            {label && (
                <Animated.Text style={labelStyle}>
                    {label}
                </Animated.Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        position: "relative",
        width: "100%",
    },
    inputField: {
        width: "100%",
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        backgroundColor: "transparent",
        fontSize: 16,
        color: "#fff",
    },
    focusedInputField: {
        borderBottomWidth: 2,
        borderBottomColor: "#007bff",
    },
});

export default InputField;