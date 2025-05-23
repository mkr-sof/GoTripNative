import { storage } from "./storageService";
import { saveDataToStorage, removeDataFromStorage } from './storageService';
import {  getUsers } from "./userService";
import { setProfile, setUsers } from "../store/modules/authSlice";


export const signupUser = async (userData, dispatch) => {
    try {
    const {name, email, password} = userData;
    const users = await getUsers();

    const existingUser = users.find(user => user.email === email);

    if(existingUser){
        return {success: false, message: "User alredy exists!"};
    }
    const newUser = { 
        id: Date.now(), 
        name, 
        email, 
        password, 
        posts: [],
        avatar: null,
    };
    saveDataToStorage("users", [...users, newUser]);
    saveDataToStorage("profile", newUser);
    dispatch(setUsers([...users, newUser]));
    await profile({ email, password }, dispatch);
    return { success: true };
} catch (error) {
    return { success: false, message: "Something went wrong!" };
}
}

export const profile = async (userData, dispatch, usersFromState = []) => {
try{
    const {email, password} = userData;
    console.log("userData", userData)
    let users = usersFromState;
    // console.log("users", users);
    
    if (!users || users.length === 0) {
      users = await getUsers();
      dispatch(setUsers(users)); 
    }
    const user = users.find(user => user.email === email);
    // console.log("user", user);
    if(!user){
        return {success: false, message: "You are not registered yet!"};
    }

    if(user.password !== password){
        return {success: false, message: "Invalid email or password"};
    }
   
    saveDataToStorage("profile", user);
    
    dispatch(setProfile({ ...user }));
    return {success: true, user};
}catch(error){
    console.error("Login error:", error);
    return {success: false, message: "Something went wrong!"}
}
}

export const resetPassword = async (email) => {
    try {
    const users = await getUsers();
    const user = users.find(user => user.email === email);
    if(!user){
        return {success: false, message: "User not found."};
    }
    return {success: true, message: "Password reset instructions have been sent to your email."};
} catch (error) {
    return { success: false, message: "Something went wrong!" };
}
}

export const logoutUser = async () => {
    try {
        removeDataFromStorage("profile");
    } catch (error) {
        console.error("Error during logout", error);
    }
}