// import React, { useState } from "react";
// import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import { useDispatch, useSelector } from "react-redux";
// import { setProfile } from "../../../../store/modules/authSlice";
// import { saveDataToLocalStorage } from "../../../../services/storageService";
// import InputField from "../../../common/InputField/InputField";
// import Button from "../../../common/Button/Button";

// function EditProfile() {
//     const navigation = useNavigation();
//     const dispatch = useDispatch();

//     const profile = useSelector((state) => state.auth.user);

//     const [name, setName] = useState(profile?.name || "");
//     const [email, setEmail] = useState(profile?.email || "");
//     const [newPassword, setNewPassword] = useState("");
//     const [confirmPassword, setConfirmPassword] = useState("");
//     const [error, setError] = useState("");

//     const handleSaveUser = () => {
//         if (newPassword && newPassword !== confirmPassword) {
//             setError("Passwords do not match!");
//             return;
//         }

//         const updatedUser = {
//             ...profile,
//             name,
//             email,
//             password: newPassword || profile?.password,
//         };

//         dispatch(setProfile(updatedUser));
//         saveDataToLocalStorage("profile", updatedUser);

//         Alert.alert("Success", "Profile updated successfully!", [
//             { text: "OK", onPress: () => navigation.navigate("Profile") },
//         ]);
//     };

//     return (
//         <ScrollView contentContainerStyle={styles.editProfileContainer}>
//             <Text style={styles.title}>Edit Profile</Text>
//             {error && <Text style={styles.error}>{error}</Text>}
//             <View style={styles.formContainer}>
//                 <InputField
//                     label="Full Name"
//                     placeholder="Enter your full name"
//                     value={name}
//                     onChange={setName}
//                 />
//                 <InputField
//                     label="Email"
//                     placeholder="Enter your email"
//                     value={email}
//                     onChange={setEmail}
//                 />
//                 <InputField
//                     label="New Password"
//                     placeholder="Enter a new password"
//                     value={newPassword}
//                     onChange={setNewPassword}
//                     secureTextEntry
//                 />
//                 <InputField
//                     label="Confirm New Password"
//                     placeholder="Confirm your new password"
//                     value={confirmPassword}
//                     onChange={setConfirmPassword}
//                     secureTextEntry
//                 />
//                 <View style={styles.authOptions}>
//                     <Button
//                         text="Save"
//                         onPress={handleSaveUser}
//                         disabled={!name || !email}
//                     />
//                     <Button
//                         text="Cancel"
//                         onPress={() => navigation.navigate("Profile")}
//                     />
//                 </View>
//             </View>
//         </ScrollView>
//     );
// }

// const styles = StyleSheet.create({
//     editProfileContainer: {
//         flexGrow: 1,
//         padding: 20,
//         backgroundColor: "#2f3031",
//     },
//     title: {
//         fontSize: 24,
//         fontWeight: "bold",
//         color: "#fff",
//         marginBottom: 20,
//         textAlign: "center",
//     },
//     error: {
//         fontSize: 16,
//         color: "red",
//         marginBottom: 10,
//         textAlign: "center",
//     },
//     formContainer: {
//         flexDirection: "column",
//         gap: 15,
//         alignItems: "center",
//         width: "100%",
//     },
//     authOptions: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//         marginTop: 20,
//         width: "100%",
//     },
// });

// export default EditProfile;

import React, { useState } from "react";
import { View, TextInput, Button, Image, Text, StyleSheet, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "react-native-image-picker";
import { setProfile } from "../../../../store/modules/authSlice";

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

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            base64: true,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.cancelled) {
            setAvatar(`data:image/jpeg;base64,${result.base64}`);
        }
    };

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
            <Text style={styles.title}>Edit Profile</Text>
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

            {avatar ? (
                <Image source={{ uri: avatar }} style={styles.avatar} />
            ) : null}
            <Button title="Choose Avatar" onPress={pickImage} />
            <View style={styles.buttons}>
                <Button title="Save" onPress={saveProfile} disabled={!name || !email} />
                <Button title="Cancel" onPress={() => navigation.goBack()} />
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
        borderRadius: 50,
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
