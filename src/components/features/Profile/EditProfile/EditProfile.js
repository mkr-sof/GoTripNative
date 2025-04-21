import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setProfile } from "../../../../store/modules/authSlice";
import { saveDataToLocalStorage } from "../../../../services/storageService";
import InputField from "../../../common/InputField/InputField";
import Button from "../../../common/Button/Button";

function EditProfile() {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const profile = useSelector((state) => state.auth.user);

    const [name, setName] = useState(profile?.name || "");
    const [email, setEmail] = useState(profile?.email || "");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleSaveUser = () => {
        if (newPassword && newPassword !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        const updatedUser = {
            ...profile,
            name,
            email,
            password: newPassword || profile?.password,
        };

        dispatch(setProfile(updatedUser));
        saveDataToLocalStorage("profile", updatedUser);

        Alert.alert("Success", "Profile updated successfully!", [
            { text: "OK", onPress: () => navigation.navigate("Profile") },
        ]);
    };

    return (
        <ScrollView contentContainerStyle={styles.editProfileContainer}>
            <Text style={styles.title}>Edit Profile</Text>
            {error && <Text style={styles.error}>{error}</Text>}
            <View style={styles.formContainer}>
                <InputField
                    label="Full Name"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={setName}
                />
                <InputField
                    label="Email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={setEmail}
                />
                <InputField
                    label="New Password"
                    placeholder="Enter a new password"
                    value={newPassword}
                    onChange={setNewPassword}
                    secureTextEntry
                />
                <InputField
                    label="Confirm New Password"
                    placeholder="Confirm your new password"
                    value={confirmPassword}
                    onChange={setConfirmPassword}
                    secureTextEntry
                />
                <View style={styles.authOptions}>
                    <Button
                        text="Save"
                        onPress={handleSaveUser}
                        disabled={!name || !email}
                    />
                    <Button
                        text="Cancel"
                        onPress={() => navigation.navigate("Profile")}
                    />
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    editProfileContainer: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: "#2f3031",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 20,
        textAlign: "center",
    },
    error: {
        fontSize: 16,
        color: "red",
        marginBottom: 10,
        textAlign: "center",
    },
    formContainer: {
        flexDirection: "column",
        gap: 15,
        alignItems: "center",
        width: "100%",
    },
    authOptions: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
        width: "100%",
    },
});

export default EditProfile;