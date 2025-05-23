import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CategoryPage from "../../components/features/Feed/Posts/CategoryPage/CategoryPage";
import CategoryListScreen from "../screens/CategoriesListScreen";

const Stack = createNativeStackNavigator()

function CategoryNavigation() {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="CategoryList" component={CategoryListScreen} />
            <Stack.Screen name="CategoryPage" component={CategoryPage} />
        </Stack.Navigator>
    )
}

export default CategoryNavigation;