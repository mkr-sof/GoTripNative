import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../../../../../store/modules/postsSlice";

function PostCard({ post, navigation }) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const favorites = useSelector((state) => state.posts.favorites);
    const isFavorited = favorites.includes(post.id);

    const handleToggleFavorite = () => {
        dispatch(toggleFavorite(post.id));
    };

    const handleAuthorClick = () => {
        navigation.navigate("Profile", { authorId: post.authorId });
    };

    const handleCardClick = () => {
        navigation.navigate("PostDetails", { postId: post.id });
    };

    return (
        <TouchableOpacity style={styles.postCard} onPress={handleCardClick}>
            <Text style={styles.title}>{post.title}</Text>
            <Text style={styles.description}>{post.description}</Text>
            {post.image && <Image source={{ uri: post.image }} style={styles.postImage} />}
            <View style={styles.postDetails}>
                <Text style={styles.date}>
                    {post.updated_at && post.updated_at !== post.created_at
                        ? `Updated at ${new Date(post.updated_at).toLocaleDateString()}`
                        : `Created at ${new Date(post.created_at).toLocaleDateString()}`}
                </Text>
                <TouchableOpacity onPress={handleAuthorClick}>
                    <Text style={styles.authorName}>{post.authorName || "Guest"}</Text>
                </TouchableOpacity>
                {user && (
                    <TouchableOpacity onPress={handleToggleFavorite}>
                        <Text style={[styles.favoriteButton, isFavorited && styles.favorited]}>
                            {isFavorited ? "❤️ Unfavorite" : "🤍 Favorite"}
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    postCard: {
        backgroundColor: "white",
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        padding: 16,
        marginBottom: 16,
        alignItems: "center",
        textAlign: "center",
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 8,
    },
    description: {
        fontSize: 14,
        color: "#666",
        lineHeight: 20,
        textAlign: "center",
    },
    postImage: {
        width: "100%",
        height: 200,
        borderRadius: 6,
        marginTop: 10,
        resizeMode: "cover",
    },
    postDetails: {
        flexDirection: "column",
        alignItems: "center",
        marginTop: 10,
    },
    date: {
        fontSize: 12,
        color: "#999",
        marginBottom: 8,
    },
    authorName: {
        fontSize: 14,
        color: "#007bff",
        textDecorationLine: "underline",
    },
    favoriteButton: {
        fontSize: 16,
        color: "#555",
        marginTop: 10,
    },
    favorited: {
        color: "red",
    },
});

export default PostCard;