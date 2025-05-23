import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Feed from "../../components/features/Feed/Feed"
import { useRoute } from "@react-navigation/native"

const Stack = createNativeStackNavigator()

function FeedNavigation() {
    const route = useRoute();
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen 
            name="Feed" 
            component={Feed} 
            // initialParams={{resetToAll: route.params.resetToAll}}
            />
        </Stack.Navigator>


    )
}

export default FeedNavigation;