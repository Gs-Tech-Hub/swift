import React, { useState, useContext } from 'react';
import { View, Text, ScrollView } from 'react-native';
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import { useAuth } from '../../contexts/AuthContext';
import { ThemeContext } from '../../contexts/ThemeContext';

export default function SignupScreen({ navigation }) {
  const { theme } = useContext(ThemeContext);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const { signup } = useAuth();

  const onNext = async () => {
    if (password !== confirm) {
      alert('Passwords do not match');
      return;
    }
    await signup({ name, phone, password });
    navigation.navigate('VerifyPhone', { phone });
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
        Create account
      </Text>

      <InputField label="Full name" value={name} onChangeText={setName} />
      <InputField label="Phone" value={phone} onChangeText={setPhone} />
      <InputField label="Password" value={password} onChangeText={setPassword} secure />
      <InputField label="Confirm" value={confirm} onChangeText={setConfirm} secure />

      <Button
        title="Next"
        onPress={onNext}
        style={{ marginTop: theme.SPACING.md }}
      />

      <View style={{ marginTop: theme.SPACING.md }}>
        <Button
          title="Already have an account? Login"
          variant="secondary"
          onPress={() => navigation.navigate('Login')}
        />
      </View>
    </ScrollView>
  );
}
