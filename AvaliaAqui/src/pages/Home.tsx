// Home.tsx
import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  Home: undefined;
  ProductList: undefined;
  FeedbackForm: { productId: number };
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const Home: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Bem-Vindo(a) a Página inicial</Text>
      <Button
        title="Go to Products"
        onPress={() => navigation.navigate("ProductList")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default Home;
