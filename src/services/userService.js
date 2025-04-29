
import { getDataFromStorage } from "./storageService";


export const getCurrentUser = () => {
    const user = getDataFromStorage("profile"); 
    if (user) {
        return user;
    }else{
    //   const sessionUser = AsyncStorage.getItem("profile");
    // return sessionUser ? JSON.parse(sessionUser) : null;  
        return null;
    }
    
};

export const getUsers = () => {
    return getDataFromStorage("users") || [];
}