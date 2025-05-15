
import React from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const categories = ["Adventure", "Nature", "City Trips", "Beach"];

const CategoryListScreen = () => {
    const navigation = useNavigation();

    const handlePress = (category) => {
        navigation.navigate("CategoryPage", { categoryName: category });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Categories</Text>
            <FlatList
                data={categories}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.item} onPress={() => handlePress(item)}>
                        <Text style={styles.itemText}>{item}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#2f3031",
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 20,
    },
    item: {
        padding: 15,
        borderRadius: 8,
        backgroundColor: "#3a3b3c",
        marginBottom: 10,
    },
    itemText: {
        color: "#fff",
        fontSize: 18,
    },
});

export default CategoryListScreen;
