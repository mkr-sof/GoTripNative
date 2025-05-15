import React, { useEffect } from "react";
import { View, TextInput, StyleSheet, Platform } from "react-native";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    interpolate,
} from "react-native-reanimated";

const InputField = ({
    label,
    name,
    type,
    placeholder,
    className,
    value,
    onChange,
    onBlur,
    onFocus,
}) => {
    const isFocused = useSharedValue(value ? 1 : 0);

    useEffect(() => {
        isFocused.value = value ? 1 : 0;
    }, [value]);

    const animatedLabelStyle = useAnimatedStyle(() => {
        return {
            position: 'absolute',
            left: 0,
            bottom: interpolate(isFocused.value, [0, 1], [10, 40]),
            fontSize: interpolate(isFocused.value, [0, 1], [16, 12]),
            color: isFocused.value === 1 ? '#007bff' : 'grey',
        };
    });

    const handleFocus = () => {
        isFocused.value = withTiming(1, { duration: 200 });
        onFocus?.();
    };

    const handleBlur = () => {
        if (!value) {
            isFocused.value = withTiming(0, { duration: 200 });
        }
        onBlur?.();
    };

    return (
        <View style={styles.inputContainer}>
            <Animated.Text style={[styles.inputLabel, animatedLabelStyle]}>
                {label}
            </Animated.Text>
            <TextInput
                style={[styles.inputField, className]}
                value={value}
                onChangeText={onChange}
                onBlur={handleBlur}
                onFocus={handleFocus}
                placeholder=" "
                placeholderTextColor="#ddd"
                secureTextEntry={type === "password"}
                autoCapitalize="none"
                autoComplete={Platform.OS === 'web' ? "off" : "off"}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        position: 'relative',
        width: '100%',
        marginBottom: 20,
    },
    inputField: {
        width: '100%',
        height: 40,
        marginTop: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        backgroundColor: 'transparent',
        fontSize: 16,
        color: '#fff',
    },
    inputLabel: {
        position: 'absolute',
        left: 0,
        // bottom is animated
        // fontSize is animated
        color: 'grey', // default color
    },
});

export default InputField;
