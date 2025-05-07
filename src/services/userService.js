import { getDataFromStorage } from "./storageService";

export const getCurrentUser = () => {
    const user = getDataFromStorage("profile"); 
    if (user) {
        return user;
    }else{
        return null;
    }
    
};

export const getUsers = () => {
    return getDataFromStorage("users") || [];
}