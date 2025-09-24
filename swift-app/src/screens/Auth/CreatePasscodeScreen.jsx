import React, { useState, useContext } from 'react';
import { View, Text, ScrollView } from 'react-native';
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import { useAuth } from '../../contexts/AuthContext';
import { ThemeContext } from '../../contexts/ThemeContext';

export default function CreatePasscodeScreen({ navigation }) {
  const { theme } = useContext(ThemeContext);
  const [pass, setPass] = useState('');
  const [confirm, setConfirm] = useState('');
  const { setPasscode } = useAuth();

  const onNext = async () => {
    if (pass !== confirm) {
      alert('Passcodes do not match');
      return;
    }
    await setPasscode({ userId: 'demo', passcode: pass });
    navigation.navigate('CreateTxnPin');
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
        Create 6-digit passcode
      </Text>

      <InputField label="Passcode" value={pass} onChangeText={setPass} secure />
      <InputField label="Confirm" value={confirm} onChangeText={setConfirm} secure />

      <Button
        title="Next"
        onPress={onNext}
        style={{ marginTop: theme.SPACING.md }}
      />
    </ScrollView>
  );
}
