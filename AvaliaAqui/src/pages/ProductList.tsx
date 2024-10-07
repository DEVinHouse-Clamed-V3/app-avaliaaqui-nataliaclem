import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import axios from "axios";
import { StackNavigationProp } from "@react-navigation/stack";

// Define o tipo Product com base nos dados da API
type Product = {
  id: number;
  name: string;
  brand: string;
  price: string; // O preço é uma string conforme seu db.json
  description: string;
  image: string; // URL da imagem do produto
};

// Define os parâmetros de navegação para o Stack Navigator
type RootStackParamList = {
  Home: undefined;
  ProductList: undefined;
  FeedbackForm: { productId: number };
};

// Define o tipo de navegação para a tela ProductList
type ProductListScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "ProductList"
>;

// Define as props do componente ProductList
type Props = {
  navigation: ProductListScreenNavigationProp;
};

const ProductList: React.FC<Props> = ({ navigation }) => {
  const [products, setProducts] = useState<Product[]>([]); // Estado para armazenar produtos
  const [loading, setLoading] = useState<boolean>(true); // Estado de carregamento

  // Função para buscar produtos da API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://192.168.0.18:3000/products"); // Atualize com o IP correto da sua máquina
        setProducts(response.data); // Certifique-se de definir os produtos corretamente
        setLoading(false); // Desabilita o estado de carregamento
      } catch (error) {
        Alert.alert("Erro", "Não foi possível carregar os produtos.");
        console.error("Error fetching products:", error); // Log do erro no console
        setLoading(false); // Mesmo com erro, remover o carregamento
      }
    };

    fetchProducts();
  }, []);

  // Função para renderizar cada produto no FlatList
  const renderProduct = ({ item }: { item: Product }) => {
    console.log(item.image); // Verificar se a URL da imagem está correta
    return (
      <View style={styles.productItem}>
        {/* Exibe a imagem do produto */}
        <Image source={{ uri: item.image }} style={styles.productImage} />
        {/* Detalhes do produto */}
        <Text style={styles.productTitle}>{item.name}</Text>
        <Text>Marca: {item.brand}</Text>
        <Text>Preço: {item.price}</Text>
        <Text>Descrição: {item.description}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("FeedbackForm", { productId: item.id })
          }
        >
          <Text style={styles.buttonText}>Avaliar</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // Exibe um indicador de carregamento enquanto os produtos estão sendo buscados
  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  // Exibe uma mensagem de fallback caso a lista de produtos esteja vazia
  return (
    <View style={{ flex: 1 }}>
      {products.length === 0 ? (
        <Text style={styles.noProductsText}>Nenhum produto encontrado</Text>
      ) : (
        <FlatList
          data={products} // Dados da FlatList vem do array de produtos
          renderItem={renderProduct} // Função de renderização dos itens
          keyExtractor={(item) => item.id.toString()} // Chave única para cada item
        />
      )}
    </View>
  );
};

// Definindo os estilos usados no componente
const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  productItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
  },
  productImage: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
    marginBottom: 10,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  noProductsText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProductList;
