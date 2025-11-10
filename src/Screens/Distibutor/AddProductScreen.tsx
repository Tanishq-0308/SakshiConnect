import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Switch,
  ScrollView,
  StyleSheet,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../Navigation/types';
type NavigationProp = NativeStackNavigationProp<MainStackParamList>;
const AddProductScreen = () => {
    const navigation = useNavigation<NavigationProp>();
  const [stock, setStock] = useState(120);
  const [showInOffers, setShowInOffers] = useState(true);
  const [price, setPrice] = useState("199");
  const [moq, setMoq] = useState("10");
  const [leadTime, setLeadTime] = useState("2–4 days");
  const [sellerNote, setSellerNote] = useState("");
  const [paymentMode, setPaymentMode] = useState("COD");

  const handleStockChange = (type: "inc" | "dec") => {
    if (type === "dec" && stock > 0) setStock(stock - 1);
    else if (type === "inc") setStock(stock + 1);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>Add Product</Text>
        <TouchableOpacity onPress={()=> navigation.goBack()}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>

      {/* Catalogue Selection */}
      <View style={styles.card}>
        <TouchableOpacity style={styles.catalogueRow}>
          <View style={styles.catalogueLeft}>
            <Ionicons
              name="shapes-outline"
              size={20}
              color="#2563EB"
              style={{ marginRight: 10 }}
            />
            <View>
              <Text style={styles.catalogueTitle}>Select from catalogue</Text>
              <Text style={styles.catalogueSubtitle}>Reusable Pads - 8 pack</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward-outline" size={20} color="#2563EB" />
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.linkText}>Request new product</Text>
        </TouchableOpacity>
      </View>

      {/* Stock on hand */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Stock on hand</Text>
        <View style={styles.stockRow}>
          <TouchableOpacity
            style={styles.counterButton}
            onPress={() => handleStockChange("dec")}
          >
            <Text style={styles.counterText}>–</Text>
          </TouchableOpacity>
          <Text style={styles.stockValue}>{stock}</Text>
          <TouchableOpacity
            style={[styles.counterButton, { backgroundColor: "#2563EB" }]}
            onPress={() => handleStockChange("inc")}
          >
            <Text style={[styles.counterText, { color: "#fff" }]}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Offer Details */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Offer shown to outlets</Text>

        <TextInput
          style={styles.input}
          value={price}
          onChangeText={setPrice}
          placeholder="Price (₹/pack)"
          keyboardType="numeric"
        />

        <TextInput
          style={styles.input}
          value={moq}
          onChangeText={setMoq}
          placeholder="MOQ"
          keyboardType="numeric"
        />

        <TextInput
          style={styles.input}
          value={leadTime}
          onChangeText={setLeadTime}
          placeholder="Lead time"
        />

        <Text style={styles.label}>Service areas</Text>
        <View style={styles.tagRow}>
          <View style={styles.tagSelected}>
            <Text style={styles.tagTextSelected}>Mumbai</Text>
          </View>
          <View style={styles.tagSelected}>
            <Text style={styles.tagTextSelected}>Pune</Text>
          </View>
          <View style={styles.tagSelected}>
            <Text style={styles.tagTextSelected}>Delhi NCR</Text>
          </View>
        </View>

        <Text style={styles.label}>Payment modes</Text>
        <View style={styles.tagRow}>
          <TouchableOpacity
            style={[
              styles.tag,
              paymentMode === "COD" && styles.tagSelected,
            ]}
            onPress={() => setPaymentMode("COD")}
          >
            <Text
              style={[
                styles.tagText,
                paymentMode === "COD" && styles.tagTextSelected,
              ]}
            >
              COD
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tag,
              paymentMode === "UPI" && styles.tagSelected,
            ]}
            onPress={() => setPaymentMode("UPI")}
          >
            <Text
              style={[
                styles.tagText,
                paymentMode === "UPI" && styles.tagTextSelected,
              ]}
            >
              UPI
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.switchRow}>
          <Text style={styles.label}>Show in offers</Text>
          <Switch
            value={showInOffers}
            onValueChange={setShowInOffers}
            trackColor={{ false: "#D1D5DB", true: "#93C5FD" }}
            thumbColor={showInOffers ? "#2563EB" : "#f4f3f4"}
          />
        </View>

        <Text style={styles.label}>Seller note (optional)</Text>
        <TextInput
          style={[styles.input, styles.noteBox]}
          placeholder="Add a short note for outlets..."
          multiline
          numberOfLines={3}
          value={sellerNote}
          onChangeText={setSellerNote}
        />
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveText}>Save Product</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    padding: 16,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#111827",
  },
  cancelText: {
    fontSize: 16,
    color: "#2563EB",
    fontWeight: "500",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  catalogueRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  catalogueLeft: { flexDirection: "row", alignItems: "center" },
  catalogueTitle: { fontSize: 15, fontWeight: "600", color: "#111" },
  catalogueSubtitle: { fontSize: 12, color: "#6B7280" },
  linkText: {
    color: "#2563EB",
    marginTop: 10,
    fontSize: 13,
    fontWeight: "500",
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 10,
  },
  stockRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  counterButton: {
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
  },
  counterText: { fontSize: 20, fontWeight: "700", color: "#111" },
  stockValue: { fontSize: 22, fontWeight: "700", marginHorizontal: 16 },
  input: {
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 10,
    marginTop: 10,
    fontSize: 14,
  },
  label: { marginTop: 16, marginBottom: 6, color: "#6B7280", fontSize: 13 },
  tagRow: { flexDirection: "row", flexWrap: "wrap" },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: "#E5E7EB",
    marginRight: 8,
    marginBottom: 8,
  },
  tagSelected: {
    backgroundColor: "#DBEAFE",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: { color: "#111827" },
  tagTextSelected: { color: "#2563EB", fontWeight: "600" },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  },
  noteBox: { height: 80, textAlignVertical: "top" },
  saveButton: {
    backgroundColor: "#2563EB",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginBottom: 30,
  },
  saveText: { color: "#fff", fontWeight: "600", fontSize: 16 },
});
