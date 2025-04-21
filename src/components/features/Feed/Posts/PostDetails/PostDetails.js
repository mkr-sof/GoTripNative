import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../../../../../store/modules/postsSlice";
import CreatePost from "../../CreatePost/CreatePost";
import Popup from "../../../../common/Popup/Popup";

function PostDetails() {
    const route = useRoute();
    const navigation = useNavigation();
    const { postId } = route.params;
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);

    const [isEditing, setIsEditing] = useState(false);

    const post = useSelector((state) =>
        state.posts.posts.find((p) => p.id.toString() === postId)
    );

    const favorites = useSelector((state) => state.posts.favorites);
    const isFavorited = favorites.includes(post?.id);

    if (!post) {
            return <NotFound />;
    }

    const handleFavorite = () => {
        if (!user) return;
        dispatch(toggleFavorite(post.id));
    };

    const handleAuthorClick = () => {
        navigation.navigate("Profile", { authorId: post.authorId });
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleClosePopup = () => {
        setIsEditing(false);
    };

    return (
        <ScrollView contentContainerStyle={styles.postContainer}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Text style={styles.backButtonText}>⬅ Go Back</Text>
            </TouchableOpacity>

            <Text style={styles.postTitle}>{post.title}</Text>
            <Text style={styles.postDescription}>{post.description}</Text>
            <TouchableOpacity onPress={handleAuthorClick}>
                <Text style={styles.postAuthor}>{post.authorName}</Text>
            </TouchableOpacity>
            {post.image && (
                <Image source={{ uri: post.image }} style={styles.postImage} />
            )}
            <View style={styles.postActions}>
                {user && (
                    <TouchableOpacity onPress={handleFavorite}>
                        <Text style={[styles.favoriteButton, isFavorited && styles.favorited]}>
                            {isFavorited ? "❤️ Unfavorite" : "🤍 Favorite"}
                        </Text>
                    </TouchableOpacity>
                )}
                {user && user.id === post.authorId && (
                    <TouchableOpacity onPress={handleEdit}>
                        <Text style={styles.editButton}>Edit</Text>
                    </TouchableOpacity>
                )}
            </View>

            {isEditing && (
                <Popup visible={isEditing} onClose={handleClosePopup}>
                    <CreatePost
                        onPostCreated={handleClosePopup}
                        initialTitle={post.title}
                        initialDescription={post.description}
                        initialCategory={post.category}
                        initialImage={post.image}
                        initialPostId={post.id}
                        initialCreatedAt={post.created_at}
                        isEditing={true}
                    />
                </Popup>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    postContainer: {
        flexGrow: 1,
        backgroundColor: "#2f3031",
        borderRadius: 8,
        padding: 20,
    },
    backButton: {
        marginBottom: 10,
    },
    backButtonText: {
        fontSize: 16,
        color: "#007bff",
    },
    postTitle: {
        fontSize: 24,
        fontWeight: "600",
        color: "#fff",
        marginBottom: 10,
    },
    postDescription: {
        fontSize: 16,
        color: "#fff",
        marginBottom: 10,
    },
    postAuthor: {
        fontSize: 16,
        color: "#007bff",
        textDecorationLine: "underline",
        marginBottom: 20,
    },
    postImage: {
        width: "100%",
        height: 300,
        borderRadius: 8,
        marginBottom: 20,
        resizeMode: "cover",
    },
    postActions: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },
    favoriteButton: {
        fontSize: 14,
        color: "#555",
    },
    favorited: {
        color: "red",
    },
    editButton: {
        fontSize: 14,
        color: "#007bff",
    },
    notFoundContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#2f3031",
    },
    notFoundText: {
        fontSize: 18,
        color: "#fff",
    },
});

export default PostDetails;