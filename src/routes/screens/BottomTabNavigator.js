import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FeedMavigation from "./FeedMavigation";
import Ionicons from "@react-native-vector-icons/ionicons"; 
import SearchScreen from "./SearchScreen";
import ProfileNavigation from "./ProfileNavigation";
import Feed from "../../components/features/Feed/Feed";
import Profile from "../../components/features/Profile/Profile";
import CreatePost from "../../components/features/Feed/CreatePost/CreatePost";
import SearchInput from "../../components/common/SearchInput/SearchInput";

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
                                    marginBottom: 20, 
                                }}
                            />
                        );
                    }
                
                    let iconName;
                    if (route.name === "Home") {
                        iconName = focused ? "home" : "home-outline";
                    } else if (route.name === "Search") {
                        iconName = focused ? "search" : "search-outline";
                    } else if (route.name === "Profile") {
                        iconName = focused ? "person" : "person-outline";
                    }
                
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: "#2f33a1",
                tabBarInactiveTintColor: "#aaa",
            })}
        >
            <Tab.Screen name="Home" component={FeedMavigation} />
            <Tab.Screen name="Search" component={SearchScreen} />
            {/* <Tab.Screen name="CreatePost" component={CreatePost} /> */}
            <Tab.Screen name="Profile" component={ProfileNavigation} />
        </Tab.Navigator>
    );
}

export default BottomTabNavigator;
