import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons"; 

import Feed from "../../features/Feed/Feed";
import Profile from "../../features/Profile/Profile";
import CreatePost from "../../features/Feed/CreatePost/CreatePost";
import SearchInput from "../../common/SearchInput/SearchInput";

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: "#2f3031",
                    borderTopColor: "#444",
                    height: 60,
                    paddingBottom: 5,
                },
                tabBarIcon: ({ focused, color, size }) => {
                    if (route.name === "CreatePost") {
                        return (
                            <Ionicons 
                                name="add-circle" 
                                size={focused ? 70 : 60} 
                                color="#db5f5f"
                                style={{
                                    marginBottom: 20, // Push it up above the tab bar
                                }}
                            />
                        );
                    }
                
                    let iconName;
                    if (route.name === "Feed") {
                        iconName = focused ? "home" : "home-outline";
                    } else if (route.name === "Search") {
                        iconName = focused ? "search" : "search-outline";
                    } else if (route.name === "Profile") {
                        iconName = focused ? "person" : "person-outline";
                    }
                
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: "#db5f5f",
                tabBarInactiveTintColor: "#aaa",
            })}
        >
            <Tab.Screen name="Feed" component={Feed} />
            <Tab.Screen name="Search" component={SearchInput} />
            {/* <Tab.Screen name="CreatePost" component={CreatePost} /> */}
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    );
}

export default BottomTabNavigator;
