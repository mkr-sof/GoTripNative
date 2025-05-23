import { createSlice } from "@reduxjs/toolkit";
import { getAllPosts } from "../../services/postService";
import { getUsers } from "../../services/userService";
import { getDataFromStorage, saveDataToStorage } from "../../services/storageService";

const initialFavorites = getDataFromStorage("favorites") || [];

const initialState = {
    users: [],
    posts: [],
    filteredPosts: [],
    favorites: initialFavorites,
    showScrollUp: false,
    filter: "all",
    sortOrder: "newest",
};

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        setPosts: (state, action) => {
            const posts = action.payload;
            state.posts = posts;
            state.filteredPosts = [...posts];
        },
        updatePost: (state, action) => {
            const updatedPost = action.payload;
            state.posts = state.posts.map(post =>
                post.id === updatedPost.id ? { ...post, ...updatedPost } : post
            );
            state.filteredPosts = [...state.posts];
            state.users = state.users.map(user => {
                if (user.posts) {
                    const updatedUserPosts = user.posts.map(post =>
                        post.id === updatedPost.id ? { ...post, ...updatedPost } : post
                    );
                    return { ...user, posts: updatedUserPosts };
                }
                return user;
            });

            saveDataToStorage("allPosts", state.posts);
            saveDataToStorage("users", state.users);
        },
        createPost: (state, action) => {
            const newPost = action.payload;
            state.posts.unshift(newPost);
            state.filteredPosts = [...state.posts];
            state.users = state.users.map(user => {
                if (user.id === newPost.authorId) {
                    const updatedUserPosts = user.posts
                        ? [...user.posts, newPost]
                        : [newPost];
                    return { ...user, posts: updatedUserPosts };
                }
                return user;
            });
            saveDataToStorage("allPosts", state.posts);
            saveDataToStorage('users', state.users);
        },
        filterPosts: (state, action) => {
            const {
                filter,
                sortOrder,
                userId,
                category,
                query
            } = action.payload;

            state.filterQuery = query || "";
            state.filter = filter;
            state.sortOrder = sortOrder;
            state.filterUserId = filter === "author" ? userId : null;

            let filtered = state.posts;

            if (filter === "favorites") {
                filtered = filtered.filter(post => state.favorites.includes(post.id));
            }

            if (filter === "author" && userId) {
                filtered = filtered.filter(post => post.authorId === userId);
            }

            if (filter === "category" && category) {
                const categoryToCheck = category.toLowerCase().replace(/\s+/g, '-');
                filtered = filtered.filter(post => {
                    const postCategory = post.category?.toLowerCase().replace(/\s+/g, '-');
                    return postCategory === categoryToCheck;
                });
            }

            if (query) {
                filtered = filtered.filter(post =>
                    post.title.toLowerCase().includes(query.toLowerCase())
                );
            }

            state.filteredPosts = filtered.sort((a, b) => {
                const aDate = new Date(a.updated_at || a.created_at);
                const bDate = new Date(b.updated_at || b.created_at);
                return sortOrder === "newest" ? bDate - aDate : aDate - bDate;
            });
        },
        toggleFavorite: (state, action) => {
            const postId = action.payload;
            if (state.favorites.includes(postId)) {
                state.favorites = state.favorites.filter(id => id !== postId);
            } else {
                state.favorites.push(postId);
            }
            saveDataToStorage("favorites", state.favorites);

            if (state.filter === "favorites") {
                state.filteredPosts = state.posts.filter(post => state.favorites.includes(post.id));
            }
        },
        deletePost: (state, action) => {
            const postId = action.payload;
            state.posts = state.posts.filter(post => post.id !== postId);
            state.filteredPosts = state.filteredPosts.filter(post => post.id !== postId);

            const allPosts = state.posts;
            saveDataToStorage("allPosts", allPosts);

            let users = getUsers() || [];
            const updatedUsers = users.map(user => {
                if (user.posts) {
                    const updatedUserPosts = user.posts.filter(post => post.id !== postId);
                    return { ...user, posts: updatedUserPosts };
                }
                return user;
            });
            saveDataToStorage("users", updatedUsers);
        },
        searchPosts: (state, action) => {
            const query = action.payload?.toLowerCase();

            let search = state.posts;

            if (state.filter === "favorites") {
                search = state.posts.filter(post => state.favorites.includes(post.id));
            } else if (state.filter === "author" && state.filterUserId) {
                search = state.posts.filter(post => post.authorId === state.filterUserId);
            }

            state.filteredPosts = search.filter((post) =>
                post.title?.toLowerCase().includes(query) ||
                post.description?.toLowerCase().includes(query)
            );

            state.filterQuery = query;
            state.filter = "search";
        },

        resetFilter: (state) => {
            state.filteredPosts = [...state.posts];
            console.log("resetFilter called", state.filteredPosts.length, state.posts.length);
            state.filter = "all";
            state.filterUserId = null;
        },
    },
});

export const {
    setPosts,
    filterPosts,
    createPost,
    toggleFavorite,
    updatePost,
    deletePost,
    searchPosts,
    resetFilter
} = postsSlice.actions;

export const fetchPosts = (filterOptions) => async (dispatch, getState) => {
    try {
        const data = await getAllPosts();
        dispatch(setPosts(data));

        dispatch(filterPosts({...filterOptions}));

        // const { posts } = getState();
        // dispatch(filterPosts({
        //     filter: posts.filter,
        //     sortOrder: posts.sortOrder,
        //     userId: posts.filterUserId,
        //     category: posts.filterCategory,
        //     query: posts.filterQuery,
        // }));
    } catch (error) {
        console.error("Failed to fetch posts:", error);
    }
};

export default postsSlice.reducer;