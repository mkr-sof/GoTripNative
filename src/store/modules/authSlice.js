import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice } from '@reduxjs/toolkit';
import { getCurrentUser } from "../../services/userService";
import { getDataFromStorage, saveDataToStorage, removeDataFromStorage } from "../../services/storageService";

const initialUsers = getDataFromStorage("users") || [];

const initialState = {
    user: getDataFromStorage("profile") || null,
    users: initialUsers,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setProfile: (state, action) => {
            const user = action.payload ? action.payload : getCurrentUser();
            state.user = user;
            const rememberMe = action.payload?.rememberMe;

            if (rememberMe) {
                saveDataToStorage("profile", state.user);
            } else {
                AsyncStorage.setItem("profile", JSON.stringify(state.user));
            }
            if(action.payload){
            state.users = state.users.filter(user => user.id !== action.payload.id);
            state.users.push(action.payload);

            saveDataToStorage("users", state.users);
            }
        },
        logout: (state) => {
            state.user = null;
            state.users = getDataFromStorage("users") || [];
            removeDataFromStorage("profile");
        },
        setAvatar: (state, action) => {
            if (state.user) {
                state.user.avatar = action.payload;
                saveDataToStorage("profile", state.user);
            }
        },
        setUsers: (state, action) => {
            const users = action.payload;
            state.users = users;
            saveDataToStorage("users", users);
        },
    },
});

export const { setProfile, logout, setAvatar, setUsers } = authSlice.actions;
export default authSlice.reducer;