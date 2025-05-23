import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useDispatch } from "react-redux";
import uuid from "react-native-uuid";
import InputField from "../../../common/InputField/InputField";
import Button from "../../../common/Button/Button";
import SelectField from "../../../common/SelectField/SelectField";
import FileUpload from "../../../common/FileUpload/FileUpload";
import { getCurrentUser } from "../../../../services/userService";
import { createPost, updatePost } from "../../../../store/modules/postsSlice";

function CreatePost({
    onPostCreated,
    initialTitle,
    initialDescription,
    initialCategory,
    initialImage,
    initialPostId,
    initialCreatedAt,
    isEditing = false,
}) {
    const [title, setTitle] = useState(initialTitle || "");
    const [description, setDescription] = useState(initialDescription || "");
    const [image, setImage] = useState(initialImage || "");
    const [category, setCategory] = useState(initialCategory || "");

    const dispatch = useDispatch();

    const handleCreatePost = async () => {
        if (!title && !description && !category) return;

        const user = getCurrentUser();

        const updatedPost = {
            id: isEditing ? initialPostId : uuid.v4(),
            authorName: user?.name || "Guest",
            title,
            description,
            category,
            image: image || null,
            created_at: isEditing ? initialCreatedAt : new Date().toISOString(),
            updated_at: new Date().toISOString(),
            isFavorite: false,
        };

        let result;
        if (isEditing) {
            result = await dispatch(updatePost(updatedPost));
        } else {
            result = await dispatch(createPost(updatedPost));
        }
        onPostCreated(result.payload);

        setTitle("");
        setDescription("");
        setImage("");
        setCategory("");
    };

    const handleRemoveImage = () => {
        setImage("");
    };

    return (
        <View style={styles.createPostContainer}>
            <Text style={styles.title}>{isEditing ? "Edit Post" : "Create a New Post"}</Text>
            <View style={styles.formContainer}>
                <InputField
                    label="Title"
                    placeholder="Enter title"
                    value={title}
                    onChange={setTitle}
                />
                <InputField
                    label="Description"
                    placeholder="Enter description"
                    value={description}
                    onChange={setDescription}
                />
                <SelectField
                    label="Category"
                    value={category}
                    onChange={setCategory}
                    options={["Adventure", "Nature", "City Trips", "Beach"]}
                />
                <FileUpload
                    onRemoveImage={handleRemoveImage}
                    onChange={setImage}
                    image={image}
                />
                <Button
                    text={isEditing ? "Save" : "Create"}
                    onPress={handleCreatePost}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    createPostContainer: {
        padding: 20,
        flex: 1,
        backgroundColor: "#2f3031",
        paddingVertical: 15,
        textAlign: "center",
    },
    title: {
        marginBottom: 10,
        color: "white",
        fontSize: 24,
        fontWeight: "600",
        textAlign: "center",
    },
    formContainer: {
        flexDirection: "column",
        gap: 10,
        alignItems: "center",
        width: "100%",
    },
});

export default CreatePost;