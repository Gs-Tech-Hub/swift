import React from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useProducts } from "../../contexts/ProductContext";

const ManageProductsScreen = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const { products, deleteProduct } = useProducts();

  const handleDelete = (id) => {
    Alert.alert("Delete Product", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          await deleteProduct(id);
        },
      },
    ]);
  };

  const renderItem = ({ item }) => (
    <View style={[styles.item, { backgroundColor: theme.lightGray }]}>
      <View>
        <Text style={[styles.name, { color: theme.primary }]}>{item.name}</Text>
        <Text style={[styles.price, { color: theme.textMuted }]}>₦{Number(item.price).toLocaleString()}</Text>
      </View>
      <TouchableOpacity onPress={() => handleDelete(item.id)}>
        <Ionicons name="trash-outline" size={22} color={theme.danger} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={28} color={theme.primary} />
      </TouchableOpacity>

      <Text style={[styles.title, { color: theme.primary }]}>Manage Products</Text>

      <FlatList data={products} keyExtractor={(item) => item.id} renderItem={renderItem} contentContainerStyle={{ paddingVertical: 10 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  backButton: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  title: { fontSize: 20, fontWeight: "600", marginBottom: 20 },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
  },
  name: { fontSize: 16, fontWeight: "500" },
  price: { fontSize: 14, marginTop: 4 },
});

export default ManageProductsScreen;
