import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Feed from "../../components/features/Feed/Feed"

const Stack = createNativeStackNavigator()

function FeedMavigation(){
    return(
<Stack.Navigator 
screenOptions={{headerShown:false}}
>
                <Stack.Screen name="Feed" component={Feed}/>
                {/* <Stack.Screen name="Home" component={Home}/> */}

    </Stack.Navigator>


    ) 
}

export default FeedMavigation