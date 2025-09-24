import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../../components/Button';
import { useAuth } from '../../contexts/AuthContext';
import { ThemeContext } from '../../contexts/ThemeContext';

export default function ProfileScreen({ navigation }) {
  const { user } = useAuth();
  const { theme } = useContext(ThemeContext);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.primary, fontSize: theme.FONTS.large }]}>
        My Profile
      </Text>

      <Text style={[styles.info, { color: theme.secondary }]}>
        Name: {user?.name || 'Demo User'}
      </Text>
      <Text style={[styles.info, { color: theme.secondary }]}>
        Email: {user?.email || 'demo@example.com'}
      </Text>

      <View style={{ marginTop: theme.SPACING.lg, width: '100%', gap: theme.SPACING.sm }}>
        <Button title="Settings" onPress={() => navigation.navigate('Settings')} />
        <Button
          title="Upgrade to Merchant"
          variant="outline"
          onPress={() => navigation.navigate('UpgradeMerchant')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontWeight: '700', marginBottom: 20 },
  info: { fontSize: 16, marginBottom: 10 },
});
