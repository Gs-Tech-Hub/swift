import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
} from "react-native";
import { ThemeContext } from "../../contexts/ThemeContext";
import { useWallet } from "../../contexts/WalletContext";
import { Ionicons } from "@expo/vector-icons";

const ELECTRICITY_PROVIDERS = ["Ikeja Electric", "Eko Electric", "Abuja Disco"];
const METER_TYPES = ["Prepaid", "Postpaid"];

const TV_PROVIDERS = {
  DSTV: [
    { id: "compact", name: "Compact", price: 7900 },
    { id: "compact_plus", name: "Compact Plus", price: 12000 },
    { id: "premium", name: "Premium", price: 21000 },
  ],
  GOTV: [
    { id: "jinja", name: "Jinja", price: 1900 },
    { id: "jolli", name: "Jolli", price: 2800 },
    { id: "max", name: "Max", price: 4200 },
  ],
  Startimes: [
    { id: "nova", name: "Nova", price: 1200 },
    { id: "basic", name: "Basic", price: 1700 },
    { id: "classic", name: "Classic", price: 2500 },
  ],
};

export default function BillsScreen({ navigation }) {
  const { theme } = useContext(ThemeContext);
  const { debitForPurchase } = useWallet();
  const [activeTab, setActiveTab] = useState("electricity");

  // Electricity
  const [provider, setProvider] = useState(null);
  const [meterType, setMeterType] = useState(null);
  const [meterNumber, setMeterNumber] = useState("");
  const [elecAmount, setElecAmount] = useState("");

  // TV
  const [iuc, setIuc] = useState("");
  const [tvProvider, setTvProvider] = useState(null);
  const [tvPackage, setTvPackage] = useState(null);
  const [tvAmount, setTvAmount] = useState("");

  // PIN + Success
  const [pin, setPin] = useState("");
  const [showPinModal, setShowPinModal] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleConfirm = async () => {
    if (pin.length !== 4) return Alert.alert("Error", "Enter your 4-digit PIN");
    try {
      if (activeTab === "electricity") {
        await debitForPurchase(Number(elecAmount), `${provider} Electricity Bill`);
      } else {
        await debitForPurchase(Number(tvAmount), `${tvProvider} ${tvPackage.name}`);
      }
      setShowPinModal(false);
      setSuccess(true);
    } catch (err) {
      Alert.alert("Transaction Failed", "Insufficient funds");
    }
  };

  const handleDone = () => {
    setProvider(null);
    setMeterType(null);
    setMeterNumber("");
    setElecAmount("");
    setIuc("");
    setTvProvider(null);
    setTvPackage(null);
    setTvAmount("");
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
        <Text style={[styles.title, { color: theme.primary }]}>Bills</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.tabRow}>
        <TouchableOpacity
          style={[
            styles.tab,
            { borderBottomColor: activeTab === "electricity" ? theme.accent : "transparent" },
          ]}
          onPress={() => setActiveTab("electricity")}
        >
          <Text style={{ color: activeTab === "electricity" ? theme.accent : theme.textMuted }}>
            Electricity
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            { borderBottomColor: activeTab === "tv" ? theme.accent : "transparent" },
          ]}
          onPress={() => setActiveTab("tv")}
        >
          <Text style={{ color: activeTab === "tv" ? theme.accent : theme.textMuted }}>TV</Text>
        </TouchableOpacity>
      </View>

      {success ? (
        <View style={styles.centered}>
          <Ionicons name="checkmark-circle" size={80} color={theme.success} />
          <Text style={[styles.successText, { color: theme.primary }]}>Payment Successful</Text>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.accent }]}
            onPress={handleDone}
          >
            <Text style={styles.buttonText}>Done</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          {/* Electricity Form */}
          {activeTab === "electricity" && (
            <>
              <Text style={[styles.label, { color: theme.primary }]}>Provider</Text>
              {ELECTRICITY_PROVIDERS.map((prov) => (
                <TouchableOpacity
                  key={prov}
                  style={[
                    styles.option,
                    { borderColor: theme.border, backgroundColor: prov === provider ? theme.lightGray : "transparent" },
                  ]}
                  onPress={() => setProvider(prov)}
                >
                  <Text style={{ color: theme.primary }}>{prov}</Text>
                </TouchableOpacity>
              ))}
              <Text style={[styles.label, { color: theme.primary }]}>Meter Type</Text>
              {METER_TYPES.map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.option,
                    { borderColor: theme.border, backgroundColor: type === meterType ? theme.lightGray : "transparent" },
                  ]}
                  onPress={() => setMeterType(type)}
                >
                  <Text style={{ color: theme.primary }}>{type}</Text>
                </TouchableOpacity>
              ))}
              <TextInput
                placeholder="Meter Number"
                placeholderTextColor={theme.textMuted}
                value={meterNumber}
                onChangeText={setMeterNumber}
                style={[styles.input, { borderColor: theme.border, color: theme.primary }]}
              />
              <TextInput
                placeholder="₦0.00"
                placeholderTextColor={theme.textMuted}
                keyboardType="numeric"
                value={elecAmount}
                onChangeText={setElecAmount}
                style={[styles.input, { borderColor: theme.border, color: theme.primary }]}
              />
              <TouchableOpacity
                style={[styles.button, { backgroundColor: theme.accent }]}
                onPress={() => setShowPinModal(true)}
              >
                <Text style={styles.buttonText}>Pay</Text>
              </TouchableOpacity>
            </>
          )}

          {/* TV Form */}
          {activeTab === "tv" && (
            <>
              <TextInput
                placeholder="IUC / Smart Card Number"
                placeholderTextColor={theme.textMuted}
                value={iuc}
                onChangeText={setIuc}
                style={[styles.input, { borderColor: theme.border, color: theme.primary }]}
              />
              {Object.keys(TV_PROVIDERS).map((prov) => (
                <TouchableOpacity
                  key={prov}
                  style={[
                    styles.option,
                    { borderColor: theme.border, backgroundColor: prov === tvProvider ? theme.lightGray : "transparent" },
                  ]}
                  onPress={() => {
                    setTvProvider(prov);
                    setTvPackage(null);
                    setTvAmount("");
                  }}
                >
                  <Text style={{ color: theme.primary }}>{prov}</Text>
                </TouchableOpacity>
              ))}
              {tvProvider && (
                <>
                  {TV_PROVIDERS[tvProvider].map((pkg) => (
                    <TouchableOpacity
                      key={pkg.id}
                      style={[
                        styles.option,
                        { borderColor: theme.border, backgroundColor: pkg === tvPackage ? theme.lightGray : "transparent" },
                      ]}
                      onPress={() => {
                        setTvPackage(pkg);
                        setTvAmount(pkg.price.toString());
                      }}
                    >
                      <Text style={{ color: theme.primary }}>
                        {pkg.name} - ₦{pkg.price}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </>
              )}
              {tvPackage && (
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: theme.accent }]}
                  onPress={() => setShowPinModal(true)}
                >
                  <Text style={styles.buttonText}>Pay</Text>
                </TouchableOpacity>
              )}
            </>
          )}
        </>
      )}

      {/* PIN Modal */}
      <Modal visible={showPinModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.background }]}>
            <Text style={[styles.label, { color: theme.primary }]}>Enter Transaction PIN</Text>
            <TextInput
              placeholder="****"
              placeholderTextColor={theme.textMuted}
              secureTextEntry
              keyboardType="numeric"
              maxLength={4}
              value={pin}
              onChangeText={setPin}
              style={[styles.input, { borderColor: theme.border, color: theme.primary }]}
            />
            <TouchableOpacity
              style={[styles.button, { backgroundColor: theme.accent }]}
              onPress={handleConfirm}
            >
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
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: { fontSize: 18, fontWeight: "600" },
  tabRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
    borderBottomWidth: 1,
  },
  tab: { flex: 1, alignItems: "center", paddingVertical: 10, borderBottomWidth: 2 },
  label: { fontSize: 16, fontWeight: "500", marginTop: 15, marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
    width: "100%",
  },
  option: { padding: 12, borderWidth: 1, borderRadius: 8, marginBottom: 8 },
  button: { padding: 14, borderRadius: 10, alignItems: "center", width: "100%", marginTop: 10 },
  buttonText: { color: "#fff", fontWeight: "600", fontSize: 16 },
  centered: { flex: 1, alignItems: "center", justifyContent: "center" },
  successText: { fontSize: 22, fontWeight: "700", marginVertical: 12 },
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "center", alignItems: "center" },
  modalContent: { width: "85%", borderRadius: 12, padding: 20, elevation: 5 },
});
