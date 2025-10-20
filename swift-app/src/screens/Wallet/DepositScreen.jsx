import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Alert } from "react-native";
import { ThemeContext } from "../../contexts/ThemeContext";
import { useWallet } from "../../contexts/WalletContext";
import { Ionicons } from "@expo/vector-icons";

export default function DepositScreen({ navigation }) {
  const { theme } = useContext(ThemeContext);
  const { deposit } = useWallet();

  const [method, setMethod] = useState("Bank Transfer");
  const [amount, setAmount] = useState("");
  const [pin, setPin] = useState("");
  const [showPinModal, setShowPinModal] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleConfirm = async () => {
    if (pin.length === 4) {
      setShowPinModal(false);
      // deposit
      const amt = Number(amount || 0);
      if (amt <= 0) {
        Alert.alert("Error", "Enter a valid amount");
        return;
      }
      try {
        await deposit(amt);
        setSuccess(true);
      } catch (err) {
        Alert.alert("Error", "Could not deposit");
      }
    }
  };

  const handleDone = () => {
    setMethod("Bank Transfer");
    setAmount("");
    setPin("");
    setSuccess(false);
    navigation.goBack();
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={theme.primary} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.primary }]}>Deposit</Text>
        <View style={{ width: 24 }} />
      </View>

      {success ? (
        <View style={styles.centered}>
          <Ionicons name="checkmark-circle" size={80} color={theme.success} />
          <Text style={[styles.successText, { color: theme.primary }]}>Deposit Successful</Text>
          <Text style={{ color: theme.textMuted, marginBottom: 20 }}>
            {method === "Bank Transfer" ? "Transfer completed to your wallet" : `₦${amount} deposited via ${method}`}
          </Text>
          <TouchableOpacity style={[styles.button, { backgroundColor: theme.accent }]} onPress={handleDone}>
            <Text style={styles.buttonText}>Done</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <Text style={[styles.label, { color: theme.primary }]}>Select Payment Method</Text>
          <View style={[styles.dropdown, { borderColor: theme.border }]}>
            {["Bank Transfer", "Card", "USSD"].map((m) => (
              <TouchableOpacity key={m} style={[styles.option, { backgroundColor: method === m ? theme.lightGray : "transparent" }]} onPress={() => setMethod(m)}>
                <Ionicons name={m === "Bank Transfer" ? "business" : m === "Card" ? "card" : "keypad"} size={18} color={theme.primary} />
                <Text style={[styles.optionText, { color: theme.primary }]}>{m}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {method === "Bank Transfer" ? (
            <View style={[styles.accountBox, { borderColor: theme.border }]}>
              <Text style={[styles.accountLabel, { color: theme.textMuted }]}>Bank Name</Text>
              <Text style={[styles.accountValue, { color: theme.primary }]}>Providus Bank</Text>
              <Text style={[styles.accountLabel, { color: theme.textMuted, marginTop: 10 }]}>Account Number</Text>
              <View style={styles.accountRow}>
                <Text style={[styles.accountValue, { color: theme.primary }]}>1234567890</Text>
                <Ionicons name="copy-outline" size={20} color={theme.primary} />
              </View>
              <Text style={{ color: theme.textMuted, fontSize: 12, marginTop: 8 }}>Transfer to this account and it will reflect in your wallet</Text>
            </View>
          ) : (
            <>
              <Text style={[styles.label, { color: theme.primary }]}>Enter Amount</Text>
              <TextInput placeholder="₦0.00" placeholderTextColor={theme.textMuted} keyboardType="numeric" value={amount} onChangeText={setAmount} style={[styles.input, { borderColor: theme.border, color: theme.primary }]} />
              <TouchableOpacity style={[styles.button, { backgroundColor: theme.accent }]} onPress={() => setShowPinModal(true)}>
                <Text style={styles.buttonText}>Continue</Text>
              </TouchableOpacity>
            </>
          )}
        </>
      )}

      <Modal visible={showPinModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.background }]}>
            <Text style={[styles.label, { color: theme.primary }]}>Enter Transaction PIN</Text>
            <TextInput placeholder="****" placeholderTextColor={theme.textMuted} secureTextEntry keyboardType="numeric" maxLength={4} value={pin} onChangeText={setPin} style={[styles.input, { borderColor: theme.border, color: theme.primary }]} />
            <TouchableOpacity style={[styles.button, { backgroundColor: theme.accent }]} onPress={handleConfirm}>
              <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowPinModal(false)}>
              <Text style={{ color: theme.danger, marginTop: 10 }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  topBar: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  title: { fontSize: 18, fontWeight: "600" },
  label: { fontSize: 16, fontWeight: "500", marginBottom: 10 },
  dropdown: { borderWidth: 1, borderRadius: 10, marginBottom: 20 },
  option: { flexDirection: "row", alignItems: "center", padding: 14 },
  optionText: { marginLeft: 10, fontSize: 15 },
  accountBox: { borderWidth: 1, borderRadius: 12, padding: 16, marginBottom: 20 },
  accountLabel: { fontSize: 12, fontWeight: "500" },
  accountValue: { fontSize: 16, fontWeight: "600" },
  accountRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  input: { borderWidth: 1, borderRadius: 10, padding: 12, fontSize: 18, marginBottom: 20, width: "100%" },
  button: { padding: 14, borderRadius: 10, alignItems: "center", width: "100%" },
  buttonText: { color: "#fff", fontWeight: "600", fontSize: 16 },
  centered: { flex: 1, alignItems: "center", justifyContent: "center" },
  successText: { fontSize: 22, fontWeight: "700", marginVertical: 12 },
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "center", alignItems: "center" },
  modalContent: { width: "85%", borderRadius: 12, padding: 20, elevation: 5 },
});
