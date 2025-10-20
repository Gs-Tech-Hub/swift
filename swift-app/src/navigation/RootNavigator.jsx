import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import RootStack from './RootStack';
import { useTheme } from '../contexts/ThemeContext';

export default function RootNavigator() {
  const { theme, isDarkMode } = useTheme();

  const navTheme = {
    ...DefaultTheme,
    dark: isDarkMode,
    colors: {
      primary: theme?.accent || '#0E1D21',
      background: theme?.background || '#fff',
      card: theme?.background || '#fff',
      text: theme?.primary || '#000',
      border: theme?.border || '#ccc',
      notification: theme?.accent || '#0E1D21',
    },
  };

  return (
    <NavigationContainer theme={navTheme}>
      <RootStack />
    </NavigationContainer>
  );
}
