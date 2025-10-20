import React, { useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons, MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../contexts/ThemeContext";
import { WalletContext } from "../../contexts/WalletContext";
import { FinanceContext } from "../../contexts/FinanceContext";


export default function FinanceHome() {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const { balance: walletBalance } = useContext(WalletContext);
  const { availableCredit, savingsBalance, loanBalance, interestEarned } =
    useContext(FinanceContext) || {};

  // Combine total available amount (wallet + savings + credit)
  const totalAvailable =
    (walletBalance || 0) + (savingsBalance || 0) + (availableCredit || 0);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      showsVerticalScrollIndicator={false}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.primary }]}>Finance</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("NotificationScreen")}
        >
          <Ionicons
            name="notifications-outline"
            size={24}
            color={theme.primary}
          />
        </TouchableOpacity>
      </View>

      {/* OVERVIEW CARD */}
      <View style={[styles.overviewCard, { backgroundColor: theme.card }]}>
        <View style={styles.balanceRow}>
          <View>
            <Text style={[styles.label, { color: theme.textMuted }]}>
              Total Available Balance
            </Text>
            <Text style={[styles.balance, { color: theme.primary }]}>
              ₦{totalAvailable.toLocaleString()}
            </Text>
          </View>
          <Ionicons name="cash-outline" size={28} color={theme.accent} />
        </View>

        <View style={styles.subRow}>
          <View>
            <Text style={[styles.smallLabel, { color: theme.textMuted }]}>
              Wallet Balance
            </Text>
            <Text style={[styles.smallValue, { color: theme.success }]}>
              ₦{walletBalance?.toLocaleString() || "0"}
            </Text>
          </View>
          <View>
            <Text style={[styles.smallLabel, { color: theme.textMuted }]}>
              Savings Balance
            </Text>
            <Text style={[styles.smallValue, { color: theme.primary }]}>
              ₦{savingsBalance?.toLocaleString() || "0"}
            </Text>
          </View>
          <View>
            <Text style={[styles.smallLabel, { color: theme.textMuted }]}>
              Loan Balance
            </Text>
            <Text style={[styles.smallValue, { color: theme.warning }]}>
              ₦{loanBalance?.toLocaleString() || "0"}
            </Text>
          </View>
        </View>
      </View>

      {/* QUICK ACTIONS */}
      <Text style={[styles.sectionTitle, { color: theme.primary }]}>
        Quick Access
      </Text>
      <View style={styles.quickRow}>
        <QuickTile
          title="Credit / Loans"
          icon="card-outline"
          color={theme.accent}
          onPress={() => navigation.navigate("Credit")}
        />
        <QuickTile
          title="Savings"
          icon="wallet-outline"
          color={theme.primary}
          onPress={() => navigation.navigate("Savings")}
        />
        <QuickTile
          title="Insurance"
          icon="medkit-outline"
          color={theme.secondary}
          onPress={() => navigation.navigate("InsuranceHome")}
        />
        <QuickTile
          title="Goals"
          icon="flag-outline"
          color={theme.success}
          onPress={() => navigation.navigate("Goals")}
        />
      </View>

      {/* FEATURED OFFER */}
      <TouchableOpacity
        style={[
          styles.offerCard,
          { backgroundColor: theme.surface, borderColor: theme.border },
        ]}
        onPress={() => navigation.navigate("Credit")}
      >
        <Image
          source={{
            uri: "https://cdn.dribbble.com/userupload/42849701/file/original-92b86d1f0b4d07d3e29e884d2fa90893.jpg?resize=800x600",
          }}
          style={styles.offerImage}
        />
        <View style={styles.offerTextContainer}>
          <Text style={[styles.offerTitle, { color: theme.primary }]}>
            Low-Interest Loan
          </Text>
          <Text style={[styles.offerSub, { color: theme.textMuted }]}>
            Get loans up to ₦500,000 with as low as 5.9% APR.
          </Text>
          <Text
            style={[styles.offerAction, { color: theme.accent }]}
            onPress={() => navigation.navigate("Credit")}
          >
            Apply Now
          </Text>
        </View>
      </TouchableOpacity>

      {/* FINANCIAL INSIGHTS */}
      <View style={[styles.insightCard, { backgroundColor: theme.card }]}>
        <Feather name="trending-up" size={22} color={theme.accent} />
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={[styles.insightTitle, { color: theme.primary }]}>
            Your savings grew by 15% this month!
          </Text>
          <Text style={[styles.insightSub, { color: theme.textMuted }]}>
            Keep up the consistency and reach your target faster.
          </Text>
        </View>
      </View>

      {/* RECENT ACTIVITY */}
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: theme.primary }]}>
          Recent Activity
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("HistoryScreen")}>
          <Text style={{ color: theme.accent, fontWeight: "600" }}>
            View All
          </Text>
        </TouchableOpacity>
      </View>

      <ActivityItem
        icon="arrow-down"
        title="Savings Deposit"
        time="Today • 11:45 AM"
        amount="+₦10,000"
        color={theme.success}
      />
      <ActivityItem
        icon="arrow-up"
        title="Loan Repayment"
        time="Yesterday • 2:30 PM"
        amount="-₦5,000"
        color={theme.danger}
      />
      <ActivityItem
        icon="arrow-down"
        title="Interest Earned"
        time="Oct 16 • 9:15 AM"
        amount={`+₦${interestEarned?.toLocaleString() || "0"}`}
        color={theme.success}
      />

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

