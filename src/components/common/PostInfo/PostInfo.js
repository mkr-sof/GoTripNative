import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../../../store/modules/postsSlice";
import Ionicons from "@react-native-vector-icons/ionicons";
import Description from "../../common/Description/Description";
import { filterPosts } from "../../../store/modules/postsSlice";
import { imageMap } from "../../../utils/util";

const PostInfo = ({ post, showFullDescription = false }) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const user = useSelector((state) => state.auth.user);
    const favorites = useSelector((state) => state.posts.favorites);
    const isFavorited = favorites.includes(post.id);
  const handleAuthorClick = () => {
    dispatch(filterPosts({ filter: "author", userId: post.authorId, sortOrder: "newest" }));
        navigation.navigate("Tabs", {
            screen: "ProfileNavigation",
            params: {
                screen: "Profile",
                params: { userId: post.authorId },
            },
        });
     
    };
    const handleFavoriteToggle = () => {
        if (!user) return;
        dispatch(toggleFavorite(post.id));
    };
   const getSource = (image) => {
  if (imageMap[image]) {
    return imageMap[image];
  }
  return { uri: image };
};

    return (
        <View style={styles.postInfo}>
            <Text style={styles.title}>{post.title}</Text>

            {showFullDescription && (
                <Description style={styles.description}>{post.description}</Description>
            )}

            {post.image && (
                <Image source={getSource(post.image)} style={styles.image} />
            )}

            <View style={styles.details}>
                <Text style={styles.description}>
                    {post.updated_at && post.updated_at !== post.created_at
                        ? `Updated at ${new Date(post.updated_at).toLocaleDateString()}`
                        : `Created at ${new Date(post.created_at).toLocaleDateString()}`}
                </Text>

                <TouchableOpacity onPress={handleAuthorClick}>
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
