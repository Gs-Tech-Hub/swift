// src/screens/Finance/Savings/CreateGoal.jsx
import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useTheme } from '../../../contexts/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { SavingsContext } from '../../../contexts/SavingsContext';
import { Ionicons } from '@expo/vector-icons';

export default function CreateGoal() {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const savingsCtx = useContext(SavingsContext);

  const [title, setTitle] = useState('');
  const [target, setTarget] = useState('');

  const submit = () => {
    const t = Number(target);
    if (!title || !t || t <= 0) return Alert.alert('Invalid', 'Enter valid goal name and amount');
    savingsCtx?.createGoal?.({ title, target: t, saved: 0, color: '#60A5FA' });
    Alert.alert('Created', 'Goal created');
    navigation.navigate('Savings');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
        <Ionicons name="arrow-back" size={22} color={theme.primary} />
        <Text style={[styles.backText, { color: theme.primary }]}>Back</Text>
      </TouchableOpacity>

      <Text style={[styles.title, { color: theme.primary }]}>Create Goal</Text>

      <TextInput placeholder="Goal name" value={title} onChangeText={setTitle} style={[styles.input, { backgroundColor: theme.card, color: theme.text }]} />
      <TextInput placeholder="Target amount (₦)" keyboardType="numeric" value={target} onChangeText={setTarget} style={[styles.input, { backgroundColor: theme.card, color: theme.text }]} />

      <TouchableOpacity style={[styles.btn, { backgroundColor: theme.primary }]} onPress={submit}>
        <Text style={styles.btnText}>Create</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  backBtn: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  backText: { marginLeft: 8, fontWeight: '600' },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 20 },
  input: { borderRadius: 10, padding: 14, fontSize: 16, marginBottom: 12 },
  btn: { paddingVertical: 14, borderRadius: 12, alignItems: 'center', marginTop: 10 },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
