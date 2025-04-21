/**
 * @format
 */

import React from "react";
import { AppRegistry } from "react-native";
// import { Provider } from "react-redux";
// import store from "./src/store/configureStore";
// import configureRouter from "./src/routes/configureRouter";
import { name as appName } from "./app.json";
import App from "./src/components/App/App";

AppRegistry.registerComponent(appName, () => App);