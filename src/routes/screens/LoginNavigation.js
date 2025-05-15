import React from "react";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "../../components/features/Profile/Profile";
// import Feed from "../components/features/Feed/Feed";
import BottomTabNavigator from "./BottomTabNavigator";
import Logo from "../../components/common/Logo/Logo";
import Header from "../../components/layouts/Header/Header";
import NotFound from "../../components/features/NotFound/NotFound";
import PostDetails from "../../components/features/Feed/Posts/PostDetails/PostDetails";
import CategoryPage from "../../components/features/Feed/Posts/CategoryPage/CategoryPage";

const Stack = createNativeStackNavigator();

function LoginNavigation() {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen
        name="Main"
        component={BottomTabNavigator}
        options={{
          header: () => <Header />,
        }}
      />
      <Stack.Screen
        name="PostDetails"
        component={PostDetails}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFound}
        options={{ title: "Not Found" }}
      />
    </Stack.Navigator>
  );
}

export default LoginNavigation;
