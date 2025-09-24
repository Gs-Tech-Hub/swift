import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import OnboardingStack from './OnboardingStack';
import MainTabs from './MainTabs';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

export default function RootNavigator() {
  const { user } = useAuth();
  const { theme, isDarkMode } = useTheme();

  // Navigation theme with safe fallbacks
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
    fonts: theme?.FONTS || { regular: 16, medium: 18, large: 24, xlarge: 32 },
  };

  return (
    <NavigationContainer theme={navTheme}>
      {user ? <MainTabs /> : <OnboardingStack />}
    </NavigationContainer>
  );
}
