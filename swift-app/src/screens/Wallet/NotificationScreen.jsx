// src/screens/notifications/NotificationScreen.js
import React, { useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useWallet } from "../../contexts/WalletContext";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

export default function NotificationScreen() {
  const { theme } = useContext(ThemeContext);
  const { notifications, markNotificationRead } = useWallet();
  const navigation = useNavigation();

  useEffect(() => {
    // optional: mark all read on open
    // notifications.forEach(n => markNotificationRead(n.id));
  }, []);

  const getColor = (note) => {
    // very basic: guess by message content
    if ((note.message || "").toLowerCase().includes("deposit")) return theme.success;
    if ((note.message || "").toLowerCase().includes("withdraw")) return theme.danger;
    if ((note.message || "").toLowerCase().includes("order") || (note.message || "").toLowerCase().includes("purchase")) return theme.secondary;
    return theme.primary;
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={theme.primary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.primary }]}>Notifications</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        {notifications.map((n) => (
          <TouchableOpacity key={n.id} activeOpacity={0.9} style={[styles.card, { backgroundColor: n.read ? theme.lightGray : theme.secondary + "10", borderColor: theme.border }]} onPress={() => markNotificationRead(n.id)}>
            <View style={[styles.iconContainer, { backgroundColor: getColor(n) + "20" }]}>
              <Ionicons name="notifications-outline" size={22} color={getColor(n)} />
            </View>

            <View style={styles.textContainer}>
              <Text style={[styles.title, { color: theme.primary }]}>{n.message}</Text>
              <Text style={[styles.time, { color: theme.textMuted }]}>{n.date}</Text>
            </View>
          </TouchableOpacity>
        ))}

        {notifications.length === 0 && <Text style={{ color: theme.textMuted, textAlign: "center", marginTop: 40 }}>No notifications</Text>}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20 },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 18 },
  backButton: { padding: 6 },
  headerTitle: { fontSize: 18, fontWeight: "700" },
  card: { flexDirection: "row", alignItems: "center", borderWidth: 1, borderRadius: 12, padding: 12, marginBottom: 12 },
  iconContainer: { width: 40, height: 40, borderRadius: 20, justifyContent: "center", alignItems: "center", marginRight: 12 },
  textContainer: { flex: 1 },
  title: { fontSize: 15, fontWeight: "600" },
  time: { fontSize: 11, marginTop: 4 },
});
