import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from '../../../contexts/ThemeContext';
import { SavingsContext } from '../../../contexts/SavingsContext';
import { Ionicons } from '@expo/vector-icons';

export default function AddSavings() {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const { toGoal } = route.params || {}; // if called from GoalDetail
  const savingsCtx = useContext(SavingsContext);

  const [amount, setAmount] = useState('');

  const submit = () => {
    const amt = Number(amount);
    if (!amt || amt <= 0) return Alert.alert('Invalid', 'Enter a valid amount');
    if (toGoal) {
      savingsCtx?.depositToGoal?.(toGoal, amt);
      Alert.alert('Success', 'Added to goal');
      navigation.navigate('GoalDetail', { goal: savingsCtx.goals.find(g => g.id === toGoal) });
    } else {
      savingsCtx?.addToSavings?.(amt);
      Alert.alert('Success', 'Added to savings');
      navigation.navigate('Savings');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
        <Ionicons name="arrow-back" size={22} color={theme.primary} />
        <Text style={[styles.backText, { color: theme.primary }]}>Back</Text>
      </TouchableOpacity>

      <Text style={[styles.title, { color: theme.primary }]}>Add to {toGoal ? 'Goal' : 'Savings'}</Text>

      <TextInput
        placeholder="Amount (₦)"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
        style={[styles.input, { backgroundColor: theme.card, color: theme.text }]}
      />

      <TouchableOpacity style={[styles.btn, { backgroundColor: theme.primary }]} onPress={submit}>
        <Text style={styles.btnText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  backBtn: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  backText: { marginLeft: 8, fontWeight: '600' },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 20 },
  input: { borderRadius: 10, padding: 14, fontSize: 16, marginBottom: 20 },
  btn: { paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
