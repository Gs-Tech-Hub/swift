import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import UpgradeMerchantScreen from "../screens/Profile/UpgradeMerchantScreen";


const Stack = createStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    
      <Stack.Screen name="UpgradeMerchantScreen" component={UpgradeMerchantScreen} />
    </Stack.Navigator>
  );
}
