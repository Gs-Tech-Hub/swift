import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useEscrow } from "../../contexts/EscrowContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Ionicons } from "@expo/vector-icons";

export default function RaiseDisputeScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { transactionId } = route.params; // corrected param name
  const { reportIssue } = useEscrow();
  const { theme } = useContext(ThemeContext);

  const [reason, setReason] = useState("");

  const handleSubmit = () => {
    if (reason.trim().length === 0) return;

    reportIssue(transactionId, reason);

    Alert.alert(
      "Dispute Submitted",
      "Your issue has been reported successfully. You’ll be notified once it’s resolved.",
      [
        {
          text: "OK",
          onPress: () => navigation.navigate("EscrowStack", { screen: "EscrowHome" }),
        },
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-outline" size={28} color={theme.primary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.primary }]}>
          Raise a Dispute
        </Text>
      </View>

      <Text style={[styles.label, { color: theme.textMuted }]}>
        Please describe the issue you encountered with this order:
      </Text>

      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: theme.lightGray,
            color: theme.text,
            borderColor: theme.border,
          },
        ]}
        placeholder="Example: Item not delivered, wrong item received, damaged goods..."
        placeholderTextColor={theme.textMuted}
        multiline
        numberOfLines={6}
        value={reason}
        onChangeText={setReason}
      />

      <TouchableOpacity
        style={[styles.submitBtn, { backgroundColor: theme.accent }]}
        onPress={handleSubmit}
      >
        <Text style={styles.btnText}>Submit Dispute</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16, paddingTop: 20 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginLeft: 12,
  },
  label: { fontSize: 15, marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    textAlignVertical: "top",
    fontSize: 15,
    marginBottom: 20,
  },
  submitBtn: {
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  btnText: { color: "#fff", fontWeight: "600", fontSize: 16 },
});
