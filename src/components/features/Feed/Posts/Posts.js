import React, { useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../../../store/modules/postsSlice";
import PostCard from "../../../features/Feed/Posts/PostCard/PostCard";

function Posts() {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts.posts);
    const filteredPosts = useSelector((state) => state.posts.filteredPosts);
    const filter = useSelector((state) => state.posts.filter);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    const renderPost = ({ item }) => <PostCard post={item} />;
// console.log("Posts", posts);
    const data = filter === "all" ? posts : filteredPosts;

    return (
        <View style={styles.postsContainer}>
            {!data.length ? (
                <Text style={styles.noPostsText}>No posts available</Text>
            ) : (
                <FlatList
                    data={data}
                    renderItem={renderPost}
                    keyExtractor={(item) => item.id.toString()}
                />

                // <FlatList
//             data={posts}
//             keyExtractor={(item) => item.id}
//             renderItem={renderItem}
//             ListEmptyComponent={
//                 <Text style={styles.empty}>No posts found.</Text>
//             }
//             contentContainerStyle={
//                 posts.length === 0 && styles.emptyContainer
//             }
//         />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    postsContainer: {
        flex: 1,
        flexDirection: "column",
        gap: 16,
        paddingTop: 16,
    },
    noPostsText: {
        textAlign: "center",
        color: "#dfdddd",
        fontSize: 16,
    },
});

export default Posts;