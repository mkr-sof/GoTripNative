import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { MaterialIcons } from "react-native-vector-icons";

class SearchInput extends React.Component {
    render() {
        const { searchInputValue, onBlur, onKeyDown, onChange, placeholder } = this.props;

        return (
            <View style={styles.searchBox}>
                <MaterialIcons name="search" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    value={searchInputValue}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    onKeyPress={onKeyDown}
                    placeholder={placeholder || "Search post..."}
                    placeholderTextColor="#aaa"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    searchBox: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: 400,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: "#202020",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    searchIcon: {
        fontSize: 18,
        color: "#aaa",
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        borderWidth: 0,
        fontSize: 16,
        color: "#555",
        paddingVertical: 5,
        backgroundColor: "transparent",
    },
});

export default SearchInput;