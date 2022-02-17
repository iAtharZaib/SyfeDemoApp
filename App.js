import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import AppNav from "./src/navigation/AppNavigator";
import { persistor, store } from "./src/store/store";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <AppNav />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
