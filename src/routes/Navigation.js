import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { createTestPosts, createTestUsers, clearLocalStorage, storage, saveDataToStorage } from "../services/storageService";
import { getAllPosts } from "../services/postService";
import { getUsers } from "../services/userService";
import { setPosts } from "../store/modules/postsSlice";
import { setUsers, setProfile } from "../store/modules/authSlice";
import LoginNavigation from "./screens/LoginNavigation";
import LogoutNavigation from "./screens/LogoutNavigation";


function Navigation() {
    const dispatch = useDispatch();
     useEffect(() => {
// clearLocalStorage();
            const initializeData = () => {
                const savedProfile = storage.getString("profile");
                if (savedProfile) {
                    const parsed = JSON.parse(savedProfile);
                    dispatch(setProfile(parsed));
                }
    
                let users = getUsers();
                if (!users || users.length === 0) {
                    users = createTestUsers();
                    saveDataToStorage("users", users);
                }
                dispatch(setUsers(users));
    
                let posts = getAllPosts();
                if (!posts || posts.length === 0) {
                    posts = createTestPosts();
                    saveDataToStorage("allPosts", posts);
                }
                dispatch(setPosts(posts));
            };
    
            initializeData();
        }, [dispatch]);
    
    
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