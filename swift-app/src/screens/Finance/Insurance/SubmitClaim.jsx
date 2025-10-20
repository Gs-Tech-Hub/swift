import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../../contexts/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function SubmitClaim() {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const [description, setDescription] = useState('');

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
    
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
        <Ionicons name="arrow-back" size={22} color={theme.primary} />
        <Text style={[styles.backText, { color: theme.primary }]}>Back</Text>
      </TouchableOpacity>

      <Text style={[styles.title, { color: theme.primary }]}>Submit Claim</Text>

      <Text style={[styles.label, { color: theme.textMuted }]}>Description</Text>
      <TextInput
        placeholder="Describe your hospital visit or issue..."
        placeholderTextColor={theme.textMuted}
        value={description}
        onChangeText={setDescription}
        style={[styles.input, { backgroundColor: theme.card, color: theme.text }]}
        multiline
      />

      <TouchableOpacity style={[styles.uploadBtn, { backgroundColor: theme.surface }]}>
        <Text style={{ color: theme.primary }}>Upload Receipt</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.btn, { backgroundColor: theme.primary }]}>
        <Text style={styles.btnText}>Submit Claim</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  backBtn: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  backText: { marginLeft: 6, fontWeight: '600' },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 20 },
  label: { fontSize: 14, marginBottom: 6 },
  input: {
    borderRadius: 10,
    padding: 14,
    minHeight: 120,
    textAlignVertical: 'top',
  },
  uploadBtn: {
    marginVertical: 16,
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  btn: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
