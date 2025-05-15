

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Posts from "./Posts/Posts";
import CreatePost from "./CreatePost/CreatePost";
import Filters from "../../common/Filters/Filters";
// import { useScrollPosition } from "../../../hooks/useScrollPosition";
import { fetchPosts } from "../../../store/modules/postsSlice";
import { setPosts, filterPosts } from "../../../store/modules/postsSlice";
import { setUsers, setProfile } from "../../../store/modules/authSlice";
import { getAllPosts } from "../../../services/postService";
import { getUsers } from "../../../services/userService";
import { imageMap } from "../../../utils/util";
// import { mockPosts } from "../../../utils/util";

import {
    View,
    Text,
    FlatList,
    Image,
    StyleSheet,
    TouchableOpacity,
    Modal
} from "react-native";

function Feed() {
    const user = useSelector((state) => state.auth.user);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const posts = useSelector((state) => state.posts.posts);
    const filteredPosts = useSelector((state) => state.posts.filteredPosts);
    const filter = useSelector((state) => state.posts.filter);
    const sortOrder = useSelector((state) => state.posts.sortOrder);
    const dispatch = useDispatch();

    // useScrollPosition((scrollY) => {
    //     setShowScrollUp(scrollY > 300);
    // });
    
    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);
    const handleFilterChange = (filter, sortOrder) => {
        dispatch(filterPosts({ filter, sortOrder, userId: user?.id }));
    };
    return (
        <View style={styles.container}>
            <Filters onFilterChange={handleFilterChange}/> 
            {user && (
                <TouchableOpacity
                    style={styles.createButton}
                    onPress={() => setIsCreateOpen(true)}
                >
                    <Ionicons name="add-circle-outline" size={24} color="white" />
                    <Text style={styles.createText}>Create Post</Text>
                </TouchableOpacity>
            )}

            {/* Posts always visible */}
            <Posts />

            {/* CreatePost modal */}
            <Modal
                visible={isCreateOpen}
                animationType="slide"
                transparent={false}
                onRequestClose={() => setIsCreateOpen(false)}
            >
                <CreatePost
                    onPostCreated={() => {
                        setIsCreateOpen(false);
                        // Optional: trigger post refresh here
                    }}
                    onCancel={() => setIsCreateOpen(false)}
                />
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#1e1f21",
    },
    createButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#db5f5f",
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
    },
    createText: {
        color: "#fff",
        marginLeft: 8,
        fontSize: 16,
    },
});

export default Feed;