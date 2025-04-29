import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { signupUser } from "../../../services/authService";
import Error from "../../common/Error/Error";
import InputField from "../../common/InputField/InputField";
import Button from "../../common/Button/Button";

function Signup({ navigation }) {
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async () => {
        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        try {
            const userData = { name, email, password };
            const response = await signupUser(userData, dispatch);
            if (response.success) {
                navigation.navigate("Profile");
            } else {
                setError(response.message);
            }
        } catch (error) {
            setError(error.message);
        }

    };

    return (
        <ScrollView contentContainerStyle={styles.authContainer}>
            <Text style={styles.title}>SignUp</Text>
            {error && <Error message={error} />}
            <InputField
                label="Full Name"
                placeholder="Enter your name"
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
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChange={setPassword}
                secureTextEntry
            />
            <InputField
                label="Confirm Password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={setConfirmPassword}
                secureTextEntry
            />
            <Button
                text="SignUp"
                onPress={handleSubmit}
                disabled={!name || !email || !password || !confirmPassword}
            />
            <View style={styles.footer}>
                <Text>Already have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                    <Text style={styles.link}>Login</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    authContainer: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: "#2f3031",
        borderRadius: 8,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 20,
        textAlign: "center",
    },
    footer: {
        marginTop: 20,
        alignItems: "center",
    },
    link: {
        color: "#007bff",
        marginTop: 5,
    },
});

export default Signup;