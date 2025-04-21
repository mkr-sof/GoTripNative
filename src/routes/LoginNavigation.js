import React from "react";
import { View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import App from "../components/App/App";
// import Profile from "../components/features/Profile/Profile";
// import Feed from "../components/features/Feed/Feed";
// import NotFound from "../components/features/NotFound/NotFound";
// import PostDetails from "../components/features/Feed/Posts/PostDetails/PostDetails";
// import CategoryPage from "../components/features/Feed/Posts/CategoryPage/CategoryPage";

const Stack = createNativeStackNavigator();

function LoginNavigation() {
  return (
      <Stack.Navigator initialRouteName="hello">
        <Stack.Screen name="hello" component={Hello} />
        {/* <Stack.Screen name="App" component={App} options={{ headerShown: false }} />
        <Stack.Screen name="Feed" component={Feed} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="PostDetails" component={PostDetails} />
        <Stack.Screen name="CategoryPage" component={CategoryPage} />
        <Stack.Screen name="NotFound" component={NotFound} /> */}
      </Stack.Navigator>
  );
}

export default LoginNavigation;


const Hello = () => {
  return(
    <View style={{height: 50, width:59, backgroundColor:'red'}}/>
  )
}