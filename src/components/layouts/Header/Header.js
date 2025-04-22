import React, { useState, useEffect } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
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

    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const searchRef = React.useRef(null);

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
                {isSearchOpen ? (
                    <TextInput
                        ref={searchRef}
                        style={styles.searchInput}
                        value={searchQuery}
                        onChangeText={handleSearchChange}
                        onSubmitEditing={handleSearchSubmit}
                        onBlur={() => setIsSearchOpen(false)}
                        placeholder="Search post..."
                        placeholderTextColor="#aaa"
                        autoFocus
                    />
                ) : (
                    <TouchableOpacity onPress={() => setIsSearchOpen(true)}>
                        <Ionicons name="search" size={24} color="#ccc" style={styles.searchIcon}/>
                    </TouchableOpacity>
                )}

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
        zIndex: 999, 
        elevation: 10,
    },
    logo: {
        transform: [{ scale: 1 }],
    },
    navbar: {
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
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
    searchIcon: {
        padding: 10,
      },
    avatarContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#db5f5f",
        overflow: "hidden",
        // marginLeft: 10,
    },
});

export default Header;