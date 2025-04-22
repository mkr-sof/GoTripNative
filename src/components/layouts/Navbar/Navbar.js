import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useNavigation } from "@react-navigation/native";

const categories = ["Adventure", "Nature", "City Trips", "Beach"];

function Navbar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigation = useNavigation();

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    const handleCategorySelect = (category) => {
        setIsDropdownOpen(false);
        navigation.navigate("CategoryPage", {
            categoryName: category.toLowerCase().replace(/\s+/g, "-"),
        });
    };

    return (
        <TouchableWithoutFeedback
            onPress={() => {
                if (isDropdownOpen) setIsDropdownOpen(false);
                Keyboard.dismiss(); 
            }}
        >
            <View style={styles.navbar}>
                <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                    <Text style={styles.navItem}>Home</Text>
                </TouchableOpacity>
                <View style={styles.dropdown}>
                    <TouchableOpacity onPress={toggleDropdown}>
                        <Text style={[styles.navItem, styles.dropdownButton]}>Categories</Text>
                    </TouchableOpacity>
                    {isDropdownOpen && (
                        <View style={styles.dropdownMenu}>
                            {categories.map((category, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => handleCategorySelect(category)}
                                >
                                    <Text style={styles.dropdownItem}>{category}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    navbar: {
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
    },
    navItem: {
        color: "#c5c2c2",
        fontWeight: "bold",
        fontSize: 14,
    },
    dropdown: {
        position: "relative",
    },
    dropdownButton: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#c5c2c2",
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
        zIndex: 1000,
        elevation: 10,
        // width: 160,
    },
    dropdownItem: {
        padding: 10,
        fontSize: 14,
        color: "#333",
        fontWeight: "normal",
        width: "100%",
    },
});

export default Navbar;