import React from "react";
import { View, Text, Picker, StyleSheet } from "react-native";

function SelectField({ label, value, onChange, options }) {
    return (
        <View style={styles.selectContainer}>
            {label && <Text style={styles.label}>{label}</Text>}
            <Picker
                selectedValue={value}
                onValueChange={onChange}
                style={styles.select}
            >
                <Picker.Item label="Choose Your Category" value="" />
                {options.map((option, idx) => (
                    <Picker.Item key={idx} label={option} value={option} />
                ))}
            </Picker>
        </View>
    );
}

const styles = StyleSheet.create({
    selectContainer: {
        position: "relative",
        width: "100%",
        marginTop: 10,
    },
    select: {
        padding: 10,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#ccc",
        backgroundColor: "#fff",
        fontSize: 14,
        color: "#333",
    },
    label: {
        marginBottom: 5,
        color: "grey",
        fontSize: 16,
    },
});

export default SelectField;