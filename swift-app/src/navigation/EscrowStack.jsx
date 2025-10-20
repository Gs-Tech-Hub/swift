import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EscrowScreen from '../screens/escrow/EscrowScreen';
import RaiseDisputeScreen from '../screens/escrow/RaiseDisputeScreen';

const Stack = createNativeStackNavigator();

export default function EscrowStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="EscrowHome" component={EscrowScreen} />
      <Stack.Screen name="RaiseDispute" component={RaiseDisputeScreen} />
    </Stack.Navigator>
  );
}
