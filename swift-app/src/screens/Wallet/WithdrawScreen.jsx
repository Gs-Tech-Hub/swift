import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { ThemeContext } from '../../contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

export default function WithdrawScreen({ navigation }) {
  const { theme } = useContext(ThemeContext);

  const [amount, setAmount] = useState('');
  const [bank, setBank] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [pin, setPin] = useState('');
  const [showPinModal, setShowPinModal] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleConfirm = () => {
    if (pin.length === 4 && amount && bank && accountNumber) {
      setShowPinModal(false);
      setSuccess(true);
    }
  };

  const handleDone = () => {
    setAmount('');
    setBank('');
    setAccountNumber('');
    setPin('');
    setSuccess(false);
    navigation.goBack();
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>

      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={theme.primary} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.primary }]}>Withdraw</Text>
        <View style={{ width: 24 }} />
      </View>


      {success ? (
        <View style={styles.centered}>
          <Ionicons name="checkmark-circle" size={80} color={theme.success} />
          <Text style={[styles.successText, { color: theme.primary }]}>
            Withdrawal Successful
          </Text>
          <Text style={{ color: theme.textMuted, marginBottom: 20 }}>
            ₦{amount} sent to {bank} ({accountNumber})
          </Text>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.accent }]}
            onPress={handleDone}
          >
            <Text style={styles.buttonText}>Done</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          {/*  Amount Input */}
          <Text style={[styles.label, { color: theme.primary }]}>Enter Amount</Text>
          <TextInput
            placeholder="₦0.00"
            placeholderTextColor={theme.textMuted}
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
            style={[styles.input, { borderColor: theme.border, color: theme.primary }]}
          />

          {/*  Bank Name */}
          <Text style={[styles.label, { color: theme.primary }]}>Bank Name</Text>
          <TextInput
            placeholder="e.g. GTBank"
            placeholderTextColor={theme.textMuted}
            value={bank}
            onChangeText={setBank}
            style={[styles.input, { borderColor: theme.border, color: theme.primary }]}
          />

          {/*  Account Number */}
          <Text style={[styles.label, { color: theme.primary }]}>Account Number</Text>
          <TextInput
            placeholder="1234567890"
            placeholderTextColor={theme.textMuted}
            keyboardType="numeric"
            maxLength={10}
            value={accountNumber}
            onChangeText={setAccountNumber}
            style={[styles.input, { borderColor: theme.border, color: theme.primary }]}
          />

          {/* 🔹 Continue */}
          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.accent }]}
            onPress={() => setShowPinModal(true)}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </>
      )}

      {/* PIN Modal */}
      <Modal visible={showPinModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.background }]}>
            <Text style={[styles.label, { color: theme.primary }]}>Enter Transaction PIN</Text>
            <TextInput
              placeholder="****"
              placeholderTextColor={theme.textMuted}
              secureTextEntry
              keyboardType="numeric"
              maxLength={4}
              value={pin}
              onChangeText={setPin}
              style={[styles.input, { borderColor: theme.border, color: theme.primary }]}
            />
            <TouchableOpacity
              style={[styles.button, { backgroundColor: theme.accent }]}
              onPress={handleConfirm}
            >
              <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowPinModal(false)}>
              <Text style={{ color: theme.danger, marginTop: 10 }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: { fontSize: 18, fontWeight: '600' },

  label: { fontSize: 16, fontWeight: '500', marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
    width: '100%',
  },
  button: {
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 16 },

  centered: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  successText: { fontSize: 22, fontWeight: '700', marginVertical: 12 },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    borderRadius: 12,
    padding: 20,
    elevation: 5,
  },
});
