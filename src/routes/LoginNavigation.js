import React from "react";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "../components/features/Profile/Profile";
// import Feed from "../components/features/Feed/Feed";
import BottomTabNavigator from "../components/layouts/BottomTabNavigator/BottomTabNavigator";
import Logo from "../components/common/Logo/Logo";
import Header from "../components/layouts/Header/Header";
// import NotFound from "../components/features/NotFound/NotFound";
// import PostDetails from "../components/features/Feed/Posts/PostDetails/PostDetails";
// import CategoryPage from "../components/features/Feed/Posts/CategoryPage/CategoryPage";

const Stack = createNativeStackNavigator();

function LoginNavigation() {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen name="Main" 
      // component={Feed}
      component={BottomTabNavigator} 
        // options={{
        //   header: () => <Header />
        // }} 
        options={{ headerShown: false }} 
        />
         <Stack.Screen name="Profile" component={Profile} />
      {/* <Stack.Screen name="hello" component={Hello} />  */}
      {/* 
        
       
        <Stack.Screen name="PostDetails" component={PostDetails} />
        <Stack.Screen name="CategoryPage" component={CategoryPage} />
        <Stack.Screen name="NotFound" component={NotFound} /> */}
    </Stack.Navigator>
  );
}

export default LoginNavigation;


// const Hello = () => {
//   return(
//     <View style={{height: 50, width:59, backgroundColor:'red'}}/>
//   )
// }