import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import App from "../components/App/App";
import Login from "../components/features/Auth/Login";
import Signup from "../components/features/Auth/Signup";
import ForgotPassword from "../components/features/Auth/ForgotPassword";
import Profile from "../components/features/Profile/Profile";
import Feed from "../components/features/Feed/Feed";
import NotFound from "../components/features/NotFound/NotFound";
import PostDetails from "../components/features/Feed/Posts/PostDetails/PostDetails";
import CategoryPage from "../components/features/Feed/Posts/CategoryPage/CategoryPage";

const Stack = createNativeStackNavigator();

function configureRouter() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Feed">
        <Stack.Screen name="App" component={App} options={{ headerShown: false }} />
        <Stack.Screen name="Feed" component={Feed} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="PostDetails" component={PostDetails} />
        <Stack.Screen name="CategoryPage" component={CategoryPage} />
        <Stack.Screen name="NotFound" component={NotFound} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default configureRouter;