import React, { useContext } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { WalletContext } from '../../contexts/WalletContext';
import TransactionItem from '../../components/TransactionItem';
import { ThemeContext } from '../../contexts/ThemeContext';

export default function HistoryScreen() {
  const { transactions } = useContext(WalletContext); // ✅ now pulling from WalletContext
  const { theme } = useContext(ThemeContext);

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.primary, fontSize: theme.FONTS.large }]}>
        History
      </Text>

      {transactions.length > 0 ? (
        transactions.map((t) => <TransactionItem key={t.id} item={t} />)
      ) : (
        <Text
          style={{
            color: theme.textMuted,
            marginTop: theme.SPACING.md,
            textAlign: 'center',
          }}
        >
          No transactions yet
        </Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontWeight: '700', marginBottom: 20 },
});
