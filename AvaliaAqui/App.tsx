// App.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./src/pages/Home";
import ProductList from "./src/pages/ProductList";
import FeedbackForm from "./src/pages/FeedbackForm";

// Define the navigation stack parameters
// Definição dos parâmetros das rotas
type RootStackParamList = {
  Home: undefined;
  ProductList: undefined;
  FeedbackForm: { productId: number }; // Definição que FeedbackForm espera um parâmetro productId do tipo number
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ProductList" component={ProductList} />
        <Stack.Screen
          name="FeedbackForm"
          component={FeedbackForm} // Ensure correct component assignment
          options={{
            title: "Formulário de Feedback",
            headerStyle: { backgroundColor: "#f7e4b3" },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
