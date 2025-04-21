import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { resetPassword } from "../../../services/authService";
import Error from "../../common/Error/Error";
import InputField from "../../common/InputField/InputField";
import Button from "../../common/Button/Button";

const ForgotPassword = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async () => {
        setError("");
        setMessage("");

        try {
            const response = await resetPassword(email);
            setMessage(response);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.authContainer}>
            <Text style={styles.title}>Password Recovery</Text>
            {error && <Error message={error} />}
            {message && <Text style={styles.message}>{message}</Text>}
            <InputField
                label="Your Email"
                placeholder="Enter your email"
                value={email}
                onChange={setEmail}
            />
            <Button text="Submit" onPress={handleSubmit} />
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.link}>Back</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

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
    message: {
        color: "#107EFF",
        marginBottom: 20,
    },
    link: {
        color: "#007bff",
        marginTop: 20,
        textAlign: "center",
    },
});

export default ForgotPassword;