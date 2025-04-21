import React, { useState, useEffect } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import Logo from "../../common/Logo/Logo";
import Navbar from "../Navbar/Navbar";
import Avatar from "../../common/Avatar/Avatar";
import { loginUser } from "../../../services/authService";
import { getDataFromLocalStorage } from "../../../services/storageService";
import { setProfile } from "../../../store/modules/authSlice";
import { setPosts } from "../../../store/modules/postsSlice";

function Header() {
    const navigation = useNavigation();
    const route = useRoute();
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        if (route.name !== "Login" && route.name !== "Signup") {
            dispatch(setProfile());
            const allPosts = getDataFromLocalStorage("allPosts") || [];
            dispatch(setPosts(allPosts));
        }
    }, [route.name]);

    const handleSearchChange = (text) => {
        setSearchQuery(text);
    };

    const handleSearchSubmit = () => {
        if (searchQuery.trim() !== "") {
            navigation.navigate("Search", { query: searchQuery.trim() });
        }
    };

    return (
        <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.navigate("Home")} style={styles.logo}>
                <Logo />
            </TouchableOpacity>

            <View style={styles.navbar}>
                <Navbar />
            </View>

            <View style={styles.rightSection}>
                <TextInput
                    style={styles.searchInput}
                    value={searchQuery}
                    onChangeText={handleSearchChange}
                    onSubmitEditing={handleSearchSubmit}
                    placeholder="Search post..."
                    placeholderTextColor="#aaa"
                />
                {loginUser && (
                    <TouchableOpacity
                        style={styles.avatarContainer}
                        onPress={() => navigation.navigate("Profile")}
                    >
                        <Avatar />
                    </TouchableOpacity>
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
    },
    logo: {
        transform: [{ scale: 1 }],
    },
    navbar: {
        flex: 1,
        justifyContent: "center",
    },
    rightSection: {
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
    },
    searchInput: {
        width: 200,
        height: 40,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 10,
        paddingHorizontal: 10,
        backgroundColor: "#fff",
        color: "#333",
    },
    avatarContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#db5f5f",
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center",
    },
});

export default Header;