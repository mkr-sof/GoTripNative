import React from "react";
import { useSelector } from "react-redux";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FeedNavigation from "./FeedNavigation";
import Ionicons from "@react-native-vector-icons/ionicons";
import SearchScreen from "../screens/SearchScreen";
import ProfileNavigation from "./ProfileNavigation";
import Feed from "../../components/features/Feed/Feed";
import Profile from "../../components/features/Profile/Profile";
import CategoryScreen from "./CategoryNavigation";
import CreatePost from "../../components/features/Feed/CreatePost/CreatePost";
import SearchInput from "../../components/common/SearchInput/SearchInput";

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
    const { user } = useSelector((state) => state.auth);
    
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle: {
                    borderColor: "#444",
                    backgroundColor: "#2f3031",
                    borderTopColor: "#444",
                    height: 60,
                    paddingBottom: 5,
                },
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === "Home") {
                        iconName = focused ? "home" : "home-outline";
                    } else if (route.name === "Search") {
                        iconName = focused ? "search" : "search-outline";
                    } else if (route.name === "ProfileNavigation") {
                        iconName = focused ? "person" : "person-outline";
                    }else if (route.name === "Categories") {
                        iconName = focused ? "grid" : "grid-outline";
                    }else if (route.name === "CreatePost") {
                        iconName = focused ? "add-circle" : "add-circle-outline";
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: "#2f33a1",
                tabBarInactiveTintColor: "#aaa",
            })}
        >
            <Tab.Screen name="Home" component={FeedNavigation} />
            <Tab.Screen name="Search" component={SearchScreen} />
            {user && (
                <Tab.Screen name="CreatePost" component={CreatePost} />
            )}
            <Tab.Screen name="Categories" component={CategoryScreen} />
            {user && (
            <Tab.Screen name="ProfileNavigation" component={ProfileNavigation} />
              )} 
        </Tab.Navigator>
    );
}

export default BottomTabNavigator;
