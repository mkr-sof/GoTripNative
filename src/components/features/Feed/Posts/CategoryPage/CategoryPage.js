import React, { useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import Posts from "../Posts";
import Description from "../../../../common/Description/Description";
import { filterPosts } from "../../../../../store/modules/postsSlice";

function CategoryPage() {
    const route = useRoute();
    const { categoryName } = route.params;
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts.filteredPosts);
    const { filter, sortOrder, userId } = useSelector((state) => state.posts);

    useEffect(() => {
        dispatch(filterPosts({ filter, sortOrder, userId, category: categoryName }));
    }, [categoryName, dispatch, filter, sortOrder, userId]);

    return (
        <ScrollView contentContainerStyle={styles.categoryPage}>
            <Text style={styles.title}>Category: {categoryName.replace(/-/g, " ")}</Text>
            {posts.length > 0 ? (
                <Posts posts={posts} />
            ) : (
                <Description>There are no posts in this category.</Description>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    categoryPage: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: "#2f3031",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 20,
        textAlign: "center",
    },
});

export default CategoryPage;