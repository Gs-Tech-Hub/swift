import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../../contexts/ThemeContext';

export default function InsuranceHome() {
  const { theme } = useTheme();
  const navigation = useNavigation();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      showsVerticalScrollIndicator={false}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('FinanceHome')}>
          <Ionicons name="arrow-back" size={24} color={theme.primary} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.primary }]}>Health Insurance</Text>
        <Ionicons name="shield-checkmark-outline" size={26} color={theme.accent} />
      </View>

      {/* ACTIVE PLAN CARD */}
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <Text style={[styles.planName, { color: theme.primary }]}>Standard Health Cover</Text>
        <Text style={[styles.planAmount, { color: theme.success }]}>₦2,000 / month</Text>
        <Text style={[styles.planSub, { color: theme.textMuted }]}>
          Next payment: Nov 18, 2025
        </Text>

        <View style={styles.row}>
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: theme.accent }]}
            onPress={() => navigation.navigate('SubmitClaim')}
          >
            <Ionicons name="document-text-outline" size={18} color="#fff" />
            <Text style={styles.btnText}>Submit Claim</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btn, { backgroundColor: theme.primary }]}
            onPress={() => navigation.navigate('ClaimHistory')}
          >
            <Ionicons name="time-outline" size={18} color="#fff" />
            <Text style={styles.btnText}>Claim History</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* AVAILABLE PLANS */}
      <Text style={[styles.sectionTitle, { color: theme.primary }]}>Available Plans</Text>
      <View style={styles.plansRow}>
        <PlanCard
          title="Basic"
          price="₦1,000"
          color={theme.success}
          onPress={() => navigation.navigate('PlanDetail', { plan: 'Basic' })}
        />
        <PlanCard
          title="Family"
          price="₦3,500"
          color={theme.accent}
          onPress={() => navigation.navigate('PlanDetail', { plan: 'Family' })}
        />
      </View>

      <TouchableOpacity
        style={[styles.fullBtn, { backgroundColor: theme.primary }]}
        onPress={() => navigation.navigate('BuyPlan')}
      >
        <Text style={styles.fullBtnText}>Buy New Plan</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const PlanCard = ({ title, price, color, onPress }) => (
  <TouchableOpacity style={[styles.planCard, { borderColor: color }]} onPress={onPress}>
    <MaterialCommunityIcons name="hospital-box-outline" size={30} color={color} />
    <Text style={styles.planCardTitle}>{title}</Text>
    <Text style={[styles.planCardPrice, { color }]}>{price}/month</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 20,
  },
  title: { fontSize: 22, fontWeight: '700' },
  card: {
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 16,
  },
  planName: { fontSize: 18, fontWeight: '600' },
  planAmount: { fontSize: 22, fontWeight: '700', marginVertical: 6 },
  planSub: { fontSize: 13 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  btnText: { color: '#fff', fontWeight: '600', marginLeft: 8 },
  sectionTitle: { marginHorizontal: 20, fontSize: 18, fontWeight: '600', marginTop: 30 },
  plansRow: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 14 },
  planCard: {
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    width: 140,
  },
  planCardTitle: { fontSize: 15, fontWeight: '600', marginTop: 8 },
  planCardPrice: { fontSize: 14, marginTop: 4 },
  fullBtn: {
    margin: 20,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  fullBtnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
