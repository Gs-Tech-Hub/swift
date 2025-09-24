import React, { useState, useContext } from 'react';
import { ScrollView, Text, View } from 'react-native';
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import { useAuth } from '../../contexts/AuthContext';
import { ThemeContext } from '../../contexts/ThemeContext';

export default function CreateTxnPinScreen() {
  const { theme } = useContext(ThemeContext);
  const [pin, setPin] = useState('');
  const [confirm, setConfirm] = useState('');
  const { setTxnPin, setUser } = useAuth();

  const onFinish = async () => {
    if (pin !== confirm) {
      alert('Pins do not match');
      return;
    }

    await setTxnPin({ userId: 'demo', pin });

    // Mark user as logged in; RootNavigator will switch to MainTabs automatically
    setUser({ id: 'demo' });
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'center',
        padding: theme.SPACING.lg,
        backgroundColor: theme.background,
      }}
    >
      <Text
        style={{
          fontSize: theme.FONTS.large,
          fontWeight: '700',
          color: theme.primary,
          textAlign: 'center',
          marginBottom: theme.SPACING.lg,
        }}
      >
        Create Transaction PIN
      </Text>

      <InputField label="PIN" value={pin} onChangeText={setPin} secure />
      <InputField label="Confirm" value={confirm} onChangeText={setConfirm} secure />

      <Button
        title="Finish"
        onPress={onFinish}
        style={{ marginTop: theme.SPACING.md }}
      />
    </ScrollView>
  );
}
