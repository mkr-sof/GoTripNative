import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Linking } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../store/modules/authSlice";
import { useNavigation } from "@react-navigation/native";
import Button from "../../common/Button/Button";

function UserPanel() {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const handleLogout = () => {
        dispatch(logout());
        navigation.navigate("Login");
    };

    if (!user) {
        return (
            <View style={styles.userPanelContainer}>
                <Text style={styles.guestPanel}>Welcome, Guest!</Text>
                <View style={styles.authOptions}>
                    <Button
                        text="Login"
                        onPress={() => navigation.navigate("Login")}
                        style={styles.authLink}
                    />
                    <Button
                        text="Signup"
                        onPress={() => navigation.navigate("Signup")}
                        style={styles.authLink}
                    />
                </View>
            </View>
        );
    }

    return (
        <View style={styles.userPanelContainer}>
            <Text
                style={styles.usernameLink}
                onPress={() => navigation.navigate(user ? "Profile" : `Profile/${user.id}`)}
            >
                Welcome, {user.name}!
            </Text>
            <Text
                style={styles.emailLink}
                onPress={() => Linking.openURL(`mailto:${user?.email}`)}
            >
                Email: {user?.email}
            </Text>
            <View style={styles.authOptions}>
                <Button
                    text="Edit Profile"
                    onPress={() => navigation.navigate("EditProfile")}
                    style={styles.authLink}
                />
                <Button
                    text="Logout"
                    onPress={handleLogout}
                    style={styles.authLink}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    userPanelContainer: {
        maxWidth: 250,
        margin: 0,
        padding: 20,
        backgroundColor: "#2f3031",
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        textAlign: "center",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 10,
    },
    guestPanel: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff",
    },
    authOptions: {
        flexDirection: "row",
        gap: 10,
        width: "100%",
        justifyContent: "center",
    },
    usernameLink: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#fff",
        textDecorationLine: "underline",
    },
    emailLink: {
        fontSize: 16,
        color: "#fff",
        textDecorationLine: "underline",
    },
    authLink: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        backgroundColor: "#444",
        color: "#fff",
        borderRadius: 5,
        fontSize: 14,
        textAlign: "center",
    },
});

export default UserPanel;