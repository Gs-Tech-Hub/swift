
import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
  Alert,
} from "react-native";
import { ThemeContext } from "../../contexts/ThemeContext";
import { useWallet } from "../../contexts/WalletContext";
import { useProducts } from "../../contexts/ProductContext";
import { useAuth } from "../../contexts/AuthContext"; // keep if you have it

export default function ProductDetailScreen({ route, navigation }) {
  const { theme } = useContext(ThemeContext);
  const { item } = route.params;
  const { debitForPurchase } = useWallet();
  const { recordOrder } = useProducts();
  const [showModal, setShowModal] = useState(false);

  const handleBuy = async () => {
    try {
      await debitForPurchase(Number(item.price), item.name);
      await recordOrder({ productId: item.id, productName: item.name, amount: Number(item.price) });
      setShowModal(true);
    } catch (err) {
      if (err.message === "INSUFFICIENT") {
        Alert.alert("Insufficient balance", "Please deposit funds to continue", [
  { text: "Cancel", style: "cancel" },
  { text: "Deposit", onPress: () => navigation.navigate("Wallet", { screen: "DepositScreen" }) },
]);

        return;
      }
      Alert.alert("Error", err.message || "Could not complete purchase");
    }
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      showsVerticalScrollIndicator={false}
    >
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
        <Text style={{ color: theme.accent, fontWeight: "600" }}>← Back</Text>
      </TouchableOpacity>

      <View style={[styles.imageWrapper, { backgroundColor: theme.lightGray, borderColor: theme.border }]}>
        <Image source={{ uri: item.image }} style={styles.image} resizeMode="contain" />
      </View>

      <Text style={[styles.name, { color: theme.primary }]}>{item.name}</Text>
      <Text style={[styles.price, { color: theme.accent, fontSize: theme.FONTS?.large || 20 }]}>
        ₦{Number(item.price).toLocaleString()}
      </Text>

      <Text style={[styles.sectionHeader, { color: theme.primary }]}>Description</Text>
      <Text style={{ color: theme.textMuted, marginBottom: 20 }}>
        {item.description || "High-quality product available for immediate purchase."}
      </Text>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.accent }]}
        onPress={handleBuy}
      >
        <Text style={{ color: "#FFF", fontWeight: "600" }}>
          Buy Now
        </Text>
      </TouchableOpacity>

      <Modal visible={showModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.background, borderColor: theme.border }]}>
            <Text style={{ color: theme.primary, fontWeight: "700", fontSize: 18 }}>
              Purchase successful
            </Text>
            <Text style={{ color: theme.textMuted, marginVertical: 12, textAlign: "center" }}>
              ₦{Number(item.price).toLocaleString()} has been debited from your wallet.
            </Text>

            <TouchableOpacity
              style={[styles.modalBtn, { backgroundColor: theme.accent }]}
              onPress={() => {
                setShowModal(false);
                navigation.navigate("WalletHome");
              }}
            >
              <Text style={{ color: "#FFF", fontWeight: "600" }}>View Wallet</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalBtn, { backgroundColor: theme.lightGray }]}
              onPress={() => {
                setShowModal(false);
                navigation.navigate("MarketplaceHome");
              }}
            >
              <Text style={{ color: theme.primary, fontWeight: "600" }}>
                Continue Shopping
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  backBtn: { marginBottom: 10 },
  imageWrapper: {
    borderWidth: 1,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    height: 250,
    marginBottom: 20,
  },
  image: { width: "90%", height: "90%" },
  name: { fontSize: 20, fontWeight: "700", marginBottom: 6 },
  price: { fontWeight: "700", marginBottom: 20 },
  sectionHeader: { fontWeight: "600", marginBottom: 6 },
  button: {
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    borderRadius: 12,
    borderWidth: 1,
    padding: 20,
    alignItems: "center",
  },
  modalBtn: {
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
    marginTop: 10,
  },
});
