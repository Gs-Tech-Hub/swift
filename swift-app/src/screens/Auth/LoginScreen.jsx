import React, { useState, useContext } from 'react';
import { View, Text, ScrollView } from 'react-native';
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import { useAuth } from '../../contexts/AuthContext';
import { ThemeContext } from '../../contexts/ThemeContext';

export default function LoginScreen({ navigation }) {
  const { theme } = useContext(ThemeContext);
  const [phone, setPhone] = useState('09000000000');
  const [password, setPassword] = useState('password');
  const { login, setUser } = useAuth();

  const onLogin = async () => {
    const r = await login({ phone, password });
    if (r.success) {
      setUser(r.user);
    } else {
      alert(r.message || 'Login failed');
    }
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
        Log in
      </Text>

      <InputField label="Phone" value={phone} onChangeText={setPhone} />
      <InputField label="Password" value={password} onChangeText={setPassword} secure />

      <Button
        title="Sign in"
        onPress={onLogin}
        style={{ marginTop: theme.SPACING.md }}
      />

      <View style={{ marginTop: theme.SPACING.md }}>
        <Button
          title="Create account"
          variant="secondary"
          onPress={() => navigation.navigate('Signup')}
        />
      </View>
    </ScrollView>
  );
}
