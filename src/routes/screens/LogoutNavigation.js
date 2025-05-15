// routes/LogoutNavigation.js

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../../components/features/Auth/Login";
import PostDetails from "../../components/features/Feed/Posts/PostDetails/PostDetails";
import BottomTabNavigator from "./BottomTabNavigator";
import ProfileNavigation from "./ProfileNavigation";
import Header from "../../components/layouts/Header/Header";
import Signup from "../../components/features/Auth/Signup";
import ForgotPassword from "../../components/features/Auth/ForgotPassword";

const Stack = createNativeStackNavigator();

function LogoutNavigation() {
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
        name="ProfileNavigation"
        component={ProfileNavigation}
        options={{ title: "ProfileNavigation" }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ title: "Login" }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{ title: "Sign Up" }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{ title: "Forgot Password" }}
      />
    </Stack.Navigator>
  );
}

export default LogoutNavigation;
