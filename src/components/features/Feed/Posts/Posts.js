import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Ionicons from "@react-native-vector-icons/ionicons";
import { fetchPosts } from "../../../../store/modules/postsSlice";
import PostCard from "../../../features/Feed/Posts/PostCard/PostCard";
import Button from "../../../common/Button/Button";

function Posts() {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts.posts);
    const filteredPosts = useSelector((state) => state.posts.filteredPosts);
    const filter = useSelector((state) => state.posts.filter);

    const flatListRef = useRef();
    const [showScrollTop, setShowScrollTop] = useState(false);

    // useEffect(() => {
    //     dispatch(fetchPosts());
    // }, [dispatch]);
    const handleScroll = (event) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        setShowScrollTop(offsetY > 300);
    };

    const toTop = () => {
        flatListRef.current?.scrollToOffset({ animated: true, offset: 0 });
    };
    const renderPost = ({ item }) => <PostCard post={item} />;
    console.log("Filter:", filter, "Posts count:", posts.length, "Filtered count:", filteredPosts.length);

    const data = filter === "all" ? posts : filteredPosts;

    return (
        <View style={styles.postsContainer}>
            {!data.length ? (
                <Text style={styles.noPostsText}>No posts available</Text>
            ) : (
                <>
                    <FlatList
                        data={data}
                        ref={flatListRef}
                        onScroll={handleScroll}
                        renderItem={renderPost}
                        keyExtractor={(item) => item.id.toString()}
                    />
                    {showScrollTop && (
                        <View style={styles.scrollTopWrapper}>
                            <Button onPress={toTop} text="Scroll up" />
                        </View>
                    )}
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    postsContainer: {
        position: "relative",
        flex: 1,
        flexDirection: "column",
        gap: 16,
        paddingTop: 16,
    },
    noPostsText: {
        textAlign: "center",
        color: "#dfdddd",
        fontSize: 16,
    },
    scrollTopWrapper: {
        bottom: 0,
        right: 20,
        position: "absolute",
        backgroundColor: "transparent"
    }
});

export default Posts;