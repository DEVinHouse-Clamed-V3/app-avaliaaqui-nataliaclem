import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  StyleSheet,
  Alert,
} from "react-native";
import axios from "axios";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

// Define a type for your route parameters
type RootStackParamList = {
  Home: undefined;
  ProductList: undefined;
  FeedbackForm: { productId: number }; // Pass the productId in FeedbackForm
};

// Define prop types for navigation and route
type FeedbackFormScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "FeedbackForm"
>;

type FeedbackFormScreenRouteProp = RouteProp<
  RootStackParamList,
  "FeedbackForm"
>;

type Props = {
  navigation: FeedbackFormScreenNavigationProp;
  route: FeedbackFormScreenRouteProp;
};

const FeedbackForm: React.FC<Props> = ({ route, navigation }) => {
  const { productId } = route.params;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [experience, setExperience] = useState<
    "Feliz" | "Bom" | "Médio" | "Ruim"
  >();
  const [recommend, setRecommend] = useState<boolean | null>(null); // Inicialmente nulo, sem escolha

  const handleSubmit = async () => {
    if (!name || !email || !feedback || !experience || recommend === null) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    const feedbackData = {
      id: Date.now(),
      productId,
      name,
      email,
      feedback,
      experience,
      recommend,
    };

    try {
      // Simulando a requisição POST com axios
      const response = await axios.post(
        "http://192.168.0.18:3000/evaluations",
        feedbackData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      Alert.alert("Sucesso", "Feedback enviado com sucesso!");
      navigation.navigate("Home"); // Voltar para a tela inicial após sucesso
    } catch (error) {
      Alert.alert("Erro", "Ocorreu um erro ao enviar o feedback.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nos dê seu Feedback</Text>
      <TextInput
        style={styles.input}
        placeholder="Seu nome"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Seu e-mail"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Descreva sua experiência"
        value={feedback}
        onChangeText={setFeedback}
      />

      {/* Opções de Experiência */}
      <Text style={styles.label}>Como foi sua experiência?</Text>
      <View style={styles.experienceButtons}>
        {["Feliz", "Bom", "Médio", "Ruim"].map((exp) => (
          <TouchableOpacity
            key={exp}
            style={[
              styles.optionButton,
              experience === exp ? styles.selectedOption : {},
            ]}
            onPress={() =>
              setExperience(exp as "Feliz" | "Bom" | "Médio" | "Ruim")
            }
          >
            <Text style={styles.optionText}>{exp}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Opções de Recomendação */}
      <Text style={styles.label}>Recomendaria para outras pessoas?</Text>
      <View style={styles.recommendButtons}>
        {/* Botão "Sim" */}
        <TouchableOpacity
          style={[
            styles.optionButton,
            recommend === true ? styles.selectedOption : {},
          ]}
          onPress={() => setRecommend(true)}
        >
          <Text style={styles.optionText}>Sim</Text>
        </TouchableOpacity>

        {/* Botão "Não" */}
        <TouchableOpacity
          style={[
            styles.optionButton,
            recommend === false ? styles.selectedOption : {},
          ]}
          onPress={() => setRecommend(false)}
        >
          <Text style={styles.optionText}>Não</Text>
        </TouchableOpacity>
      </View>

      <Button title="Enviar Feedback" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  experienceButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  optionButton: {
    padding: 10,
    borderColor: "#007bff",
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  selectedOption: {
    backgroundColor: "#007bff",
  },
  optionText: {
    color: "#000",
  },
  recommendButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
});

export default FeedbackForm;
