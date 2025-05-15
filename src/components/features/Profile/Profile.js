// import React, { useEffect } from "react";
// import { View, Text, StyleSheet, ScrollView } from "react-native";
// import { useRoute, useNavigation } from "@react-navigation/native";
// import { useSelector } from "react-redux";
// import PostCard from "../Feed/Posts/PostCard/PostCard";
// import EditProfile from "./EditProfile/EditProfile";
// import Description from "../../common/Description/Description";

// function Profile() {
//     const route = useRoute();
//     const navigation = useNavigation();
//     const { userId } = route.params || {};

//     const profile = useSelector((state) => state.auth.user);
//     const posts = useSelector((state) => state.posts.posts);
//     const allUsers = useSelector((state) => state.auth.users);

//     const isEditing = route.name === "EditProfile";

//     const profileUser = userId
//         ? allUsers.find((user) => user.id === Number(userId))
//         : profile;

//     if (!profileUser) {
//         return (
//             <View style={styles.loadingContainer}>
//                 <Text style={styles.loadingText}>Loading...</Text>
//             </View>
//         );
//     }

//     const filteredPosts = posts.filter((post) => +post.authorId === profileUser.id);

//     return (
//         <ScrollView contentContainerStyle={styles.profileContainer}>
//             {isEditing ? (
//                 <EditProfile />
//             ) : (
//                 <>
//                     <Text style={styles.profileTitle}>{profileUser.name}'s Profile</Text>
//                     <Description>{profileUser.name}'s Posts</Description>
//                     {filteredPosts.length > 0 ? (
//                         filteredPosts.map((post) => <PostCard key={post.id} post={post} />)
//                     ) : (
//                         <Text style={styles.noPostsText}>No posts found</Text>
//                     )}
//                 </>
//             )}
//         </ScrollView>
//     );
// }

// const styles = StyleSheet.create({
//     profileContainer: {
//         flexGrow: 1,
//         padding: 20,
//         backgroundColor: "#2f3031",
//         borderRadius: 8,
//     },
//     profileTitle: {
//         fontSize: 24,
//         fontWeight: "bold",
//         color: "#fff",
//         marginBottom: 20,
//         textAlign: "center",
//     },
//     noPostsText: {
//         fontSize: 16,
//         color: "#ccc",
//         textAlign: "center",
//         marginTop: 20,
//     },
//     loadingContainer: {
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//         backgroundColor: "#2f3031",
//     },
//     loadingText: {
//         fontSize: 18,
//         color: "#ccc",
//     },
// });

// export default Profile;

import React from "react";
import { View, Text, FlatList, StyleSheet, Button } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import PostCard from "../Feed/Posts/PostCard/PostCard";

export default function Profile() {
    const route = useRoute();
    const navigation = useNavigation();

    const profile = useSelector((state) => state.auth.user);
    const allUsers = useSelector((state) => state.auth.users);
    const posts = useSelector((state) => state.posts.posts);
    

    const { userId } = route.params || {};

   const profileUser = userId
        ? allUsers.users.find(user => user.id === Number(userId))
        : profile;


    const userPosts = posts.filter((post) => post.authorId === profileUser?.id);

    if (!profileUser) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>User not found.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                {profile ? "Your Profile" : `${profileUser.name}'s Profile`}
            </Text>

            {profile && (
                <Button title="Edit Profile" onPress={() => navigation.navigate("ProfileNavigation",{
                    screen: "EditProfile",
                    params: { userId: profileUser.id },
                })} />
            )}

            <Text style={styles.subtitle}>Posts by {profileUser.name}</Text>
            {userPosts.length > 0 ? (
                <FlatList
                    data={userPosts}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <PostCard post={item} />}
                />
            ) : (
                <Text style={styles.noPosts}>No posts found</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#1e1f21",
    },
    title: {
        fontSize: 24,
        color: "white",
        marginBottom: 10,
        textAlign: "center",
    },
    subtitle: {
        fontSize: 18,
        color: "#ccc",
        marginTop: 20,
        marginBottom: 10,
    },
    noPosts: {
        color: "#888",
        textAlign: "center",
        marginTop: 20,
    },
});
