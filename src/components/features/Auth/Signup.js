import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../../../services/authService";
import { setProfile, setUsers } from "../../../store/modules/authSlice";
import Error from "../../common/Error/Error";
import InputField from "../../common/InputField/InputField";
import Button from "../../common/Button/Button";
import Ionicons from "@react-native-vector-icons/ionicons";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.auth.users);

  const validateField = (field, value) => {
    switch (field) {
      case "name":
        return value.trim() ? "" : "Name is required";
      case "email":
        if (!value) return "Email is required";
        if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value))
          return "Invalid email address";
        return "";
      case "password":
        if (!value) return "Password is required";
        if (value.length < 6) return "Must be at least 6 characters";
        return "";
      case "confirmPassword":
        if (!value) return "Please confirm your password";
        if (value !== password) return "Passwords do not match";
        return "";
      default:
        return "";
    }
  };

  const handleBlur = (name, value) => {
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors((errs) => ({ ...errs, [name]: validateField(name, value) }));
  };

  const handleChange = (name, value) => {
    if (name === "name") setName(value);
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
    if (name === "confirmPassword") setConfirmPassword(value);

    if (touched[name]) {
      setErrors((errs) => ({ ...errs, [name]: validateField(name, value) }));
    }
  };

  const handleSubmit = async () => {
    const newErrors = {
      name: validateField("name", name),
      email: validateField("email", email),
      password: validateField("password", password),
      confirmPassword: validateField("confirmPassword", confirmPassword),
    };
    setErrors(newErrors);
    setTouched({
      name: true,
      email: true,
      password: true,
      confirmPassword: true,
    });

    if (Object.values(newErrors).some(Boolean)) return;

    try {
      const { success, user, message } = await signupUser({ name, email, password });
      if (!success) return setSubmitError(message);
      dispatch(setUsers([...(users || []), user]));
      dispatch(setProfile(user));
      navigation.navigate("Profile");
    } catch (error) {
      console.error("Error during signup", error);
      setSubmitError(error.message);
    }
  };

  return (
    <View style={styles.authContainer}>
      <Text style={styles.title}>SignUp</Text>
      {submitError ? <Error>{submitError}</Error> : null}

      <InputField
        name="name"
        label="Full Name"
        type="text"
        placeholder=" "
        value={name}
        onChange={(val) => handleChange("name", val)}
        onBlur={() => handleBlur("name", name)}
      />
      {touched.name && errors.name ? <Text style={styles.fieldError}>{errors.name}</Text> : null}

      <InputField
        name="email"
        label="Email"
        type="email"
        placeholder=" "
        value={email}
        onChange={(val) => handleChange("email", val)}
        onBlur={() => handleBlur("email", email)}
      />
      {touched.email && errors.email ? <Text style={styles.fieldError}>{errors.email}</Text> : null}

      <View style={styles.passwordWrapper}>
        <InputField
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          placeholder=" "
          value={password}
          onChange={(val) => handleChange("password", val)}
          onBlur={() => handleBlur("password", password)}
        />
        <TouchableOpacity onPress={() => setShowPassword((prev) => !prev)} style={styles.toggle}>
          {showPassword ? <Ionicons size={20} name="eye-outline" /> : <Ionicons size={20} name="eye-off-outline" />}
        </TouchableOpacity>
      </View>
      {touched.password && errors.password ? <Text style={styles.fieldError}>{errors.password}</Text> : null}

      <View style={styles.passwordWrapper}>
        <InputField
          name="confirmPassword"
          label="Confirm Password"
          type={showConfirm ? "text" : "password"}
          placeholder=" "
          value={confirmPassword}
          onChange={(val) => handleChange("confirmPassword", val)}
          onBlur={() => handleBlur("confirmPassword", confirmPassword)}
        />
        <TouchableOpacity onPress={() => setShowConfirm((prev) => !prev)} style={styles.toggle}>
          {showConfirm ? <Ionicons size={20} name="eye-outline" /> : <Ionicons size={20} name="eye-off-outline" />}
        </TouchableOpacity>
      </View>
      {touched.confirmPassword && errors.confirmPassword ? (
        <Text style={styles.fieldError}>{errors.confirmPassword}</Text>
      ) : null}

      <Button
        text="SignUp"
        onPress={handleSubmit}
        disabled={
          !name || !email || !password || !confirmPassword || Object.values(errors).some(Boolean)
        }
      />

      <Text style={styles.infoText}>Already have an account?</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.link}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  authContainer: {
    padding: 20,
    backgroundColor: "#2f3031",
    borderRadius: 8,
    margin: 20,
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
  fieldError: {
    color: "red",
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  passwordWrapper: {
    position: "relative",
    width: "100%",
  },
  toggle: {
    position: "absolute",
    right: 10,
    top: 12,
  },
  link: {
    color: "#007bff",
    fontSize: 16,
    marginTop: 10,
  },
  infoText: {
    color: "#ccc",
    marginTop: 20,
  },
});

export default Signup;
