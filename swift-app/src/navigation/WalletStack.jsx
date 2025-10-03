import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WalletHome from '../screens/Wallet/WalletHome';
import DepositScreen from '../screens/Wallet/DepositScreen';
import WithdrawScreen from '../screens/Wallet/WithdrawScreen'
import TransferScreen from '../screens/Wallet/TransferScreen'
import AirtimeScreen from '../screens/Wallet/AirtimeScreen'
import DataScreen from '../screens/Wallet/DataScreen'
import BillsScreen from '../screens/Wallet/BillsScreen';
import CreditScreen from '../screens/Wallet/CreditScreen';

const Stack = createStackNavigator();

export default function WalletStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="WalletHome" component={WalletHome} />
      <Stack.Screen name="DepositScreen" component={DepositScreen} />
      <Stack.Screen name="WithdrawScreen" component={WithdrawScreen} />
      <Stack.Screen name="TransferScreen" component={TransferScreen} />
      <Stack.Screen name="AirtimeScreen" component={AirtimeScreen} />
      <Stack.Screen name="DataScreen" component={DataScreen} />
      <Stack.Screen name="BillsScreen" component={BillsScreen} />
      <Stack.Screen name="CreditScreen" component={CreditScreen} />
    </Stack.Navigator>
  );
}
