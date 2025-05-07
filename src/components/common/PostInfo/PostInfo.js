import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../../../store/modules/postsSlice";
import Ionicons from "react-native-vector-icons/Ionicons";
import Description from "../../common/Description/Description";
import { imageMap } from "../../../utils/util";

const PostInfo = ({ post, onAuthorClick, showFullDescription = false }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const favorites = useSelector((state) => state.posts.favorites);
    const isFavorited = favorites.includes(post.id);

    const handleFavoriteToggle = () => {
        if (!user) return;
        dispatch(toggleFavorite(post.id));
    };
    const imageUri = imageMap[post.image];
// console.log("PostInfo", post);
console.log("Image URI from Redux:", post.image);

    return (
        <View style={styles.postInfo}>
            <Text style={styles.title}>{post.title}</Text>

            {showFullDescription && (
                <Description style={styles.description}>{post.description}</Description>
            )}

            {post.image && (
                <Image source={imageUri} style={styles.image} />
            )}

            <View style={styles.details}>
                <Text style={styles.description}>
                    {post.updated_at && post.updated_at !== post.created_at
                        ? `Updated at ${new Date(post.updated_at).toLocaleDateString()}`
                        : `Created at ${new Date(post.created_at).toLocaleDateString()}`}
                </Text>

                <TouchableOpacity onPress={onAuthorClick}>
                    <Text style={styles.author}>
                        {post.authorName || "Guest"}
                    </Text>
                </TouchableOpacity>

                {user && (
                    <TouchableOpacity
                        style={styles.favoriteButton}
                        onPress={handleFavoriteToggle}
                    >
                        <Ionicons
                            name={isFavorited ? "heart" : "heart-outline"}
                            size={20}
                            color={isFavorited ? "red" : "#555"}
                        />
                        <Text style={[styles.favoriteText, isFavorited && styles.favorited]}>
                            {isFavorited ? "Unfavorite" : "Favorite"}
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    postInfo: {
        alignItems: 'center',
        width: '100%',
        padding: 16,
    },
    title: {
        fontSize: 24,
        color: '#fff',
        marginBottom: 8,
        textAlign: 'center',
    },
    description: {
        color: '#ddd',
        marginVertical: 10,
        textAlign: 'center',
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 6,
        resizeMode: 'cover',
        marginTop: 20,
    },
    details: {
        alignItems: 'center',
        marginTop: 15,
    },
    author: {
        fontSize: 16,
        color: '#aaa',
        marginVertical: 8,
    },
    favoriteButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    favoriteText: {
        marginLeft: 6,
        fontSize: 16,
        color: '#555',
    },
    favorited: {
        color: 'red',
    },
});

export default PostInfo;
