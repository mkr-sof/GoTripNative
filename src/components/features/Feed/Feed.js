

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPosts } from "../../../store/modules/postsSlice";
import { setUsers, setProfile } from "../../../store/modules/authSlice";
import { getAllPosts } from "../../../services/postService";
import { getUsers } from "../../../services/userService";
import { store } from "../../../store/configureStore";

import adventure1 from "../../../assets/images/adventure/adventure1.jpg";
import adventure2 from "../../../assets/images/adventure/adventure2.jpg";
import adventure3 from "../../../assets/images/adventure/adventure3.jpg";
import adventure4 from "../../../assets/images/adventure/adventure4.jpg";
import nature1 from "../../../assets/images/nature/nature1.jpg";
import nature2 from "../../../assets/images/nature/nature2.jpg";
import nature3 from "../../../assets/images/nature/nature3.jpg";
import nature4 from "../../../assets/images/nature/nature4.jpg";
import cityTrips1 from "../../../assets/images/cityTrips/cityTrips1.jpg";
import cityTrips2 from "../../../assets/images/cityTrips/cityTrips2.jpg";
import cityTrips3 from "../../../assets/images/cityTrips/cityTrips3.jpg";
import cityTrips4 from "../../../assets/images/cityTrips/cityTrips4.jpg";
import beach1 from "../../../assets/images/beach/beach1.jpg";
import beach2 from "../../../assets/images/beach/beach2.jpg";
import beach3 from "../../../assets/images/beach/beach3.jpg";
import beach4 from "../../../assets/images/beach/beach4.jpg";

import {
    View,
    Text,
    FlatList,
    Image,
    StyleSheet
} from "react-native";
import {
    createTestPosts,
    createTestUsers,
    clearLocalStorage,
    getDataFromStorage,
    saveDataToStorage,
    storage
} from "../../../services/storageService";

function Feed() {
    const imageMap = {
        adventure1,
        adventure2,
        adventure3,
        adventure4,
        nature1,
        nature2,
        nature3,
        nature4,
        citytrips1: cityTrips1,
        citytrips2: cityTrips2,
        citytrips3: cityTrips3,
        citytrips4: cityTrips4,
        beach1,
        beach2,
        beach3,
        beach4,
      };
      

    const mockPosts = [
        {
            id: "1",
            title: "Sunset Adventure",
            description: "A beautiful hike during sunset.",
            image: "https://picsum.photos/id/1018/400/300",
            authorName: "Alice Johnson",
            category: "Adventure"
        },
        {
            id: "2",
            title: "City Lights",
            description: "Exploring downtown at night.",
            image: "https://picsum.photos/id/1015/400/300",
            authorName: "Bob Smith",
            category: "City Trips"
        }
    ];

    const posts = useSelector((state) => state.posts.posts);
    const dispatch = useDispatch();
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
            // let existingPosts = getAllPosts();
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
    // useEffect(() => {
    //     const initializePosts = () => {
    //       // 1) Try to read from MMKV
    //       let stored = getDataFromStorage("allPosts") || [];

    //       if (!stored.length) {
    //         // 2) Nothing in storage? write the mock data
    //         saveDataToStorage("allPosts", mockPosts);
    //         dispatch(setPosts(mockPosts));
    //         console.log("Mock posts saved to storage");

    //         // 3) Now *re-read* directly from MMKV to verify
    //         stored = getDataFromStorage("allPosts") || [];
    //         console.log("Read back from storage:", stored);
    //       } else {
    //         dispatch(setPosts(stored));
    //         console.log("Loaded posts from storage:", stored);
    //       }

    //       // 4) Finally set your component state
    //       setPosts(stored);
    //     };

    //     initializePosts();
    //   }, [dispatch]);

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Image source={imageMap[item.image]} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.author}>by {item.authorName}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.category}>{item.category}</Text>
        </View>
    );

    return (
        <FlatList
            data={posts}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            ListEmptyComponent={
                <Text style={styles.empty}>No posts found.</Text>
            }
            contentContainerStyle={
                posts.length === 0 && styles.emptyContainer
            }
        />
    );
};

const styles = StyleSheet.create({
    card: {
        margin: 10,
        padding: 10,
        borderRadius: 8,
        backgroundColor: "#fff",
        elevation: 2
    },
    image: {
        width: "100%",
        height: 200,
        borderRadius: 8,
        marginBottom: 10
    },
    title: {
        fontSize: 18,
        fontWeight: "bold"
    },
    author: {
        marginTop: 5,
        fontStyle: "italic",
        color: "#555"
    },
    description: {
        marginVertical: 5
    },
    category: {
        fontSize: 14,
        color: "#888",
        fontStyle: "italic"
    },
    empty: {
        textAlign: "center",
        fontSize: 16,
        marginTop: 50
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center"
    }
});

export default Feed;
