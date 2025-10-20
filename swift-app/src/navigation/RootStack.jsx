import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainTabs from './MainTabs';
import OnboardingStack from './OnboardingStack';
import EscrowStack from './EscrowStack';
import { useAuth } from '../contexts/AuthContext';
import { ThemeContext } from '../contexts/ThemeContext';

const Stack = createNativeStackNavigator();

export default function RootStack() {
  const { user } = useAuth();
  const { theme } = useContext(ThemeContext);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user ? (
        <Stack.Screen name="Onboarding" component={OnboardingStack} />
      ) : (
        <>
          <Stack.Screen name="MainTabs" component={MainTabs} />
          <Stack.Screen
            name="EscrowStack"
            component={EscrowStack}
            options={{
              title: '',
              headerBackTitleVisible: false,
              headerStyle: { backgroundColor: theme.background },
              headerTintColor: theme.primary,
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
