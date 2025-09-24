import React, { useState, useContext } from 'react';
import { ScrollView, Text, View } from 'react-native';
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import { useAuth } from '../../contexts/AuthContext';
import { ThemeContext } from '../../contexts/ThemeContext';

export default function VerifyPhoneScreen({ navigation, route }) {
  const { theme } = useContext(ThemeContext);
  const [code, setCode] = useState('');
  const { verifyOtp } = useAuth();
  const phone = route.params?.phone || '';

  const onVerify = async () => {
    await verifyOtp({ phone, code });
    navigation.navigate('CreatePasscode');
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
          marginBottom: theme.SPACING.sm,
        }}
      >
        Verify Phone
      </Text>
      <Text
        style={{
          textAlign: 'center',
          marginBottom: theme.SPACING.lg,
          color: theme.textMuted,
        }}
      >
        Enter code sent to {phone}
      </Text>

      <InputField label="OTP" value={code} onChangeText={setCode} />

      <Button
        title="Verify"
        onPress={onVerify}
        style={{ marginTop: theme.SPACING.md }}
      />
    </ScrollView>
  );
}
