// src/screens/marketplace/MarketplaceHome.js
import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { ThemeContext } from "../../contexts/ThemeContext";
import { useProducts } from "../../contexts/ProductContext";

export default function MarketplaceHome({ navigation }) {
  const { theme } = useContext(ThemeContext);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { products } = useProducts();

  // categories: keep your categories list where it was (import if you have)
  const categories = ["Clothes", "Shoes", "Accessories"]; // replace with your real categories array if needed

  const filteredProducts = products.filter(
    (item) =>
      (selectedCategory === "All" || item.category === selectedCategory) &&
      item.name.toLowerCase().includes(search.toLowerCase())
  );

  const renderHeader = () => (
    <View style={{ backgroundColor: theme.background }}>
      <View style={styles.headerRow}>
        <Text
          style={[styles.header, { color: theme.primary, fontSize: theme.FONTS?.large || 20 }]}
        >
          Marketplace
        </Text>
      </View>

      <View
        style={[
          styles.searchContainer,
          { backgroundColor: theme.lightGray, borderColor: theme.border },
        ]}
      >
        <TextInput
          placeholder="Search products..."
          placeholderTextColor={theme.textMuted}
          value={search}
          onChangeText={setSearch}
          style={{ color: theme.primary, flex: 1 }}
        />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: 10 }}>
        {["All", ...categories].map((cat) => (
          <TouchableOpacity
            key={cat}
            onPress={() => setSelectedCategory(cat)}
            style={[
              styles.categoryChip,
              {
                backgroundColor:
                  selectedCategory === cat ? theme.accent : theme.lightGray,
              },
            ]}
          >
            <Text
              style={{
                color: selectedCategory === cat ? "#FFF" : theme.primary,
                fontWeight: "600",
              }}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <FlatList
        data={filteredProducts}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.card,
              {
                backgroundColor: theme.lightGray,
                borderColor: theme.border,
              },
            ]}
            onPress={() =>
              navigation.navigate("ProductDetailScreen", { item })
            }
          >
            <Image
              source={{ uri: item.image }}
              style={styles.image}
              resizeMode="contain"
            />
            <Text
              style={[styles.name, { color: theme.primary }]}
              numberOfLines={1}
            >
              {item.name}
            </Text>
            <Text style={{ color: theme.accent, fontWeight: "700" }}>
              ₦{Number(item.price).toLocaleString()}
            </Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={renderHeader}
        stickyHeaderIndices={[0]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "transparent",
  },
  header: { fontWeight: "700" },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 8,
    marginHorizontal: 16,
  },
  categoryChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 6,
  },
  card: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 12,
    margin: 6,
    padding: 10,
    alignItems: "center",
  },
  image: { width: 100, height: 100, marginBottom: 8 },
  name: { fontWeight: "600", textAlign: "center", marginBottom: 4 },
});
