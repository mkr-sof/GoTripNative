import { NavigationContainer } from "@react-navigation/native";
import LoginNavigation from "./routes/LoginNavigation";
// import LogoutNavigation from "./routes/LogoutNavgiation";


function Navigation(){
    const token = false
    return (
        <NavigationContainer>
            <LoginNavigation />
          {/* {token ? <LoginNavigation/> : <LogoutNavigation/>} */}
        </NavigationContainer>
    )
}

export default Navigation