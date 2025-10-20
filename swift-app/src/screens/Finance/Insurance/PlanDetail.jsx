import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../../contexts/ThemeContext';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function PlanDetail() {
  const { theme } = useTheme();
  const route = useRoute();
  const navigation = useNavigation();
  const plan = route.params?.plan || {};

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
        <Ionicons name="arrow-back" size={22} color={theme.primary} />
        <Text style={[styles.backText, { color: theme.primary }]}>Back</Text>
      </TouchableOpacity>

      <Text style={[styles.title, { color: theme.primary }]}>{plan.title} Plan</Text>
      <Text style={[styles.price, { color: theme.success }]}>{plan.price}/month</Text>

      <View style={styles.list}>
        <Text style={[styles.item, { color: theme.textMuted }]}>- Hospital Visits</Text>
        <Text style={[styles.item, { color: theme.textMuted }]}>- Emergency Coverage</Text>
        <Text style={[styles.item, { color: theme.textMuted }]}>- Doctor Consultations</Text>
        <Text style={[styles.item, { color: theme.textMuted }]}>- Free Annual Checkup</Text>
      </View>

      <TouchableOpacity
        style={[styles.btn, { backgroundColor: theme.primary }]}
        onPress={() => navigation.navigate('InsuranceHome')}
      >
        <Text style={styles.btnText}>Buy Plan</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  backBtn: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  backText: { marginLeft: 6, fontWeight: '600' },
  title: { fontSize: 24, fontWeight: '700' },
  price: { fontSize: 22, fontWeight: '600', marginTop: 8 },
  list: { marginVertical: 30 },
  item: { fontSize: 15, marginVertical: 6 },
  btn: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
