import React, { useState } from "react";
import { View, TextInput, Image, Text, StyleSheet, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "react-native-image-picker";
import { setProfile } from "../../../store/modules/authSlice";
import Button from "../../common/Button/Button";
import FileUpload from "../../common/FileUpload/FileUpload";

export default function EditProfile() {
    const profile = useSelector(state => state.auth.user);
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const [name, setName] = useState(profile.name);
    const [email, setEmail] = useState(profile.email);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [avatar, setAvatar] = useState(profile.avatar);
    const [error, setError] = useState("");



    const saveProfile = () => {
        if (password && password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        const updatedUser = {
            ...profile,
            name,
            email,
            password: password || profile.password,
            avatar,
        };

        dispatch(setProfile(updatedUser));
        Alert.alert("Success", "Profile updated");
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <TextInput
                placeholder="Full Name"
                value={name}
                onChangeText={setName}
                style={styles.input}
            />
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
            />
            <TextInput
                placeholder="New Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
            />
            <TextInput
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                style={styles.input}
            />
            <FileUpload
                image={avatar}
                onChange={setAvatar}
                onRemoveImage={() => setAvatar(null)}
            />
            <View style={styles.buttons}>
                <Button text="Save" onPress={saveProfile} disabled={!name || !email} />
                <Button text="Cancel" onPress={() => navigation.goBack()} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#1e1f21" },
    title: { fontSize: 24, color: "white", marginBottom: 20 },
    input: {
        backgroundColor: "#2f3031",
        color: "white",
        borderRadius: 8,
        padding: 10,
        marginBottom: 15,
    },
    avatar: {
        width: 100,
        height: 100,
        // borderRadius: 50,
        alignSelf: "center",
        marginBottom: 10,
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },
    error: { color: "red", marginBottom: 10 },
});
