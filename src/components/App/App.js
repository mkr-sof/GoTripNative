import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
// import { useNavigationState } from "@react-navigation/native";
// import Header from "../layouts/Header/Header";
// import Content from "../layouts/Content/Content";
// import Sidebar from "../layouts/Sidebar/Sidebar";
// import { createTestUsers, createTestPosts } from "../../services/storageService";
// import { getAllPosts } from "../../services/postService";
// import { getUsers } from "../../services/userService";
// import store from "../../store/configureStore";
import Navigation from "../../Navigation";
// import { Provider } from "react-redux";

function App() {
  // const navigationState = useNavigationState((state) => state);
  // const currentRoute = navigationState?.routes[navigationState.index]?.name;
  // const hideSidebarRoutes = ["Login", "Signup", "ForgotPassword", "EditProfile"];
  // const isAuthRoute = hideSidebarRoutes.includes(currentRoute);

  // useEffect(() => {
  //   const initializeData = async () => {
  //     const existingUsers = await getUsers();
  //     if (!existingUsers || existingUsers.length === 0) {
  //       createTestUsers();
  //       console.log("Test users created!");
  //     }

  //     const existingPosts = await getAllPosts();
  //     console.log("Existing posts:", existingPosts);
  //     if (!existingPosts || existingPosts.length === 0) {
  //       createTestPosts();
  //       console.log("Test posts created!");
  //     }
  //   };
  //   initializeData();
  // }, []);

  return (
    <>
      <Navigation/>
     {/*<Provider store={store}>
    
   <View style={styles.container}>
   
   <Header />
      <View style={styles.layout}>
        {!isAuthRoute && <Sidebar style={styles.sidebar} />}
        <View style={isAuthRoute ? styles.authContainer : styles.mainContent}>
          <Content style={styles.content} />
        </View>
      </View>
    </View> 
    </Provider>*/}
    </>
     
    

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  layout: {
    flex: 1,
    flexDirection: "row",
    padding: 10,
    gap: 20,
  },
  sidebar: {
    width: 250,
    backgroundColor: "#2f3031",
    padding: 15,
    borderRadius: 8,
  },
  mainContent: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  authContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
  },
});

export default App;