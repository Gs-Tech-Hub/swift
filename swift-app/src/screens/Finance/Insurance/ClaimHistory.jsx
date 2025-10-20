import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../contexts/ThemeContext';
import { useNavigation } from '@react-navigation/native';

export default function ClaimHistory() {
  const { theme } = useTheme();
  const navigation = useNavigation();

  const claims = [
    { id: 1, title: 'Hospital Visit - Lagos', amount: '₦15,000', status: 'Approved' },
    { id: 2, title: 'Prescription Refill', amount: '₦3,000', status: 'Pending' },
  ];

  const getStatusColor = (status) => {
    if (status === 'Approved') return theme.success;
    if (status === 'Pending') return theme.warning;
    return theme.danger;
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
        <Ionicons name="arrow-back" size={22} color={theme.primary} />
        <Text style={[styles.backText, { color: theme.primary }]}>Back</Text>
      </TouchableOpacity>

      <Text style={[styles.title, { color: theme.primary }]}>Claim History</Text>

      {claims.map((claim) => (
        <View
          key={claim.id}
          style={[styles.item, { borderBottomColor: theme.border }]}
        >
          <MaterialCommunityIcons
            name="hospital-box-outline"
            size={22}
            color={theme.accent}
          />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={[styles.claimTitle, { color: theme.primary }]}>{claim.title}</Text>
            <Text style={[styles.claimAmount, { color: theme.textMuted }]}>
              {claim.amount}
            </Text>
          </View>
          <Text
            style={[
              styles.status,
              { color: getStatusColor(claim.status) },
            ]}
          >
            {claim.status}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  backBtn: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  backText: { marginLeft: 6, fontWeight: '600' },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 20 },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  claimTitle: { fontSize: 15, fontWeight: '600' },
  claimAmount: { fontSize: 13, marginTop: 2 },
  status: { fontSize: 14, fontWeight: '700' },
});
