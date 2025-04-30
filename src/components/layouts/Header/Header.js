// import React, { useState, useEffect } from "react";
// import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
// import { useNavigation, useRoute } from "@react-navigation/native";
// import { useDispatch } from "react-redux";
// import Ionicons from "react-native-vector-icons/Ionicons";
// import Logo from "../../common/Logo/Logo";
// import Navbar from "../Navbar/Navbar";
// import Avatar from "../../common/Avatar/Avatar";
// import { loginUser } from "../../../services/authService";
// import { getDataFromStorage } from "../../../services/storageService";
// import { setProfile } from "../../../store/modules/authSlice";
// import { setPosts } from "../../../store/modules/postsSlice";

// function Header() {
//     const navigation = useNavigation();
//     const route = useRoute();
//     const dispatch = useDispatch();
//     const [searchQuery, setSearchQuery] = useState("");

//     const [isSearchOpen, setIsSearchOpen] = useState(false);
//     const searchRef = React.useRef(null);

//     useEffect(() => {
//         const profileData = getDataFromStorage("profile");
//         if (profileData) {
//             dispatch(setProfile(profileData));
//         }
        
//         const postsData = getDataFromStorage("allPosts");
//         if (postsData && postsData.length > 0) {
//             dispatch(setPosts(postsData));
//         }
//     }, [route.name]);

//     // const handleSearchChange = (text) => {
//     //     setSearchQuery(text);
//     // };

//     // const handleSearchSubmit = () => {
//     //     if (searchQuery.trim() !== "") {
//     //         navigation.navigate("Search", { query: searchQuery.trim() });
//     //     }
//     // };
//     const handleSearchChange = (event) => {
//         const query = event.target.value;
//         setSearchQuery(query);
//         if (query.trim() === "") {
//             dispatch(resetFilter());
//         } else {
//             dispatch(searchPosts(query));
//         }
//     };

//     const handleSearchSubmit = () => {
//         if (searchQuery.trim() !== "") {
//             const allPosts = getDataFromStorage("allPosts") || [];
//             const matchingPosts = allPosts.filter((post) =>
//                 post.title.toLowerCase().includes(searchQuery.trim().toLowerCase())
//             );
    
//             if (matchingPosts.length === 1) {
//                 navigation.navigate("Post", { postId: matchingPosts[0].id });
//             } else {
//                 dispatch(filterPosts({
//                     filter: "search", 
//                     sortOrder: "newest",
//                     query: searchQuery.trim()
//                 }));
//                 navigation.navigate("Search", { query: searchQuery.trim() });
//             }
//         }
//     };
//     return (
//         <View style={styles.headerContainer}>
//             <TouchableOpacity onPress={() => navigation.navigate("Home")} style={styles.logo}>
//                 <Logo />
//             </TouchableOpacity>

//             <View style={styles.navbar}>
//                 <Navbar />
//             </View>

//             {/* <View style={styles.rightSection}>
//                 {isSearchOpen ? (
//                     <TextInput
//                         ref={searchRef}
//                         style={styles.searchInput}
//                         value={searchQuery}
//                         onChangeText={handleSearchChange}
//                         onSubmitEditing={handleSearchSubmit}
//                         onBlur={() => setIsSearchOpen(false)}
//                         placeholder="Search post..."
//                         placeholderTextColor="#aaa"
//                         autoFocus
//                     />
//                 ) : (
//                     <TouchableOpacity onPress={() => setIsSearchOpen(true)}>
//                         <Ionicons name="search" size={24} color="#ccc" style={styles.searchIcon}/>
//                     </TouchableOpacity>
//                 )}

