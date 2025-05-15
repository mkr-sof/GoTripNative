// components/features/Auth/ForgotPassword.js

import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { resetPassword } from "../../../services/authService";
import Error from "../../common/Error/Error";
import InputField from "../../common/InputField/InputField";
import Button from "../../common/Button/Button";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigation = useNavigation();

  const handleSubmit = async (event) => {
    event.preventDefault();
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
    <View style={styles.authContainer}>
      <Text style={styles.title}>Password Recovery</Text>
      {error && <Error>{error}</Error>}
      {message && <Text style={styles.successMessage}>{message}</Text>}
      <View style={styles.formContainer}>
        <InputField
          label="Your Email"
          className={styles.authInput}
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={setEmail}
        />
        <Button onPress={handleSubmit} text="Submit" />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.link}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  authContainer: {
    maxWidth: 500,
    marginTop: 50,
    marginLeft: 20,
    marginRight: 20,
    padding: 20,
    backgroundColor: "#2f3031",
    borderRadius: 8,
    shadowColor: "black",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 24,
    marginBottom: 20,
  },
  successMessage: {
    color: "#107EFF",
    marginBottom: 10,
  },
  formContainer: {
    width: "100%",
    marginBottom: 20,
  },
  link: {
    color: "#007bff",
    marginTop: 10,
    fontSize: 16,
  },
});

export default ForgotPassword;
