import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../contexts/ThemeContext';
import { useNavigation } from '@react-navigation/native';

export default function BuyPlan() {
  const { theme } = useTheme();
  const navigation = useNavigation();

  const plans = [
    { title: 'Basic', price: '₦1,000', desc: 'Covers basic health emergencies.' },
    { title: 'Standard', price: '₦2,000', desc: 'Covers hospital visits & prescriptions.' },
    { title: 'Family', price: '₦3,500', desc: 'Covers up to 4 family members.' },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
        <Ionicons name="arrow-back" size={22} color={theme.primary} />
        <Text style={[styles.backText, { color: theme.primary }]}>Back</Text>
      </TouchableOpacity>

      <Text style={[styles.title, { color: theme.primary }]}>Choose a Plan</Text>

      {plans.map((plan, i) => (
        <TouchableOpacity
          key={i}
          style={[styles.planCard, { borderColor: theme.border, backgroundColor: theme.card }]}
          onPress={() => navigation.navigate('PlanDetail', { plan })}
        >
          <View>
            <Text style={[styles.planTitle, { color: theme.primary }]}>{plan.title}</Text>
            <Text style={[styles.planDesc, { color: theme.textMuted }]}>{plan.desc}</Text>
          </View>
          <Text style={[styles.planPrice, { color: theme.accent }]}>{plan.price}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  backBtn: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  backText: { marginLeft: 6, fontWeight: '600' },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 20 },
  planCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 16,
  },
  planTitle: { fontSize: 18, fontWeight: '600' },
  planDesc: { fontSize: 13, marginTop: 4 },
  planPrice: { fontSize: 16, fontWeight: '700' },
});
