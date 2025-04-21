import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { getCurrentUser } from "../../../services/userService";
import { loginUser } from "../../../services/authService";
import Error from "../../common/Error/Error";
import InputField from "../../common/InputField/InputField";
import Button from "../../common/Button/Button";

function Login({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            const rememberedUser = await getCurrentUser();
            if (rememberedUser) {
                setEmail(rememberedUser.email);
                setRememberMe(true);
            }
        };

        fetchUser();
    }, []);

    const handleSubmit = async () => {
        setError("");
        try {
            const response = await loginUser({ email, password, rememberMe });
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
            <Text style={styles.title}>Login</Text>
            {error && <Error message={error} />}
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
            <Button text="Login" onPress={handleSubmit} />
            <View style={styles.footer}>
                <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                    <Text style={styles.link}>Signup</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
                    <Text style={styles.link}>Recover</Text>
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
        flexDirection: "row",
        justifyContent: "space-between",
    },
    link: {
        color: "#007bff",
        marginTop: 5,
    },
});

export default Login;