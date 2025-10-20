// src/screens/merchant/MerchantOrdersScreen.js
import React from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useProducts } from "../../contexts/ProductContext";

const MerchantOrdersScreen = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const { orders } = useProducts();

  const renderItem = ({ item }) => (
    <View style={[styles.order, { backgroundColor: theme.lightGray }]}>
      <Text style={[styles.product, { color: theme.primary }]}>{item.productName}</Text>
      <Text style={[styles.detail, { color: theme.textMuted }]}>Buyer: {item.buyer}</Text>
      <Text style={[styles.status, { color: item.status === "Delivered" ? theme.success : theme.accent }]}>
        {item.status}
      </Text>
      <Text style={[styles.detail, { color: theme.textMuted, marginTop: 6 }]}>₦{Number(item.amount).toLocaleString()}</Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={28} color={theme.primary} />
      </TouchableOpacity>

      <Text style={[styles.title, { color: theme.primary }]}>Orders</Text>

      <FlatList data={orders} keyExtractor={(item) => item.id} renderItem={renderItem} contentContainerStyle={{ paddingVertical: 10 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  backButton: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  title: { fontSize: 20, fontWeight: "600", marginBottom: 20 },
  order: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
  },
  product: { fontSize: 16, fontWeight: "500" },
  detail: { fontSize: 14, marginTop: 4 },
  status: { fontSize: 14, marginTop: 6, fontWeight: "500" },
});

export default MerchantOrdersScreen;
