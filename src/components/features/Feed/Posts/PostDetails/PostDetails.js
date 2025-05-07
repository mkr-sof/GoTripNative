import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { filterPosts, deletePost } from "../../../../../store/modules/postsSlice";
import NotFound from "../../../../features/NotFound/NotFound";
import Button from "../../../../common/Button/Button";
import CreatePost from "../../../../features/Feed/CreatePost/CreatePost";
import Popup from "../../../../common/Popup/Popup";
import PostInfo from "../../../../common/PostInfo/PostInfo";

const PostDetails = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { postId } = route.params;

    const [isEditing, setIsEditing] = useState(false);

    const user = useSelector((state) => state.auth.user);
    const post = useSelector((state) =>
        state.posts.posts.find((p) => p.id.toString() === postId.toString())
    );

    if (!post) return <NotFound />;

    const handleAuthorClick = () => {
        dispatch(filterPosts({ filter: "author", userId: post.authorId, sortOrder: "newest" }));
        navigation.navigate("Profile", { userId: post.authorId });
    };

    const handleEdit = () => setIsEditing(true);
    const handleClosePopup = () => setIsEditing(false);
    const handleDelete = () => {
        dispatch(deletePost(post.id));
        navigation.goBack();
    };

    return (
        <View style={styles.postContainer}>
            <Button
                style={styles.backButton}
                onPress={() => navigation.goBack()}
                text="Back"
            />

            <PostInfo
                post={post}
                onAuthorClick={handleAuthorClick}
                showFullDescription={true}
            />

            {user?.id === post.authorId && (
                <View style={styles.postActions}>
                    <Button style={styles.editButton} onPress={handleEdit} text="Edit" />
                    <Button style={styles.deleteButton} onPress={handleDelete} text="Delete" />
                </View>
            )}

            {isEditing && (
                <Popup onClose={handleClosePopup}>
                    <CreatePost
                        onPostCreated={handleClosePopup}
                        onClick={handleClosePopup}
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
        </View>
    );
};

const styles = StyleSheet.create({
    postContainer: {
        padding: 20,
        backgroundColor: '#2f3031',
        borderRadius: 8,
        margin: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    postActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
    },
    editButton: {
        backgroundColor: '#3137c9',
    },
    backButton: {
        backgroundColor: '#3137c9',
    },
    deleteButton: {
        backgroundColor: '#dc3545',
    },
});

export default PostDetails;
