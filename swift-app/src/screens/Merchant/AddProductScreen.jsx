
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useTheme } from "../../contexts/ThemeContext";
import { useProducts } from "../../contexts/ProductContext";
import Button from "../../components/Button";
import InputField from "../../components/InputField";
import { useNavigation } from "@react-navigation/native";

const AddProductScreen = () => {
  const { theme } = useTheme();
  const { addProduct } = useProducts();
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  // pick image
  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission Required", "Please allow photo access to upload images.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });

    if (!result.canceled && result.assets?.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  const handleAdd = async () => {
    if (!name || !price) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    await addProduct({
      name,
      price: Number(price),
      description,
      image: image || "https://via.placeholder.com/300", // fallback image
      category: "General",
    });

    Alert.alert("Product Added", `${name} has been listed successfully.`);
    setName("");
    setPrice("");
    setDescription("");
    setImage(null);
    navigation.goBack();
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      showsVerticalScrollIndicator={false}
    >
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={28} color={theme.primary} />
      </TouchableOpacity>

      <Text style={[styles.title, { color: theme.primary }]}>
        Add New Product
      </Text>

      {/* IMAGE PICKER */}
      <TouchableOpacity
        style={[styles.imageBox, { borderColor: theme.border }]}
        onPress={pickImage}
      >
        {image ? (
          <Image source={{ uri: image }} style={styles.imagePreview} />
        ) : (
          <View style={styles.placeholder}>
            <Ionicons name="camera-outline" size={32} color={theme.textMuted} />
            <Text style={{ color: theme.textMuted, marginTop: 6 }}>
              Tap to upload image
            </Text>
          </View>
        )}
      </TouchableOpacity>

      <InputField
        label="Product Name"
        value={name}
        onChangeText={setName}
        placeholder="Enter product name"
      />
      <InputField
        label="Price"
        value={price}
        onChangeText={setPrice}
        placeholder="Enter price"
        keyboardType="numeric"
      />
      <InputField
        label="Description"
        value={description}
        onChangeText={setDescription}
        placeholder="Short product description"
        multiline
      />

      <Button
        title="Add Product"
        onPress={handleAdd}
        style={{ marginTop: theme.SPACING?.lg || 20 }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  backButton: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  title: { fontSize: 20, fontWeight: "600", marginBottom: 20 },

  imageBox: {
    height: 200,
    borderWidth: 1.2,
    borderStyle: "dashed",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    overflow: "hidden",
  },
  placeholder: { alignItems: "center" },
  imagePreview: { width: "100%", height: "100%", resizeMode: "cover" },
});

export default AddProductScreen;
