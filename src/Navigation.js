import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { storage } from "./services/storageService";
import { createTestPosts, createTestUsers } from "./services/storageService";
import { getAllPosts } from "./services/postService";
import { getUsers } from "./services/userService";
import { setPosts } from "./store/modules/postsSlice";
import { setUsers, setProfile } from "./store/modules/authSlice";
import LoginNavigation from "./routes/LoginNavigation";
// import LogoutNavigation from "./routes/LogoutNavgiation";


function Navigation(){
    // const dispatch = useDispatch();
    // const profile = useSelector(state => state.auth.profile);
    // const [loading, setLoading] = useState(true);
    
    // useEffect(() => {
    // const initializeData = async () => {
    //     const savedProfile = storage.getString("profile");
    //     if (savedProfile) {
    //       const parsed = JSON.parse(savedProfile);
    //       dispatch(setProfile(parsed));
    //       console.log("User is logged in:", parsed.email);
    //     }

    //     const existingUsers = await getUsers();
    //     if (!existingUsers || existingUsers.length === 0) {
    //         const users = createTestUsers();
    //         dispatch(setUsers(users));
    //         console.log("Test users created!");
    //     }
    
    //     const existingPosts = await getAllPosts();
    //     console.log("Existing posts:", existingPosts);
    //     if (!existingPosts || existingPosts.length === 0) {
    //         const posts = createTestPosts();
    //         dispatch(setPosts(posts));
    //         console.log("Test posts created!");
    //     }else{
    //         dispatch(setPosts(existingPosts));
    //     }
    //     // setLoading(false);
    // };
    // initializeData();
    // }, [])
    // if (loading) return null;
    return (
        <NavigationContainer>
            <LoginNavigation />
          {/* {profile ? <LoginNavigation/> : <LogoutNavigation/>} */}
        </NavigationContainer>
    )
}

export default Navigation;