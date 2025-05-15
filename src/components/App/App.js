import React from "react";
import store from "../../store/configureStore";
import Navigation from "../../routes/Navigation";
import { Provider } from "react-redux";

function App() {
  return (
    <>
      <Provider store={store}>
        <Navigation />
      </Provider>
    </>
  );
}

export default App;