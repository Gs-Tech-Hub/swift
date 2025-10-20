import React, { useContext } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, ProgressBarAndroid, Platform } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../../contexts/ThemeContext';
import { SavingsContext } from '../../../contexts/SavingsContext';
import { FinanceContext } from '../../../contexts/FinanceContext';
import { WalletContext } from '../../../contexts/WalletContext';

const Progress = ({ value }) => {
  // cross-platform: use a simple view-based bar (Android ProgressBarAndroid optional)
  return (
    <View style={{ height: 8, width: '100%', backgroundColor: '#E6E7EA', borderRadius: 8 }}>
      <View style={{ height: '100%', width: `${Math.min(Math.max(value, 0), 100)}%`, backgroundColor: '#4F46E5', borderRadius: 8 }} />
    </View>
  );
};

export default function SavingsScreen() {
  const navigation = useNavigation();
  const { theme } = useTheme();

  // prefer SavingsContext if available, else fall back to FinanceContext
  const savingsCtx = useContext(SavingsContext);
  const financeCtx = useContext(FinanceContext);
  const walletCtx = useContext(WalletContext);

  const savingsBalance = savingsCtx?.savingsBalance ?? financeCtx?.savingsBalance ?? 0;
  const goals = savingsCtx?.goals ?? [];
  const activities = savingsCtx?.activities ?? [];

  const totalWallet = walletCtx?.balance ?? 0;
  // small summary: show savingsBalance prominently
  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={theme.primary} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.primary }]}>Savings</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Total Card */}
      <View style={[styles.totalCard, { backgroundColor: theme.secondary }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View>
            <Text style={[styles.totalLabel, { color: theme.background }]}>Total in Savings</Text>
            <Text style={[styles.totalAmount, { color: theme.background }]}>₦{(savingsBalance).toLocaleString()}</Text>
            <Text style={[styles.totalSub, { color: theme.background, opacity: 0.9 }]}>
              Wallet: ₦{totalWallet.toLocaleString()}
            </Text>
          </View>
          <MaterialCommunityIcons name="piggy-bank-outline" size={34} color={theme.background} />
        </View>

        <View style={{ flexDirection: 'row', marginTop: 14, justifyContent: 'space-between' }}>
          <TouchableOpacity style={[styles.actionBtn, { backgroundColor: theme.background }]} onPress={() => navigation.navigate('AddSavings')}>
            <Ionicons name="add-circle" size={20} color={theme.primary} />
            <Text style={[styles.actionText, { color: theme.primary }]}>Add</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.actionBtn, { backgroundColor: theme.background }]} onPress={() => navigation.navigate('WithdrawSavings')}>
            <Ionicons name="arrow-up-circle" size={20} color={theme.primary} />
            <Text style={[styles.actionText, { color: theme.primary }]}>Withdraw</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.actionBtn, { backgroundColor: theme.background }]} onPress={() => navigation.navigate('CreateGoal')}>
            <Ionicons name="flag" size={20} color={theme.primary} />
            <Text style={[styles.actionText, { color: theme.primary }]}>New Goal</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Goals */}
      <Text style={[styles.sectionTitle, { color: theme.primary }]}>Your Goals</Text>
      {goals.length === 0 ? (
        <View style={[styles.emptyCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={{ color: theme.textMuted }}>No goals yet — create one to start saving with purpose.</Text>
        </View>
      ) : (
        goals.map((g) => {
          const pct = Math.round((g.saved / g.target) * 100);
          return (
            <TouchableOpacity key={g.id} style={[styles.goalCard, { backgroundColor: theme.card, borderColor: theme.border }]} onPress={() => navigation.navigate('GoalDetail', { goal: g })}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={[styles.goalIcon, { backgroundColor: g.color || '#E6E7EA' }]}>
                  <MaterialCommunityIcons name="flag-variant" size={20} color={'#fff'} />
                </View>
                <View style={{ marginLeft: 12 }}>
                  <Text style={[styles.goalTitle, { color: theme.primary }]}>{g.title}</Text>
                  <Text style={[styles.goalSub, { color: theme.textMuted }]}>
                    ₦{g.saved.toLocaleString()} of ₦{g.target.toLocaleString()}
                  </Text>
                </View>
              </View>

              <View style={{ width: 110, alignItems: 'flex-end' }}>
                <Text style={{ color: theme.primary, fontWeight: '700' }}>{pct}%</Text>
                <View style={{ width: '100%', marginTop: 8 }}>
                  <Progress value={pct} />
                </View>
              </View>
            </TouchableOpacity>
          );
        })
      )}

      {/* Recent Activity */}
      <Text style={[styles.sectionTitle, { color: theme.primary, marginTop: 18 }]}>Recent Activity</Text>
      {activities.length === 0 ? (
        <Text style={{ color: theme.textMuted, marginHorizontal: 20, marginTop: 8 }}>No recent activity</Text>
      ) : activities.map(a => (
        <View key={a.id} style={[styles.activityRow, { borderBottomColor: theme.border }]}>
          <MaterialCommunityIcons name={a.type === 'withdraw' ? 'arrow-up-bold-box' : 'arrow-down-bold-box'} size={20} color={a.type === 'withdraw' ? theme.danger : theme.success} />
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={{ color: theme.primary, fontWeight: '600' }}>{a.label}</Text>
            <Text style={{ color: theme.textMuted, marginTop: 2 }}>{a.date}</Text>
          </View>
          <Text style={{ color: a.type === 'withdraw' ? theme.danger : theme.success, fontWeight: '700' }}>
            {a.type === 'withdraw' ? '-' : '+'}₦{a.amount.toLocaleString()}
          </Text>
        </View>
      ))}

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: 20 },
  title: { fontSize: 22, fontWeight: '700' },
  totalCard: { marginHorizontal: 20, padding: 18, borderRadius: 14 },
  totalLabel: { fontSize: 13, fontWeight: '600' },
  totalAmount: { fontSize: 28, fontWeight: '800', marginTop: 6 },
  totalSub: { fontSize: 13, marginTop: 4 },
  actionBtn: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 10 },
  actionText: { marginLeft: 8, fontWeight: '700' },
  sectionTitle: { marginHorizontal: 20, fontSize: 18, fontWeight: '700', marginTop: 20 },
  emptyCard: { marginHorizontal: 20, marginTop: 10, padding: 16, borderRadius: 12, borderWidth: 1 },
  goalCard: { marginHorizontal: 20, padding: 14, borderRadius: 12, marginTop: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 1 },
  goalIcon: { width: 44, height: 44, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  goalTitle: { fontSize: 16, fontWeight: '700' },
  goalSub: { fontSize: 13, marginTop: 4 },
  activityRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 14, borderBottomWidth: 1 },
});
