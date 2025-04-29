import { saveDataToStorage, getDataFromStorage } from './storageService';

export const createPost = async (post) => {
    const allPosts = await getDataFromStorage("allPosts") || [];
    const updatedPosts = [...allPosts, post];
    saveDataToStorage("allPosts", updatedPosts);

    const users = await getDataFromStorage("users") || [];
    const updatedUsers = users.map(user => {
        if (user.id === post.authorId) {
            const updatedUserPosts = [...(user.posts || []), post];
            return { ...user, posts: updatedUserPosts };
        }
        return user;
    });
    saveDataToStorage("users", updatedUsers);
    return { updatedPosts, updatedUsers };
}

export const getAllPosts = () => {
    return getDataFromStorage("allPosts") || [];
}


// export const updatePost = async (postId, updatedData) => {
//     let allPosts = await getDataFromLocalStorage("allPosts") || [];
//     allPosts = allPosts.map(post => 
//         post.id === postId ? {...post, ...updatedData} : post
//     )
//     saveDataToLocalStorage("allPosts", allPosts);
// }

export const updatePost = (postId, updatedData) => {

    let allPosts = getDataFromStorage("allPosts") || [];
    allPosts = allPosts.map(post =>
        post.id === postId ? { ...post, ...updatedData, updated_at: new Date().toISOString() } : post
    );
    saveDataToStorage("allPosts", allPosts);

    
    let users = getDataFromStorage("users") || [];
    const updatedUsers = users.map(user => {
        if (user.posts) {
            const updatedUserPosts = user.posts.map(post =>
                post.id === postId ? { ...post, ...updatedData, updated_at: new Date().toISOString() } : post
            );
            return { ...user, posts: updatedUserPosts };
        }
        return user;
    });
    saveDataToStorage("users", updatedUsers);
}


// export const removePost = async (postId) => {
//     let allPosts = await getDataFromLocalStorage("allPosts") || [];
//     allPosts = allPosts.filter(post => post.id !== postId);
//     saveDataToLocalStorage("allPosts", allPosts);
//     return allPosts;
// }

export const removePost = (postId) => {

    let allPosts = getDataFromStorage("allPosts") || [];
    allPosts = allPosts.filter(post => post.id !== postId);
    saveDataToStorage("allPosts", allPosts);

    let users = getDataFromStorage("users") || [];
    const updatedUsers = users.map(user => {
        if (user.posts) {
            const updatedUserPosts = user.posts.filter(post => post.id !== postId);
            return { ...user, posts: updatedUserPosts };
        }
        return user;
    });
    saveDataToStorage("users", updatedUsers);

    return { allPosts, updatedUsers };
}