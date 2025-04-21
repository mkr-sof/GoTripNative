import React from "react";
import { View, StyleSheet } from "react-native";
import UserPanel from "../UserPanel/UserPanel";

function Sidebar() {
    return (
        <View style={styles.sidebar}>
            <UserPanel />
        </View>
    );
}

const styles = StyleSheet.create({
    sidebar: {
        height: "100%",
        backgroundColor: "#2f3031", 
        padding: 10, 
    },
});

export default Sidebar;