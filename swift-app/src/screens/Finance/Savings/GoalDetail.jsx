import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useTheme } from '../../../contexts/ThemeContext';
import { SavingsContext } from '../../../contexts/SavingsContext';
import { Ionicons } from '@expo/vector-icons';

export default function GoalDetail() {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const goalParam = route.params?.goal;
  const savingsCtx = useContext(SavingsContext);

  // try find in context by id to get fresh data
  const goal = savingsCtx?.goals?.find(g => g.id === goalParam?.id) || goalParam;

  const pct = Math.round((goal.saved / goal.target) * 100);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
        <Ionicons name="arrow-back" size={22} color={theme.primary} /><Text style={[styles.backText, { color: theme.primary }]}>Back</Text>
      </TouchableOpacity>

      <Text style={[styles.title, { color: theme.primary }]}>{goal.title}</Text>
      <Text style={[styles.amount, { color: theme.primary }]}>₦{goal.saved.toLocaleString()} / ₦{goal.target.toLocaleString()}</Text>
      <View style={{ marginTop: 12 }}>
        <View style={{ height: 10, backgroundColor: '#E6E7EA', borderRadius: 8 }}>
          <View style={{ height: 10, width: `${pct}%`, backgroundColor: theme.accent, borderRadius: 8 }} />
        </View>
      </View>

      <View style={{ marginTop: 20 }}>
        <TouchableOpacity style={[styles.btn, { backgroundColor: theme.primary }]} onPress={() => navigation.navigate('AddSavings', { toGoal: goal.id })}>
          <Text style={styles.btnText}>Add to Goal</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.btn, { backgroundColor: theme.surface, marginTop: 12 }]} onPress={() => navigation.navigate('WithdrawSavings')}>
          <Text style={[styles.btnText, { color: theme.primary }]}>Withdraw from Savings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  backBtn: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  backText: { marginLeft: 8, fontWeight: '600' },
  title: { fontSize: 22, fontWeight: '700' },
  amount: { fontSize: 18, fontWeight: '700', marginTop: 8 },
  btn: { paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
