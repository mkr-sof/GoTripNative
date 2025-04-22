import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Filters from "../../common/Filters/Filters";
import { getDataFromLocalStorage } from "../../../services/storageService";
import CreatePost from "../../features/Feed/CreatePost/CreatePost";
import Description from "../../common/Description/Description";
import Button from "../../common/Button/Button";
import Popup from "../../common/Popup/Popup";
import Content from "../../layouts/Content/Content";
import { setPosts, filterPosts } from "../../../store/modules/postsSlice";
import Posts from "../../features/Feed/Posts/Posts";

function Feed() {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts.posts);
    const filteredPosts = useSelector((state) => state.posts.filteredPosts);
    const filter = useSelector((state) => state.posts.filter);
    const user = useSelector((state) => state.auth.user);
    const sortOrder = useSelector((state) => state.posts.sortOrder);

    const [isCreateOpen, setIsCreateOpen] = useState(false);

    useEffect(() => {
        const allPosts = getDataFromLocalStorage("allPosts") || [];
        dispatch(setPosts(allPosts));
    }, [dispatch]);

    useEffect(() => {
        if (posts.length > 0) {
            dispatch(filterPosts({ filter, sortOrder, userId: user?.id }));
        }
    }, [posts, filter, sortOrder, dispatch, user?.id]);

    const handleFilterChange = (filter, sortOrder) => {
        dispatch(filterPosts({ filter, sortOrder, userId: user?.id }));
    };

    const handleNewPost = (filter, sortOrder, updatedPosts) => {
        dispatch(setPosts(updatedPosts));
        dispatch(filterPosts({ filter, sortOrder, userId: user?.id }));
    };

    return (
        <Content>
        <ScrollView contentContainerStyle={styles.feedContainer}>
            {user && (
                <View style={styles.createHeader}>
                    <Text style={styles.headerText}>Create your own posts</Text>
                    <Button
                        text="Create"
                        onPress={() => setIsCreateOpen(true)}
                        style={styles.createTrigger}
                    />
                </View>
            )}
            {posts.length > 0 && <Filters onFilterChange={handleFilterChange} />}
            {(filteredPosts || []).length > 0 ? (
                <Posts posts={filteredPosts} />
            ) : (
                <Description>There are no cards in the system yet.</Description>
            )}
            {isCreateOpen && (
                <Popup visible={isCreateOpen} onClose={() => setIsCreateOpen(false)}>
                    <CreatePost
                        onPostCreated={(newPost) => {
                            setIsCreateOpen(false);
                            handleNewPost(filter, sortOrder, [newPost, ...posts]);
                        }}
                    />
                </Popup>
            )}
        </ScrollView>
        </Content>
    );
}

const styles = StyleSheet.create({
    feedContainer: {
        flexGrow: 1,
        backgroundColor: "#2f3031",
        borderRadius: 8,
        padding: 20,
        width: "100%",
    },
    createHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#3a3b3c",
        padding: 12,
        borderRadius: 8,
        marginBottom: 20,
    },
    headerText: {
        color: "white",
        fontSize: 18,
        fontWeight: "600",
    },
    createTrigger: {
        backgroundColor: "#007bff",
        padding: 10,
        borderRadius: 8,
    },
});

export default Feed;