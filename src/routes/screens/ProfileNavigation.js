import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "../../components/features/Profile/Profile";
import EditProfile from "../../components/features/Profile/EditProfile/EditProfile";

const Stack = createNativeStackNavigator();

function ProfileNavigation() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: "#2f3031" },
                headerTintColor: "#fff",
            }}
        >
            <Stack.Screen name="Profile" component={Profile} options={{ title: "Profile" }} />
            <Stack.Screen name="EditProfile" component={EditProfile} options={{ title: "Edit Profile" }} />
        </Stack.Navigator>
    );
}

export default ProfileNavigation;