//                 {loginUser && (
//                     <TouchableOpacity
//                         style={styles.avatarContainer}
//                         onPress={() => navigation.navigate("Profile")}
//                     >
//                         <Avatar />
//                     </TouchableOpacity>
//                 )}
//             </View> */}
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     headerContainer: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//         alignItems: "center",
//         paddingVertical: 10,
//         paddingHorizontal: 20,
//         backgroundColor: "transparent",
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.4,
//         shadowRadius: 9,
//         zIndex: 999, 
//         elevation: 10,
//     },
//     logo: {
//         transform: [{ scale: 1 }],
//     },
//     navbar: {
//         flexDirection: "row",
//         alignItems: "center",
//         gap: 20,
//     },
//     rightSection: {
//         flexDirection: "row",
//         alignItems: "center",
//         gap: 20,
//     },
//     searchInput: {
//         width: 200,
//         height: 40,
//         borderWidth: 1,
//         borderColor: "#ddd",
//         borderRadius: 10,
//         paddingHorizontal: 10,
//         backgroundColor: "#fff",
//         color: "#333",
//     },
//     searchIcon: {
//         padding: 10,
//       },
//     avatarContainer: {
//         width: 40,
//         height: 40,
//         borderRadius: 20,
//         backgroundColor: "#db5f5f",
//         overflow: "hidden",
//         // marginLeft: 10,
//     },
// });

// export default Header;

import React, { useEffect, useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { createTestPosts, createTestUsers } from "../../../services/storageService";
import { setUsers, setProfile } from "../../../store/modules/authSlice";
import { setPosts } from "../../../store/modules/postsSlice";
import { getAllPosts } from "../../../services/postService";
import { getUsers } from "../../../services/userService";
import { saveDataToStorage, clearLocalStorage, getDataFromStorage, storage } from "../../../services/storageService";
import Logo from "../../common/Logo/Logo";
import Navbar from "../Navbar/Navbar";
import Avatar from "../../common/Avatar/Avatar";
import Ionicons from "react-native-vector-icons/Ionicons";

function Header() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    // Test data creation logic moved here
    const posts = useSelector((state) => state.posts.posts);
    useEffect(() => {
        // clearLocalStorage();
        const initializeData = () => {
            
            const savedProfile = storage.getString("profile");
            if (savedProfile) {
                const parsed = JSON.parse(savedProfile);
                dispatch(setProfile(parsed));
                console.log("User is logged in:", parsed.email);
            }

            let users = getUsers();
            console.log("Existing users:", users);
            if (!users || users.length === 0) {
                users = createTestUsers();
                saveDataToStorage("users", users);
                dispatch(setUsers(users));
                console.log("Test users created!");
            } else {
                dispatch(setUsers(users));
                console.log("Loaded users from storage:", users);
            }
           let posts = getAllPosts();
            console.log("Existing posts:", posts);
            
            if (!posts.length || posts.length === 0) {
                posts = createTestPosts();
                console.log("Test posts created!", posts);
                saveDataToStorage("allPosts", posts);
                dispatch(setPosts(posts));

                posts = getAllPosts();
                console.log("Test posts created!", posts);
            } else {
                dispatch(setPosts(posts));
                console.log("Loaded posts from storage:", posts);
            }
        };

        initializeData();
    }, [dispatch]);


    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = () => {
        if (searchQuery.trim() !== "") {
            // Handle search logic here
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
            {/* <View style={styles.rightSection}>
                {isSearchOpen ? (
                    <TextInput
                        style={styles.searchInput}
                        value={searchQuery}
                        onChangeText={handleSearchChange}
                        onSubmitEditing={handleSearchSubmit}
                        placeholder="Search..."
                    />
                ) : (
                    <TouchableOpacity onPress={() => setIsSearchOpen(true)}>
                        <Ionicons name="search" size={24} color="#ccc" style={styles.searchIcon} />
                    </TouchableOpacity>
                )}

                <TouchableOpacity
                    style={styles.avatarContainer}
                    onPress={() => navigation.navigate("Profile")}
                >
                    <Avatar />
                </TouchableOpacity> 
            </View> */}
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
    },
});

export default Header;
