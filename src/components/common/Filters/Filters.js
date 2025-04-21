import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { filterPosts } from "../../../store/modules/postsSlice";

function Filters() {
    const dispatch = useDispatch();
    const filter = useSelector((state) => state.posts.filter); // Assuming `filter` is part of the posts slice
    const sortOrder = useSelector((state) => state.posts.sortOrder); // Assuming `sortOrder` is part of the posts slice

    const handleFilterChange = (newFilter) => {
        dispatch(filterPosts({ filter: newFilter, sortOrder }));
    };

    const handleSortOrderChange = (newSortOrder) => {
        dispatch(filterPosts({ filter, sortOrder: newSortOrder }));
    };

    return (
        <View style={styles.filters}>
            <View style={styles.filterGroup}>
                <TouchableOpacity onPress={() => handleFilterChange("all")}>
                    <Text style={[styles.filterText, filter === "all" && styles.active]}>
                        All
                    </Text>
                </TouchableOpacity>
                <Text style={styles.separator}>/</Text>
                <TouchableOpacity onPress={() => handleFilterChange("favorites")}>
                    <Text style={[styles.filterText, filter === "favorites" && styles.active]}>
                        Favorites
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.filterGroup}>
                <TouchableOpacity onPress={() => handleSortOrderChange("oldest")}>
                    <Text style={[styles.filterText, sortOrder === "oldest" && styles.active]}>
                        Oldest First
                    </Text>
                </TouchableOpacity>
                <Text style={styles.separator}>/</Text>
                <TouchableOpacity onPress={() => handleSortOrderChange("newest")}>
                    <Text style={[styles.filterText, sortOrder === "newest" && styles.active]}>
                        Newest First
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    filters: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
        padding: 12,
        borderRadius: 4,
        backgroundColor: "#202020",
        borderWidth: 1,
        borderColor: "#2c2c2c",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    filterGroup: {
        flexDirection: "row",
        alignItems: "center",
    },
    filterText: {
        fontSize: 14,
        color: "#ccc",
        paddingHorizontal: 8,
    },
    separator: {
        fontSize: 14,
        color: "#ccc",
    },
    active: {
        color: "#2f33a1",
    },
});

export default Filters;