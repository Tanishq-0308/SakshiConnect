import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  TextInput,
} from "react-native";

interface Product {
  id: number;
  product_id: number;
  product_name: string;
  quantity: number;
  unit_price: number;
}

const PlaceOrderScreen = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [quantities, setQuantities] = useState<{ [key: number]: string }>({});

  // Fetch distributor inventory
  const fetchInventory = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://192.168.1.30:5000/api/distributor/1/inventory");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch inventory data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  // Place order
  const handlePlaceOrder = async (product_id: number) => {
    const enteredQty = quantities[product_id];

    if (!enteredQty || isNaN(Number(enteredQty))) {
      Alert.alert("Invalid Quantity", "Please enter a valid quantity.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("http://192.168.1.30:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          distributor_id: 1,
          orderer_id: 2,
          product_id: product_id,
          quantity: Number(enteredQty),
        }),
      });
// @ts-ignore
      console.log(response.data);
      

      if (response.ok) {
        Alert.alert("Success", "Order placed successfully!");
        setQuantities({ ...quantities, [product_id]: "" });
      } else {
        const errorData = await response.json();
        Alert.alert("Error", errorData.message || "Insufficient inventory");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong while placing the order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Distributor Inventory</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#4C6EF5" />
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={{ flex: 1 }}>
                <Text style={styles.productName}>{item.product_name}</Text>
                <Text style={styles.details}>
                  ₹{item.unit_price} • In Stock: {item.quantity}
                </Text>
              </View>

              <View style={styles.rightSection}>
                <TextInput
                  style={styles.input}
                  placeholder="Qty"
                  keyboardType="numeric"
                  value={quantities[item.product_id] || ""}
                  onChangeText={(text) =>
                    setQuantities({ ...quantities, [item.product_id]: text })
                  }
                />
                <TouchableOpacity
                  style={styles.orderButton}
                  onPress={() => handlePlaceOrder(item.product_id)}
                >
                  <Text style={styles.orderText}>Place Order</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default PlaceOrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: "700",
    color: "#212529",
    marginBottom: 16,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#DEE2E6",
  },
  productName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#212529",
  },
  details: {
    fontSize: 13,
    color: "#868E96",
    marginTop: 2,
  },
  rightSection: {
    alignItems: "center",
  },
  input: {
    width: 60,
    borderWidth: 1,
    borderColor: "#CED4DA",
    borderRadius: 8,
    textAlign: "center",
    paddingVertical: 4,
    marginBottom: 8,
  },
  orderButton: {
    backgroundColor: "#4C6EF5",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  orderText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 13,
  },
});
