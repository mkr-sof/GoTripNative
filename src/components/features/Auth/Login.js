// components/features/Auth/Login.js

import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, CheckBox } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "../../../services/storageService";
import { profile } from "../../../services/authService";
import Error from "../../common/Error/Error";
import InputField from "../../common/InputField/InputField";
import Button from "../../common/Button/Button";

const Login = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      const response = await profile({ email, password, rememberMe }, dispatch);
      if (response.success) {
        navigation.navigate("Profile");
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <View style={styles.authContainer}>
      <Text style={styles.title}>Login</Text>
      {error && <Error>{error}</Error>}
      <View style={styles.formContainer}>
        <InputField
          label="Email"
          className={styles.authInput}
          type="email"
          placeholder=" "
          value={email}
          onChange={setEmail}
        />
        <InputField
          label="Password"
          className={styles.authInput}
          type="password"
          placeholder=" "
          value={password}
          onChange={setPassword}
        />
        {/* <View style={styles.rememberMeContainer}>
          <CheckBox value={rememberMe} onValueChange={setRememberMe} />
          <Text style={styles.rememberMeText}>Remember Me</Text>
        </View> */}
        <Button onPress={handleSubmit} text="Login" />
      </View>
      <View style={styles.linksContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.link}>Signup</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
          <Text style={styles.link}>Recover</Text>
        </TouchableOpacity>
      </View>
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
  formContainer: {
    width: "100%",
    marginBottom: 20,
  },
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  rememberMeText: {
    color: "#fff",
    marginLeft: 10,
  },
  linksContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  link: {
    color: "#007bff",
    fontSize: 16,
    marginTop: 10,
  },
});

export default Login;
