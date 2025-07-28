import React, { useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import Posts from "../Posts";
import Description from "../../../../common/Description/Description";
import { filterPosts, resetFilter } from "../../../../../store/modules/postsSlice";
import { useIsFocused, useNavigation } from "@react-navigation/native";


function CategoryPage() {
    const route = useRoute();
    const { categoryName } = route.params;
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts.posts);
    const user = useSelector((state) => state.auth.user);
    const { filter, sortOrder, userId } = useSelector((state) => state.posts);
const isFocused = useIsFocused()

    useEffect(() => {
        if(isFocused){
   dispatch(filterPosts({
      filter: "category",
      sortOrder,
      category: categoryName,
      userId,
    }));
        }else{
            console.log(123)
        }
 
  }, [categoryName, dispatch, sortOrder, userId, posts]);
    return (
        <View style={styles.categoryPage}>
            <Text style={styles.title}>Category: {categoryName.replace(/-/g, " ")}</Text>
            {posts.length > 0 ? (
                <Posts posts={posts} />
            ) : (
                <Description>There are no posts in this category.</Description>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    categoryPage: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: "#1e1f21",
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