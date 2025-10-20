import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import Svg, { Circle } from "react-native-svg";
import { Ionicons } from "@expo/vector-icons";
import { ThemeContext } from "../../contexts/ThemeContext";
import { useWallet } from "../../contexts/WalletContext";
import { useLoan } from "../../contexts/LoanContext";

export default function CreditScreen({ navigation }) {
  const { theme } = useContext(ThemeContext);
  const { balance, deposit, withdraw, pushNotification } = useWallet();
  const { outstandingLoan, borrowLoan, repayLoan } = useLoan();

  const [activeTab, setActiveTab] = useState("Borrow");
  const [loanAmount, setLoanAmount] = useState("");
  const [duration, setDuration] = useState("14 days");
  const [repayAmount, setRepayAmount] = useState("");
  const [showPinModal, setShowPinModal] = useState(false);

  const creditScore = 720;
  const eligibleAmount = 50000;

  const radius = 50;
  const strokeWidth = 8;
  const normalizedRadius = radius - strokeWidth * 0.5;
  const circumference = normalizedRadius * 2 * Math.PI;
  const progress = (creditScore / 850) * circumference;

  const getScoreLabel = (score) => {
    if (score < 580) return { label: "Poor", color: theme.danger };
    if (score < 670) return { label: "Fair", color: "#FFA500" };
    if (score < 740) return { label: "Good", color: theme.success };
    if (score < 800) return { label: "Very Good", color: theme.accent };
    return { label: "Excellent", color: theme.primary };
  };
  const scoreLabel = getScoreLabel(creditScore);

  const handleConfirm = async () => {
    setShowPinModal(false);
    try {
      if (activeTab === "Borrow") {
        if (!loanAmount) return Alert.alert("Error", "Enter loan amount");
        const amount = Number(loanAmount);
        if (amount > eligibleAmount)
          return Alert.alert("Limit Exceeded", "You can’t borrow above your eligible limit");

        await borrowLoan(amount, duration);
        await deposit(amount, "Loan credited");
        await pushNotification(`Loan of ₦${amount.toLocaleString()} credited to your wallet`);
        Alert.alert("Success", `₦${amount.toLocaleString()} credited successfully`);
        setLoanAmount("");
      }

      if (activeTab === "Repay") {
        if (!repayAmount) return Alert.alert("Error", "Enter repayment amount");
        const amount = Number(repayAmount);
        if (amount > balance)
          return Alert.alert("Insufficient Funds", "Top up your wallet to repay");
        if (amount > outstandingLoan)
          return Alert.alert("Invalid Amount", "You can’t repay more than you owe");

        await withdraw(amount, "Loan repayment");
        await repayLoan(amount);
        await pushNotification(`₦${amount.toLocaleString()} repaid towards your loan`);
        Alert.alert("Success", `₦${amount.toLocaleString()} repaid successfully`);
        setRepayAmount("");
      }
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={theme.primary} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.primary }]}>Loan</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Credit Score Card */}
      <View
        style={[
          styles.card,
          { backgroundColor: theme.lightGray, borderColor: theme.border },
        ]}
      >
        <Svg height={radius * 2} width={radius * 2}>
          <Circle
            stroke={theme.border}
            fill="transparent"
            strokeWidth={strokeWidth}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <Circle
            stroke={scoreLabel.color}
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={`${progress} ${circumference}`}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
        </Svg>

        <View style={styles.scoreTextWrapper}>
          <Text style={[styles.scoreValue, { color: theme.primary }]}>
            {creditScore}
          </Text>
          <Text style={{ color: scoreLabel.color, fontWeight: "600" }}>
            {scoreLabel.label}
          </Text>
        </View>

        <Text
          style={{
            marginTop: theme.SPACING.md,
            color: theme.textMuted,
            fontSize: theme.FONTS.medium,
          }}
        >
          Eligible Loan: ₦{eligibleAmount.toLocaleString()}
        </Text>
        <Text
          style={{
            color: theme.textMuted,
            marginTop: 4,
          }}
        >
          Outstanding Loan: ₦{outstandingLoan.toLocaleString()}
        </Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabRow}>
        {["Borrow", "Repay"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              {
                backgroundColor:
                  activeTab === tab ? theme.accent : theme.lightGray,
              },
            ]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={{
                color: activeTab === tab ? "#FFF" : theme.primary,
                fontWeight: "600",
              }}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Borrow */}
      {activeTab === "Borrow" && (
        <View style={styles.form}>
          <Text style={[styles.label, { color: theme.primary }]}>Loan Amount</Text>
          <TextInput
            value={loanAmount}
            onChangeText={setLoanAmount}
            placeholder="Enter amount"
            keyboardType="numeric"
            style={[styles.input, { borderColor: theme.border, color: theme.primary }]}
            placeholderTextColor={theme.textMuted}
          />

          <Text style={[styles.label, { color: theme.primary }]}>Duration</Text>
          <TouchableOpacity
            style={[styles.input, { borderColor: theme.border, justifyContent: "center" }]}
            onPress={() =>
              setDuration(duration === "14 days" ? "30 days" : "14 days")
            }
          >
            <Text style={{ color: theme.primary }}>{duration}</Text>
          </TouchableOpacity>

          {loanAmount !== "" && (
            <View style={{ marginTop: theme.SPACING.md }}>
              <Text style={{ color: theme.textMuted }}>
                Interest: ₦{(parseInt(loanAmount) * 0.05).toFixed(0)}
              </Text>
              <Text style={{ color: theme.textMuted }}>
                Total Repayable: ₦
                {(parseInt(loanAmount) + parseInt(loanAmount) * 0.05).toFixed(0)}
              </Text>
            </View>
          )}

          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.accent }]}
            onPress={() => setShowPinModal(true)}
          >
            <Text style={{ color: "#FFF", fontWeight: "600" }}>Confirm</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Repay */}
      {activeTab === "Repay" && (
        <View style={styles.form}>
          <Text style={{ color: theme.textMuted }}>
            Outstanding Loan: ₦{outstandingLoan.toLocaleString()}
          </Text>
          <TextInput
            value={repayAmount}
            onChangeText={setRepayAmount}
            placeholder="Enter amount"
            keyboardType="numeric"
            style={[styles.input, { borderColor: theme.border, color: theme.primary }]}
            placeholderTextColor={theme.textMuted}
          />
          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.secondary }]}
            onPress={() => setShowPinModal(true)}
          >
            <Text style={{ color: "#FFF", fontWeight: "600" }}>Repay</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* PIN Modal */}
      <Modal visible={showPinModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalContent,
              { backgroundColor: theme.background, borderColor: theme.border },
            ]}
          >
            <Text style={{ color: theme.primary, fontWeight: "600" }}>
              Enter PIN to Confirm
            </Text>
            <TextInput
              placeholder="••••"
              secureTextEntry
              keyboardType="numeric"
              style={[styles.input, { borderColor: theme.border, color: theme.primary }]}
              placeholderTextColor={theme.textMuted}
            />
            <TouchableOpacity
              style={[styles.button, { backgroundColor: theme.accent }]}
              onPress={handleConfirm}
            >
              <Text style={{ color: "#FFF", fontWeight: "600" }}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  card: {
    alignItems: "center",
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 20,
  },
  scoreTextWrapper: {
    position: "absolute",
    top: "38%",
    alignItems: "center",
    justifyContent: "center",
  },
  scoreValue: { fontSize: 22, fontWeight: "700" },
  tabRow: { flexDirection: "row", marginBottom: 16 },
  tab: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 4,
  },
  form: { marginTop: 16 },
  label: { marginBottom: 6, fontWeight: "600" },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  button: {
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  topBar: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 20,
},
title: {
  fontSize: 18,
  fontWeight: "600",
},
  modalContent: {
    width: "80%",
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
  },
});
