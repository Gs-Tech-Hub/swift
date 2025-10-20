import React, { useContext } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { useEscrow } from "../../contexts/EscrowContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function EscrowScreen() {
  const { escrowTransactions, confirmDelivery, reportIssue } = useEscrow();
  const { theme } = useContext(ThemeContext);
  const navigation = useNavigation();

  const renderStatus = (status) => {
    let color = theme.textMuted;
    if (status === "Pending") color = theme.accent;
    else if (status === "Delivered") color = theme.success;
    else if (status === "Issue Reported") color = theme.danger;
    return (
      <Text style={[styles.status, { color, borderColor: color }]}>{status}</Text>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Custom Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-outline" size={28} color={theme.primary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.primary }]}>
          Escrow Orders
        </Text>
      </View>

      {escrowTransactions.length === 0 ? (
        <Text style={[styles.noDataText, { color: theme.textMuted }]}>
          You have no active escrow transactions.
        </Text>
      ) : (
        <FlatList
          data={escrowTransactions}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View
              style={[
                styles.card,
                {
                  backgroundColor: theme.lightGray,
                  borderColor: theme.border,
                  shadowColor: theme.mode === "light" ? "#000" : "#000",
                },
              ]}
            >
              {/* Top Row */}
              <View style={styles.row}>
                <Image
                  source={{ uri: item.item.image }}
                  style={styles.image}
                  resizeMode="contain"
                />
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={[styles.name, { color: theme.primary }]} numberOfLines={1}>
                    {item.item.name}
                  </Text>
                  <Text style={{ color: theme.accent, fontWeight: "700", fontSize: 16 }}>
                    ₦{item.item.price.toLocaleString()}
                  </Text>
                  <Text style={{ color: theme.textMuted, fontSize: 13 }}>{item.date}</Text>
                </View>
                {renderStatus(item.status)}
              </View>

              {/* Action Buttons */}
              {item.status === "Pending" && (
                <View style={styles.actionRow}>
                  <TouchableOpacity
                    style={[styles.actionBtn, { backgroundColor: theme.success }]}
                    onPress={() => confirmDelivery(item.id)}
                  >
                    <Text style={styles.btnText}>Confirm Delivery</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.actionBtn, { backgroundColor: theme.danger }]}
                    onPress={() => navigation.navigate('RaiseDispute', { transactionId: item.id })}
                  >
                    <Text style={styles.btnText}>Report Issue</Text>
                  </TouchableOpacity>
                </View>
              )}
              {item.status === "Issue Reported" && (
  <TouchableOpacity
    style={{ marginTop: 8, flexDirection: "row", alignItems: "center" }}
    onPress={() =>
      Alert.alert(
        "Dispute in Review",
        "Your issue is being reviewed by our dispute team. You’ll be notified when it’s resolved."
      )
    }
  >
    <Ionicons name="information-circle-outline" size={18} color={theme.accent} />
    <Text style={{ color: theme.textMuted, marginLeft: 6 }}>
      Dispute under review
    </Text>
  </TouchableOpacity>
)}

            </View>
          )}
          contentContainerStyle={{ paddingBottom: 40 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginLeft: 12,
  },
  noDataText: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
  },
  card: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  row: { flexDirection: "row", alignItems: "center" },
  image: { width: 60, height: 60, borderRadius: 10 },
  name: { fontWeight: "600", fontSize: 15, marginBottom: 3 },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 14,
  },
  actionBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 4,
  },
  btnText: { color: "#fff", fontWeight: "600" },
  status: {
    fontSize: 12,
    fontWeight: "600",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderRadius: 6,
    textAlign: "center",
  },
});
