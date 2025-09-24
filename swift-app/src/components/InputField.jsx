import React, { useContext } from 'react';
import { View, Text, TextInput } from 'react-native';
import { ThemeContext } from '../contexts/ThemeContext';

export default function InputField({ label, value, onChangeText, placeholder, secure }) {
  const { theme } = useContext(ThemeContext);

  return (
    <View style={{ marginBottom: 12 }}>
      {label && (
        <Text style={{ marginBottom: 6, color: theme.primary, fontWeight: '500' }}>
          {label}
        </Text>
      )}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.textMuted}
        secureTextEntry={secure}
        style={{
          borderWidth: 1,
          borderColor: theme.border,
          padding: 10,
          borderRadius: 8,
          color: theme.primary,
          backgroundColor: theme.background,
        }}
      />
    </View>
  );
}
