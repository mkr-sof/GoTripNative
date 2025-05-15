import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { searchPosts, resetFilter } from "../../store/modules/postsSlice";
import SearchInput from "../../components/common/SearchInput/SearchInput"; 
import Posts from "../../components/features/Feed/Posts/Posts"; 

function SearchScreen() {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        if (query.trim() === "") {
            dispatch(resetFilter());
        } else {
            dispatch(searchPosts(query));
        }
    }, [query, dispatch]);

    const handleChange = (text) => {
        setQuery(text);
    };

    return (
        <View style={styles.container}>
            <SearchInput
                searchInputValue={query}
                onChange={handleChange}
                placeholder="Search posts..."
            />
            <Posts />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: "#121212",
        paddingTop: 20,
    },
});

export default SearchScreen;
