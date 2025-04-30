import React, {useState} from "react";
import { View, Text, StyleSheet, TouchableOpacity, Pressable, TouchableWithoutFeedback } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

function SelectField({ value, onSelect, options, placeholder = "Choose a Category", width = 160 }) {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const handleSelect = (option) => {
        setSelected(option);
        setOpen(false);
        onSelect(option);
    };
    return (
        <View style={[styles.dropdown, { width }]}>
            <TouchableOpacity onPress={() => setOpen(!open)}>
                <Text style={styles.dropdownButton}>
                    {selected || placeholder}
                </Text>
            </TouchableOpacity>
            {open && (
                <>
                    {/* Pressable overlay to detect outside tap */}
                    <Pressable
                        style={StyleSheet.absoluteFill}
                        onPress={() => setOpen(false)}
                    />
                    <View style={[styles.dropdownMenu, { width }]}>
                        {options.map((option, idx) => (
                            <TouchableOpacity
                                key={idx}
                                onPress={() => handleSelect(option)}
                            >
                                <Text style={styles.dropdownItem}>{option}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </>
            )}
        </View>
    );
}
const styles = StyleSheet.create({
    dropdown: {
        position: "relative",
        zIndex: 1000,
    },
    dropdownButton: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#c5c2c2",
        paddingVertical: 10,
    },
    dropdownMenu: {
        position: "absolute",
        top: 30,
        left: 0,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 10,
    },
    dropdownItem: {
        padding: 10,
        fontSize: 14,
        color: "#333",
        fontWeight: "normal",
        width: "100%",
    },
});
export default SelectField;