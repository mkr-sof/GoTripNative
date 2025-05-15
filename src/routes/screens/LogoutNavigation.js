// routes/LogoutNavigation.js

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../../components/features/Auth/Login";
import Signup from "../../components/features/Auth/Signup";
import ForgotPassword from "../../components/features/Auth/ForgotPassword";

const Stack = createNativeStackNavigator();

function LogoutNavigation() {
  return (
    <Stack.Navigator initialRouteName="Login">
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
