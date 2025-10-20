// src/screens/wallet/HistoryScreen.js
import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { useWallet } from "../../contexts/WalletContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import { MaterialIcons } from "@expo/vector-icons";
import { useContext } from "react";
import { useNavigation } from "@react-navigation/native";

export default function HistoryScreen() {
  const { transactions } = useWallet();
  const { theme } = useContext(ThemeContext);
  const [filter, setFilter] = useState("All");
  const navigation = useNavigation();

  const filteredTransactions = filter === "All" ? transactions : transactions.filter((t) => t.type === filter);

  const grouped = filteredTransactions.reduce((acc, txn) => {
    const date = txn.date ? txn.date.split(",")[0] : "Today";
    if (!acc[date]) acc[date] = [];
    acc[date].push(txn);
    return acc;
  }, {});

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.backButton, { backgroundColor: theme.lightGray || "#f0f0f0" }]}>
          <MaterialIcons name="arrow-back" size={22} color={theme.primary} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.primary }]}>Transaction History</Text>
        <View style={{ width: 32 }} />
      </View>

      <View style={styles.tabRow}>
        {["All", "Deposit", "Withdraw", "Transfer", "Purchase"].map((tab) => (
          <TouchableOpacity key={tab} style={[styles.tabButton, { backgroundColor: filter === tab ? theme.primary : theme.lightGray }]} onPress={() => setFilter(tab)}>
            <Text style={{ color: filter === tab ? theme.background : theme.primary, fontWeight: "600" }}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        {Object.keys(grouped).length > 0 ? (
          Object.keys(grouped).map((date) => (
            <View key={date} style={styles.dateGroup}>
              <Text style={[styles.dateLabel, { color: theme.textMuted }]}>{date}</Text>
              {grouped[date].map((txn) => (
                <View key={txn.id} style={[styles.txnRow, { borderBottomColor: theme.border }]}>
                  <View style={styles.txnLeft}>
                    <View style={[styles.txnIconContainer, { backgroundColor: txn.type === "Deposit" ? theme.success + "20" : txn.type === "Withdraw" ? theme.danger + "20" : theme.primary + "20" }]}>
                      <MaterialIcons name={txn.type === "Deposit" ? "arrow-downward" : txn.type === "Withdraw" ? "arrow-upward" : "swap-horiz"} size={20} color={txn.type === "Deposit" ? theme.success : txn.type === "Withdraw" ? theme.danger : theme.primary} />
                    </View>
                    <View>
                      <Text style={[styles.txnType, { color: theme.primary }]}>{txn.type}</Text>
                      <Text style={[styles.txnNote, { color: theme.textMuted }]}>{txn.note || "Transaction completed"}</Text>
                    </View>
                  </View>
                  <Text style={[styles.txnAmount, { color: txn.type === "Deposit" ? theme.success : txn.type === "Withdraw" ? theme.danger : theme.primary }]}>{txn.type === "Deposit" ? "+" : "-"}₦{Number(txn.amount).toLocaleString()}</Text>
                </View>
              ))}
            </View>
          ))
        ) : (
          <Text style={{ color: theme.textMuted, textAlign: "center", marginTop: 40, fontSize: 15 }}>No transactions found</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 10 },
  headerRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 16 },
  backButton: { width: 32, height: 32, borderRadius: 16, justifyContent: "center", alignItems: "center" },
  title: { fontWeight: "700", fontSize: 18, textAlign: "center", flex: 1 },
  tabRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 16 },
  tabButton: { flex: 1, alignItems: "center", paddingVertical: 8, marginHorizontal: 4, borderRadius: 8 },
  dateGroup: { marginBottom: 24 },
  dateLabel: { marginBottom: 10, fontSize: 13, fontWeight: "500" },
  txnRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 12, borderBottomWidth: 0.5 },
  txnLeft: { flexDirection: "row", alignItems: "center" },
  txnIconContainer: { width: 40, height: 40, borderRadius: 20, justifyContent: "center", alignItems: "center", marginRight: 12 },
  txnType: { fontSize: 15, fontWeight: "600" },
  txnNote: { fontSize: 12 },
  txnAmount: { fontWeight: "700", fontSize: 15 },
});
