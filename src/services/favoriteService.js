import { getDataFromStorage, saveDataToStorage } from './storageService';

export const getFavorites = () => {
    return getDataFromStorage("favorites") || [];
}

// export const toggleFavorite = async (postId) => {
//     const favorites = await getFavorites();
//     let updatedFavorites;

//     if (favorites.includes(postId)) {
//         updatedFavorites = favorites.filter(id => id !== postId); 
//     } else {
//         updatedFavorites = [...favorites, postId]; 
//     }

//     saveDataToStorage("favorites", updatedFavorites);

//     return updatedFavorites;
// }

