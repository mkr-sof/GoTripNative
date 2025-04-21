import AsyncStorage from "@react-native-async-storage/async-storage";
import adventure1 from "../assets/images/adventure/adventure1.jpg";
import adventure2 from "../assets/images/adventure/adventure2.jpg";
import adventure3 from "../assets/images/adventure/adventure3.jpg";
import adventure4 from "../assets/images/adventure/adventure4.jpg";
import nature1 from "../assets/images/nature/nature1.jpg";
import nature2 from "../assets/images/nature/nature2.jpg";
import nature3 from "../assets/images/nature/nature3.jpg";
import nature4 from "../assets/images/nature/nature4.jpg";
import cityTrips1 from "../assets/images/cityTrips/cityTrips1.jpg";
import cityTrips2 from "../assets/images/cityTrips/cityTrips2.jpg";
import cityTrips3 from "../assets/images/cityTrips/cityTrips3.jpg";
import cityTrips4 from "../assets/images/cityTrips/cityTrips4.jpg";
import beach1 from "../assets/images/beach/beach1.jpg";
import beach2 from "../assets/images/beach/beach2.jpg";
import beach3 from "../assets/images/beach/beach3.jpg";
import beach4 from "../assets/images/beach/beach4.jpg";

export const saveDataToAsyncStorage = async (key, data) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error(`Error saving ${key} to AsyncStorage:`, error);
    }
};

export const getDataFromAsyncStorage = async (key) => {
    try {
        const data = await AsyncStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error(`Error reading ${key} from AsyncStorage:`, error);
        return null;
    }
};

export const removeDataFromAsyncStorage = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (error) {
        console.error(`Error removing ${key} from AsyncStorage:`, error);
    }
};

export const clearAsyncStorage = async () => {
    try {
        await AsyncStorage.clear();
    } catch (error) {
        console.error("Error clearing AsyncStorage:", error);
    }
};

export const createTestUsers = async () => {
    const testUsers = [
        {
            id: 1,
            name: "Alice Johnson",
            email: "alice@example.com",
            password: "test123",
            avatar: "https://randomuser.me/api/portraits/women/1.jpg",
        },
        {
            id: 2,
            name: "Bob Smith",
            email: "bob@example.com",
            password: "test123",
            avatar: "https://randomuser.me/api/portraits/men/2.jpg",
        },
        {
            id: 3,
            name: "Charlie Brown",
            email: "charlie@example.com",
            password: "test123",
            avatar: "https://randomuser.me/api/portraits/men/3.jpg",
        },
    ];

    await saveDataToAsyncStorage("users", testUsers);
};

export const createTestPosts = async () => {
    const users = (await getDataFromAsyncStorage("users")) || [];
    const existingPosts = (await getDataFromAsyncStorage("allPosts")) || [];

    if (existingPosts.length > 0) {
        console.log("Test posts already exist.");
        return;
    }

    const categories = ["Adventure", "Nature", "City Trips", "Beach"];
    const sampleDescriptions = [
        "An amazing experience in the wild!",
        "Exploring the beauty of nature.",
        "A fantastic city adventure.",
        "Relaxing by the beach under the sun.",
    ];

    const categoryImages = {
        Adventure: [adventure1, adventure2, adventure3, adventure4],
        Nature: [nature1, nature2, nature3, nature4],
        "City Trips": [cityTrips1, cityTrips2, cityTrips3, cityTrips4],
        Beach: [beach1, beach2, beach3, beach4],
    };

    const testPosts = users.flatMap((user) =>
        Array.from({ length: 4 }, (_, index) => {
            const category = categories[index];
            const randomImage =
                categoryImages[category][Math.floor(Math.random() * 4)];
            return {
                id: Date.now() + Math.random(),
                authorId: user.id,
                authorName: user.name,
                title: `Test Post ${index + 1} by ${user.name}`,
                description: sampleDescriptions[index],
                category: categories[index],
                image: randomImage,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                isFavorite: false,
            };
        })
    );

    await saveDataToAsyncStorage("allPosts", testPosts);
    console.log("Test posts created!");
};