

import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import Posts from "./Posts/Posts";
import CreatePost from "./CreatePost/CreatePost";
import Filters from "../../common/Filters/Filters";
// import { useScrollPosition } from "../../../hooks/useScrollPosition";
import { fetchPosts, resetFilter } from "../../../store/modules/postsSlice";
import { setPosts, filterPosts } from "../../../store/modules/postsSlice";
import { setUsers, setProfile } from "../../../store/modules/authSlice";
import { getAllPosts } from "../../../services/postService";
import { getUsers } from "../../../services/userService";
import { imageMap } from "../../../utils/util";
// import { mockPosts } from "../../../utils/util";

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { useRoute, useFocusEffect } from "@react-navigation/native";

function Feed() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const posts = useSelector((state) => state.posts.posts);
    const filteredPosts = useSelector((state) => state.posts.filteredPosts);
    const filter = useSelector((state) => state.posts.filter);
    const sortOrder = useSelector((state) => state.posts.sortOrder);
    const route = useRoute();
    // useEffect(() => {
    //     dispatch(resetFilter());
    //     console.log("Resetting filter");
    // }, [dispatch, filter]);
useFocusEffect(
  useCallback(() => { 
         console.log("Resetting filter when in Feed", route.params?.resetToAll);

    if (route.params?.resetToAll) {

      dispatch(resetFilter());
      dispatch(fetchPosts());
      dispatch(filterPosts({
        filter: "all",
        sortOrder: "newest",
        userId: user?.id
      }));
      
      navigation.setParams({ resetToAll: false });
    }
  }, [dispatch, navigation, route.params?.resetToAll, user?.id])
);
    useEffect(() => {
        dispatch(fetchPosts());
        console.log("Fetching posts");
    }, [dispatch]);

    const handleFilterChange = () => {
        dispatch(filterPosts({
            filter, 
            sortOrder, 
            userId: user?.id 
        }));
    };
    return (
        <View style={styles.container}>
            <Filters onFilterChange={handleFilterChange} />
            <Posts posts={posts}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#1e1f21",
    },
    createButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#db5f5f",
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
    },
    createText: {
        color: "#fff",
        marginLeft: 8,
        fontSize: 16,
    },
});

export default Feed;