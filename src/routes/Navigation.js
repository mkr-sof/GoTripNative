import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { storage } from "../services/storageService";
import { createTestPosts, createTestUsers } from "../services/storageService";
import { getAllPosts } from "../services/postService";
import { getUsers } from "../services/userService";
import { setPosts } from "../store/modules/postsSlice";
import { setUsers, setProfile } from "../store/modules/authSlice";
import LoginNavigation from "./screens/LoginNavigation";
import LogoutNavigation from "./screens/LogoutNavigation";


function Navigation() {
    const dispatch = useDispatch();
    const profile = useSelector((state) => state.auth.user);

    useEffect(() => {
        const profile = storage.getString("profile");
        if (profile) {
            const parsed = JSON.parse(profile);
            dispatch(setProfile(parsed));
        }

    }, [dispatch])
    return (
        <NavigationContainer>
            {profile ? <LoginNavigation /> : <LogoutNavigation />}
        </NavigationContainer>
    )
}

export default Navigation;