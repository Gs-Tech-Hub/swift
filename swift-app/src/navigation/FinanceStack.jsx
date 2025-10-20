import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FinanceHome from '../screens/Finance/FinanceHome';
import CreditScreen from '../screens/Finance/CreditScreen';
import InsuranceHome from '../screens/Finance/Insurance/InsuranceHome';
import BuyPlan from '../screens/Finance/Insurance/BuyPlan';
import ClaimHistory from '../screens/Finance/Insurance/ClaimHistory';
import PlanDetail from '../screens/Finance/Insurance/PlanDetail';
import SubmitClaim from '../screens/Finance/Insurance/SubmitClaim';
import SavingsScreen from '../screens/Finance/Savings/SavingsScreen';
import GoalDetail from '../screens/Finance/Savings/GoalDetail';
import AddSavings from '../screens/Finance/Savings/AddSavings';
import CreateGoal from '../screens/Finance/Savings/CreateGoal'; // our CreateGoal component is named CreateGoal.jsx below
import WithdrawSavings from '../screens/Finance/Savings/WithdrawSavings';


const Stack = createStackNavigator();

export default function FinanceStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FinanceHome" component={FinanceHome} />
      <Stack.Screen name="Credit" component={CreditScreen} />
      <Stack.Screen name="InsuranceHome" component={InsuranceHome} />
      <Stack.Screen name="BuyPlan" component={BuyPlan} />
      <Stack.Screen name="ClaimHistory" component={ClaimHistory} />
      <Stack.Screen name="PlanDetail" component={PlanDetail} />
      <Stack.Screen name="SubmitClaim" component={SubmitClaim} />
      <Stack.Screen name="Savings" component={SavingsScreen} />
      <Stack.Screen name="GoalDetail" component={GoalDetail} />
      <Stack.Screen name="AddSavings" component={AddSavings} />
      <Stack.Screen name="CreateGoal" component={CreateGoal} />
      <Stack.Screen name="WithdrawSavings" component={WithdrawSavings} />
     
    </Stack.Navigator>
  );
}
