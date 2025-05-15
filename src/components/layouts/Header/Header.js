import React, { useEffect, useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { storage, createTestPosts, createTestUsers, saveDataToStorage } from "../../../services/storageService";
import { setUsers, setProfile } from "../../../store/modules/authSlice";
import { setPosts } from "../../../store/modules/postsSlice";
import { getUsers } from "../../../services/userService";
import { getAllPosts } from "../../../services/postService";
import Logo from "../../common/Logo/Logo";
import Avatar from "../../common/Avatar/Avatar";
import Ionicons from "react-native-vector-icons/Ionicons";

function Header() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const profile = useSelector((state) => state.auth.user);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const initializeData = () => {
            const savedProfile = storage.getString("profile");
            if (savedProfile) {
                const parsed = JSON.parse(savedProfile);
                dispatch(setProfile(parsed));
            }

            let users = getUsers();
            if (!users || users.length === 0) {
                users = createTestUsers();
                saveDataToStorage("users", users);
            }
            dispatch(setUsers(users));

            let posts = getAllPosts();
            if (!posts || posts.length === 0) {
                posts = createTestPosts();
                saveDataToStorage("allPosts", posts);
            }
            dispatch(setPosts(posts));
        };

        initializeData();
    }, [dispatch]);

    const handleLogout = () => {
        storage.remove({ key: "profile" });
        dispatch(setProfile(null));
        navigation.navigate("Login");
    };

    return (
        <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.navigate("FeedNavigation", {
                screen: "Feed",
                // params: { screen: "Feed" },
            })} style={styles.logo}>
                <Logo />
            </TouchableOpacity>

            <View style={styles.rightSection}>
                {!profile ? (
                    <>
                        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                            <Text style={styles.authText}>Login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                            <Text style={styles.authText}>Sign Up</Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <>
                        <TouchableOpacity onPress={handleLogout}>
                            <Ionicons name="log-out-outline" size={24} color="#fff" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                            <View style={styles.avatarContainer}>
                                <Avatar size={36} />
                            </View>
                        </TouchableOpacity>
                    </>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: "transparent",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 9,
        zIndex: 999,
        elevation: 10,
    },
    logo: {
        transform: [{ scale: 1 }],
    },
    rightSection: {
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
    },
    authText: {
        color: "#fff",
        fontSize: 16,
        marginHorizontal: 10,
    },
    avatarContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#db5f5f",
        overflow: "hidden",
    },
});

export default Header;
