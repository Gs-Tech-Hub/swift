import React, { useContext } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useEscrow } from "../../contexts/EscrowContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function DisputeManagerScreen() {
  const { disputes, resolveDispute } = useEscrow();
  const { theme } = useContext(ThemeContext);
  const navigation = useNavigation();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-outline" size={28} color={theme.primary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.primary }]}>
          Dispute Manager
        </Text>
      </View>

      {disputes.length === 0 ? (
        <Text style={[styles.emptyText, { color: theme.textMuted }]}>
          No disputes have been raised yet.
        </Text>
      ) : (
        <FlatList
          data={disputes}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 40 }}
          renderItem={({ item }) => (
            <View
              style={[
                styles.card,
                {
                  backgroundColor: theme.lightGray,
                  borderColor: theme.border,
                },
              ]}
            >
              <Text style={[styles.itemName, { color: theme.primary }]}>
                {item.itemName}
              </Text>
              <Text style={{ color: theme.textMuted, marginBottom: 6 }}>
                Reason: {item.reason}
              </Text>
              <Text style={{ color: theme.textMuted }}>Date: {item.date}</Text>
              <Text
                style={[
                  styles.status,
                  {
                    color:
                      item.status === "Pending"
                        ? theme.accent
                        : item.status === "Resolved"
                        ? theme.success
                        : theme.danger,
                    borderColor:
                      item.status === "Pending"
                        ? theme.accent
                        : item.status === "Resolved"
                        ? theme.success
                        : theme.danger,
                  },
                ]}
              >
                {item.status}
              </Text>

              {item.status === "Pending" && (
                <View style={styles.btnRow}>
                  <TouchableOpacity
                    style={[styles.btn, { backgroundColor: theme.success }]}
                    onPress={() => resolveDispute(item.id, "approve")}
                  >
                    <Text style={styles.btnText}>Approve</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.btn, { backgroundColor: theme.danger }]}
                    onPress={() => resolveDispute(item.id, "reject")}
                  >
                    <Text style={styles.btnText}>Reject</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16 },
  header: { flexDirection: "row", alignItems: "center", paddingVertical: 12 },
  headerTitle: { fontSize: 20, fontWeight: "700", marginLeft: 12 },
  emptyText: { textAlign: "center", marginTop: 40, fontSize: 16 },
  card: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
  },
  itemName: { fontWeight: "700", fontSize: 16, marginBottom: 6 },
  status: {
    borderWidth: 1,
    borderRadius: 8,
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: 12,
    fontWeight: "600",
    marginTop: 8,
  },
  btnRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 14,
  },
  btn: {
    flex: 1,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
    marginHorizontal: 4,
  },
  btnText: { color: "#fff", fontWeight: "600" },
});
