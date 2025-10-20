import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useTheme } from "../../contexts/ThemeContext";
import { useWallet } from "../../contexts/WalletContext";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const WalletHome = ({ navigation }) => {
  const { theme, isDarkMode, toggleTheme } = useTheme();
  const { balance, transactions, notifications, unreadCount } = useWallet();

  const username = "User";

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]} contentContainerStyle={{ padding: theme.SPACING?.md || 16 }}>
      <View style={styles.headerRow}>
        <Text style={[styles.greeting, { color: theme.primary }]}>Hi, {username}</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={toggleTheme} style={styles.iconButton}>
            <Ionicons name={isDarkMode ? "moon-outline" : "sunny-outline"} size={24} color={theme.primary} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("NotificationScreen")} style={styles.iconButton}>
            <Ionicons name="notifications-outline" size={24} color={theme.primary} />
            {unreadCount > 0 && (
              <View style={{ position: "absolute", right: -4, top: -6, backgroundColor: theme.danger, borderRadius: 99, paddingHorizontal: 6 }}>
                <Text style={{ color: "#fff", fontSize: 11 }}>{unreadCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <View style={[styles.balanceCard, { backgroundColor: theme.secondary }]}>
        <View style={styles.balanceRow}>
          <Text style={[styles.balanceLabel, { color: theme.lightGray }]}>Available Balance</Text>
          <Ionicons name="wallet-outline" size={24} color={theme.background} />
        </View>
        <Text style={[styles.balanceValue, { color: theme.background }]}>₦{Number(balance).toLocaleString()}</Text>
      </View>

      <View style={[styles.sectionCard, { backgroundColor: theme.lightGray, borderColor: theme.border }]}>
        <View style={styles.row}>
          <ActionButton title="Deposit" icon="arrow-down-circle-outline" color={theme.success} onPress={() => navigation.navigate("DepositScreen")} />
          <ActionButton title="Withdraw" icon="arrow-up-circle-outline" color={theme.danger} onPress={() => navigation.navigate("WithdrawScreen")} />
          <ActionButton title="Transfer" icon="swap-horizontal-outline" color={theme.primary} onPress={() => navigation.navigate("TransferScreen")} />
        </View>
      </View>

      <View style={[styles.sectionCard, { backgroundColor: theme.lightGray, borderColor: theme.border }]}>
        <View style={styles.rowWrap}>
          <ActionButton title="Airtime" icon="call-outline" color={theme.primary} onPress={() => navigation.navigate("AirtimeScreen")} />
          <ActionButton title="Data" icon="wifi-outline" color={theme.primary} onPress={() => navigation.navigate("DataScreen")} />
          <ActionButton title="Credit" icon="cash-outline" color={theme.accent} onPress={() => navigation.navigate("CreditScreen")} />
          <ActionButton title="Bills" icon="receipt-outline" color={theme.secondary} onPress={() => navigation.navigate("BillsScreen")} />
        </View>
      </View>

      <View style={[styles.sectionCard, { backgroundColor: theme.lightGray, borderColor: theme.border }]}>
        <View style={styles.transactionsHeader}>
          <Text style={[styles.sectionTitle, { color: theme.primary }]}>Recent Transactions</Text>
          <TouchableOpacity onPress={() => navigation.navigate("HistoryScreen")}>
            <Text style={{ color: theme.accent, fontWeight: "600" }}>View All</Text>
          </TouchableOpacity>
        </View>

        {transactions.length > 0 ? (
          transactions.slice(0, 3).map((txn) => (
            <TouchableOpacity key={txn.id} style={styles.transactionItem} onPress={() => navigation.navigate("HistoryScreen")}>
              <View style={styles.txnLeft}>
                <View style={[styles.txnIconContainer, { backgroundColor: txn.type === "Deposit" ? theme.success + "20" : txn.type === "Withdraw" ? theme.danger + "20" : theme.primary + "20" }]}>
                  <MaterialIcons
                    name={txn.type === "Deposit" ? "arrow-downward" : txn.type === "Withdraw" ? "arrow-upward" : "swap-horiz"}
                    size={20}
                    color={txn.type === "Deposit" ? theme.success : txn.type === "Withdraw" ? theme.danger : theme.primary}
                  />
                </View>
                <View>
                  <Text style={[styles.txnType, { color: theme.primary }]}>{txn.type}</Text>
                  <Text style={[styles.txnDate, { color: theme.textMuted }]}>{txn.date || "Today"}</Text>
                </View>
              </View>

              <Text style={[styles.txnAmount, { color: txn.type === "Deposit" ? theme.success : txn.type === "Withdraw" ? theme.danger : theme.primary }]}>
                {txn.type === "Deposit" ? "+" : "-"}₦{Number(txn.amount).toLocaleString()}
              </Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={{ color: theme.textMuted, marginTop: 8, textAlign: "center" }}>No recent transactions</Text>
        )}
      </View>
    </ScrollView>
  );
};

const ActionButton = ({ title, icon, color, onPress }) => {
  const { theme } = useTheme ? useTheme() : { theme: {} };
  return (
    <TouchableOpacity style={styles.actionButton} onPress={onPress}>
      <Ionicons name={icon} size={28} color={color} />
      <Text style={[styles.actionText, { color: theme.primary }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  greeting: { fontSize: 20, fontWeight: "600" },
  headerIcons: { flexDirection: "row" },
  iconButton: { marginLeft: 16 },
  balanceCard: { padding: 20, borderRadius: 16, marginBottom: 20 },
  balanceRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  balanceLabel: { fontSize: 16, fontWeight: "500" },
  balanceValue: { fontSize: 28, fontWeight: "bold", marginTop: 6 },
  sectionCard: { borderRadius: 12, padding: 16, marginBottom: 20, borderWidth: 1 },
  sectionTitle: { fontSize: 16, fontWeight: "600" },
  row: { flexDirection: "row", justifyContent: "space-around" },
  rowWrap: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
  actionButton: { alignItems: "center", margin: 12, width: 70 },
  actionText: { fontSize: 14, marginTop: 6, fontWeight: "500", textAlign: "center" },
  transactionsHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  transactionItem: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 10, borderBottomWidth: 0.5 },
  txnLeft: { flexDirection: "row", alignItems: "center" },
  txnIconContainer: { width: 36, height: 36, borderRadius: 18, justifyContent: "center", alignItems: "center", marginRight: 12 },
  txnType: { fontSize: 15, fontWeight: "600" },
  txnDate: { fontSize: 12 },
  txnAmount: { fontWeight: "700", fontSize: 15 },
});

export default WalletHome;
