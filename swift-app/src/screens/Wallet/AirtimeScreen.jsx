import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Image } from 'react-native';
import { ThemeContext } from '../../contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
const NETWORKS = [
  { id: 'mtn', name: 'MTN', logo: require('../../assets/images/mtn.png') },
  { id: 'airtel', name: 'Airtel', logo: require('../../assets/images/airtel.png') },
  { id: 'glo', name: 'Glo', logo: require('../../assets/images/glo.png') },
  { id: '9mobile', name: '9mobile', logo: require('../../assets/images/9mobile.png') },
];

export default function AirtimeScreen({ navigation }) {
  const { theme } = useContext(ThemeContext);

  const [phone, setPhone] = useState('');
  const [network, setNetwork] = useState(null);
  const [amount, setAmount] = useState('');
  const [pin, setPin] = useState('');
  const [showNetworkOptions, setShowNetworkOptions] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleConfirm = () => {
    if (pin.length === 4 && phone && network && amount) {
      setShowPinModal(false);
      setSuccess(true);
    }
  };

  const handleDone = () => {
    setPhone('');
    setNetwork(null);
    setAmount('');
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
        <Text style={[styles.title, { color: theme.primary }]}>Airtime</Text>
        <View style={{ width: 24 }} />
      </View>


      {success ? (
        <View style={styles.centered}>
          <Ionicons name="checkmark-circle" size={80} color={theme.success} />
          <Text style={[styles.successText, { color: theme.primary }]}>Airtime Successful</Text>
          <Text style={{ color: theme.textMuted, marginBottom: 20 }}>
            ₦{amount} Airtime sent to {phone} ({network?.name})
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
          {/* Phone  */}
          <Text style={[styles.label, { color: theme.primary }]}>Phone Number</Text>
          <TextInput
            placeholder="08012345678"
            placeholderTextColor={theme.textMuted}
            keyboardType="numeric"
            maxLength={11}
            value={phone}
            onChangeText={setPhone}
            style={[styles.input, { borderColor: theme.border, color: theme.primary }]}
          />

          {/* Network*/}
          <Text style={[styles.label, { color: theme.primary }]}>Network</Text>
          <TouchableOpacity
            style={[styles.dropdown, { borderColor: theme.border }]}
            onPress={() => setShowNetworkOptions(!showNetworkOptions)}
          >
            {network ? (
              <View style={styles.optionRow}>
                <Image source={network.logo} style={styles.logo} />
                <Text style={[styles.optionText, { color: theme.primary }]}>{network.name}</Text>
              </View>
            ) : (
              <Text style={{ color: theme.textMuted }}>Select Network</Text>
            )}
            <Ionicons
              name={showNetworkOptions ? 'chevron-up' : 'chevron-down'}
              size={18}
              color={theme.primary}
            />
          </TouchableOpacity>

          {showNetworkOptions &&
            NETWORKS.map((net) => (
              <TouchableOpacity
                key={net.id}
                style={[styles.option, { borderColor: theme.border }]}
                onPress={() => {
                  setNetwork(net);
                  setShowNetworkOptions(false);
                }}
              >
                <Image source={net.logo} style={styles.logo} />
                <Text style={[styles.optionText, { color: theme.primary }]}>{net.name}</Text>
              </TouchableOpacity>
            ))}

          {/*  Amount */}
          <Text style={[styles.label, { color: theme.primary }]}>Amount</Text>
          <TextInput
            placeholder="₦0.00"
            placeholderTextColor={theme.textMuted}
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
            style={[styles.input, { borderColor: theme.border, color: theme.primary }]}
          />

       
          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.accent }]}
            onPress={() => setShowPinModal(true)}
          >
            <Text style={styles.buttonText}>Pay</Text>
          </TouchableOpacity>
        </>
      )}

      {/*  PIN */}
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
  dropdown: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 8,
  },
  optionRow: { flexDirection: 'row', alignItems: 'center' },
  optionText: { marginLeft: 10, fontSize: 15 },
  logo: { width: 24, height: 24, resizeMode: 'contain' },

  button: {
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
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
