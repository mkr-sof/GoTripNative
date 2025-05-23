import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import PostInfo from "../../../../common/PostInfo/PostInfo";

const PostCard = ({ post }) => {
    const navigation = useNavigation();

      const handleCardClick = () => {
        navigation.navigate("PostDetails", { postId: post.id });
    };

    return (
        <TouchableOpacity onPress={handleCardClick} style={styles.postCard}>
            <PostInfo
                post={post}
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    postCard: {
        width: '100%',
        backgroundColor: '#2f3031',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.6,
        shadowRadius: 8,
        elevation: 5,
    },
});

export default PostCard;
