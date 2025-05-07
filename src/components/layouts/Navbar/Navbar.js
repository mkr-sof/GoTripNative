import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import SelectField from "../../common/SelectField/SelectField"; 

const categories = ["Adventure", "Nature", "City Trips", "Beach"];

function Navbar() {
    const navigation = useNavigation();
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleCategorySelect = (category) => {
        navigation.navigate("CategoryPage", {
            categoryName: category.toLowerCase().replace(/\s+/g, "-"),
        });
    };

    return (
        <View style={styles.navbar}>
            <TouchableOpacity onPress={() => navigation.navigate("FeedMavigation")}>
                <Text style={styles.navItem}>Home</Text>
            </TouchableOpacity>

            <SelectField
                style={styles.navItem}
                value={selectedCategory}
                onSelect={handleCategorySelect}
                options={categories}
                placeholder="Categories"
                width={160}
            />
        </View>
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
});

export default Navbar;