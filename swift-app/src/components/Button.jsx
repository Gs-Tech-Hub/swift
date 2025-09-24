import React, { useContext } from 'react';
import { Pressable, Text } from 'react-native';
import { ThemeContext } from '../contexts/ThemeContext';

export default function Button({ title, onPress, variant = 'primary', style: extraStyle }) {
  const { theme } = useContext(ThemeContext);

  const style =
    variant === 'primary'
      ? {
          backgroundColor: theme.primary,
          padding: 12,
          borderRadius: 8,
          alignItems: 'center',
          ...extraStyle,
        }
      : {
          padding: 12,
          borderRadius: 8,
          alignItems: 'center',
          borderWidth: 1,
          borderColor: theme.secondary,
          ...extraStyle,
        };

  const textStyle =
    variant === 'primary'
      ? { color: theme.background, fontWeight: '700' }
      : { color: theme.primary, fontWeight: '700' };

  return (
    <Pressable style={style} onPress={onPress}>
      <Text style={textStyle}>{title}</Text>
    </Pressable>
  );
}
