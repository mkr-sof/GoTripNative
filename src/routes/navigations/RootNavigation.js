// routes/LogoutNavigation.js

import React from "react";
import { View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../../components/features/Auth/Login";
import PostDetails from "../../components/features/Feed/Posts/PostDetails/PostDetails";
import BottomTabNavigator from "./BottomTabNavigator";
import FeedNavigation from "./FeedNavigation";
import Feed from "../../components/features/Feed/Feed";
import ProfileNavigation from "./ProfileNavigation";
import CategoryNavigation from "./CategoryNavigation";
import Header from "../../components/layouts/Header";
import Signup from "../../components/features/Auth/Signup";
import ForgotPassword from "../../components/features/Auth/ForgotPassword";

const Stack = createNativeStackNavigator();

function RootNavigation() {
  return (
    <Stack.Navigator initialRouteName="Tabs">
      <Stack.Screen
        name="Tabs"
        component={BottomTabNavigator}
        options={{
          header: () => (
            <View style={{ backgroundColor: "#2f3031", paddingTop: 10 }}>
              <Header />
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="Home"
        component={FeedNavigation}
      // options={{ title: "FeedNavigation" }}
      />
      <Stack.Screen
        name="PostDetails"
        component={PostDetails}
        options={{
          headerShown: false,
          contentStyle: { backgroundColor: "#2f3031" }
        }}
      />
      <Stack.Screen
        name="ProfileNavigation"
        component={ProfileNavigation}
      options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CategoryNavigation"
        component={CategoryNavigation}
      // options={{ title: "CategoryNavigation" }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          title: "Login",
          headerStyle: { backgroundColor: "#2f3031" },
          headerTintColor: "#fff",
          contentStyle: { backgroundColor: "#1e1f21" }
        }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{
          title: "Sign Up",
          headerStyle: { backgroundColor: "#2f3031" },
          headerTintColor: "#fff",
          contentStyle: { backgroundColor: "#1e1f21" }
        }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{
          title: "Forgot Password",
          headerStyle: { backgroundColor: "#2f3031" },
          headerTintColor: "#fff",
          contentStyle: { backgroundColor: "#1e1f21" }
        }}
      />
    </Stack.Navigator>
  );
}

export default RootNavigation;