// Reusable Quick Tile
const QuickTile = ({ title, icon, color, onPress }) => (
  <TouchableOpacity style={styles.tile} onPress={onPress}>
    <Ionicons name={icon} size={24} color={color} />
    <Text style={styles.tileText}>{title}</Text>
  </TouchableOpacity>
);

// Reusable Activity Item
const ActivityItem = ({ icon, title, time, amount, color }) => {
  const { theme } = useTheme();
  return (
    <View style={[styles.activityItem, { borderBottomColor: theme.border }]}>
      <MaterialCommunityIcons name={icon} size={22} color={color} />
      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text style={[styles.activityTitle, { color: theme.primary }]}>
          {title}
        </Text>
        <Text style={[styles.activityTime, { color: theme.textMuted }]}>
          {time}
        </Text>
      </View>
      <Text style={[styles.activityAmount, { color }]}>{amount}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  title: { fontSize: 24, fontWeight: "700" },
  overviewCard: {
    marginHorizontal: 20,
    marginTop: 20,
    padding: 20,
    borderRadius: 16,
  },
  balanceRow: { flexDirection: "row", justifyContent: "space-between" },
  label: { fontSize: 13, fontWeight: "500" },
  balance: { fontSize: 30, fontWeight: "700", marginTop: 6 },
  subRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  smallLabel: { fontSize: 12, fontWeight: "500" },
  smallValue: { fontSize: 16, fontWeight: "600", marginTop: 4 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginHorizontal: 20,
    marginTop: 30,
    marginBottom: 14,
  },
  quickRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 24,
  },
  tile: { alignItems: "center", width: 80 },
  tileText: {
    marginTop: 8,
    fontSize: 13,
    fontWeight: "500",
    textAlign: "center",
  },
  offerCard: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 12,
    marginHorizontal: 20,
    marginBottom: 20,
    overflow: "hidden",
  },
  offerImage: { width: 80, height: 80, borderRadius: 8, margin: 10 },
  offerTextContainer: { flex: 1, paddingRight: 10 },
  offerTitle: { fontSize: 16, fontWeight: "600", marginBottom: 4 },
  offerSub: { fontSize: 13 },
  offerAction: { fontSize: 14, fontWeight: "600", marginTop: 8 },
  insightCard: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  insightTitle: { fontSize: 15, fontWeight: "600" },
  insightSub: { fontSize: 13, marginTop: 4 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 12,
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  activityTitle: { fontSize: 15, fontWeight: "600" },
  activityTime: { fontSize: 12, marginTop: 2 },
  activityAmount: { fontSize: 16, fontWeight: "700" },
});
