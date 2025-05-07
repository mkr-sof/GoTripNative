

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Posts from "./Posts/Posts";
import CreatePost from "./CreatePost/CreatePost";
import { setPosts } from "../../../store/modules/postsSlice";
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


// function Feed() {

//     const posts = useSelector((state) => state.posts.posts);

//     const renderItem = ({ item }) => (
//         <View style={styles.card}>
//             <Image source={imageMap[item.image]} style={styles.image} />
//             <Text style={styles.title}>{item.title}</Text>
//             <Text style={styles.author}>by {item.authorName}</Text>
//             <Text style={styles.description}>{item.description}</Text>
//             <Text style={styles.category}>{item.category}</Text>
//         </View>
//     );

//     return (
//         <FlatList
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
//     );
// };

// const styles = StyleSheet.create({
//     card: {
//         margin: 10,
//         padding: 10,
//         borderRadius: 8,
//         backgroundColor: "#fff",
//         elevation: 2
//     },
//     image: {
//         width: "100%",
//         height: 200,
//         borderRadius: 8,
//         marginBottom: 10
//     },
//     title: {
//         fontSize: 18,
//         fontWeight: "bold"
//     },
//     author: {
//         marginTop: 5,
//         fontStyle: "italic",
//         color: "#555"
//     },
//     description: {
//         marginVertical: 5
//     },
//     category: {
//         fontSize: 14,
//         color: "#888",
//         fontStyle: "italic"
//     },
//     empty: {
//         textAlign: "center",
//         fontSize: 16,
//         marginTop: 50
//     },
//     emptyContainer: {
//         flex: 1,
//         justifyContent: "center"
//     }
// });

// export default Feed;

function Feed() {
    const user = useSelector((state) => state.auth.user);
    const [isCreateOpen, setIsCreateOpen] = useState(false);

    return (
        <View style={styles.container}>
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