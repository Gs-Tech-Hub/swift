import React, { useContext } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useWallet } from '../../contexts/WalletContext';
import { useCredit } from '../../contexts/CreditContext';
import Button from '../../components/Button';
import { ThemeContext } from '../../contexts/ThemeContext';

export default function WalletHome({ navigation }) {
  const { balance } = useWallet();
  const { score } = useCredit();
  const { theme } = useContext(ThemeContext);

  return (
    <ScrollView
      style={{ flex: 1, padding: 20, backgroundColor: theme.background }}
    >
      <Text style={{ fontSize: theme.FONTS.large, fontWeight: '700', color: theme.primary }}>
        Wallet
      </Text>

      <View
        style={{
          backgroundColor: theme.lightGray,
          padding: 16,
          borderRadius: theme.RADIUS.md,
          marginTop: 12,
        }}
      >
        <Text style={{ color: theme.secondary }}>Available Balance</Text>
        <Text
          style={{
            fontSize: theme.FONTS.xlarge,
            fontWeight: '800',
            marginTop: 6,
            color: theme.primary,
          }}
        >
          ₦{balance}
        </Text>
        <Text style={{ marginTop: 6, color: theme.secondary }}>
          Credit Score: {score}
        </Text>
      </View>

      <View style={{ marginTop: 20, gap: 12 }}>
        <Button title="Deposit" onPress={() => navigation.navigate('Deposit')} />
        <Button
          title="Withdraw"
          variant="outline"
          onPress={() => navigation.navigate('Withdraw')}
        />
      </View>
    </ScrollView>
  );
}
