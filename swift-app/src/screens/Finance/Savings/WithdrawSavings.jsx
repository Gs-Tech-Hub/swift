import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../../contexts/ThemeContext';
import { SavingsContext } from '../../../contexts/SavingsContext';
import { Ionicons } from '@expo/vector-icons';

export default function WithdrawSavings() {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const savingsCtx = useContext(SavingsContext);

  const [amount, setAmount] = useState('');

  const submit = () => {
    const amt = Number(amount);
    if (!amt || amt <= 0) return Alert.alert('Invalid', 'Enter a valid amount');
    if (amt > (savingsCtx?.savingsBalance ?? 0)) return Alert.alert('Insufficient', 'Not enough savings');
    savingsCtx?.withdrawFromSavings?.(amt);
    Alert.alert('Success', 'Withdrawal requested');
    navigation.navigate('Savings');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
        <Ionicons name="arrow-back" size={22} color={theme.primary} />
        <Text style={[styles.backText, { color: theme.primary }]}>Back</Text>
      </TouchableOpacity>

      <Text style={[styles.title, { color: theme.primary }]}>Withdraw</Text>

      <TextInput
        placeholder="Amount (₦)"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
        style={[styles.input, { backgroundColor: theme.card, color: theme.text }]}
      />

      <TouchableOpacity style={[styles.btn, { backgroundColor: theme.primary }]} onPress={submit}>
        <Text style={styles.btnText}>Withdraw</Text>
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
