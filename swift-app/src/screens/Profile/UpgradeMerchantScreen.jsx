import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../../components/Button';

export default function UpgradeMerchantScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upgrade to Merchant</Text>
      <Text style={styles.info}>Complete KYC and start selling on the marketplace.</Text>
      <View style={{ marginTop: 20, width: '100%' }}>
        <Button title="Start Upgrade" onPress={() => alert('Upgrade flow not implemented yet')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 20 },
  info: { fontSize: 16 },
});
