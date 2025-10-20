import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MerchantHome from "../screens/Merchant/MerchantHome";
import AddProductScreen from "../screens/Merchant/AddProductScreen";
import ManageProductsScreen from "../screens/Merchant/ManageProductsScreen";
import MerchantOrdersScreen from "../screens/Merchant/MerchantOrdersScreen";
import DisputeManagerScreen from "../screens/Merchant/DisputeManagerScreen";
const Stack = createStackNavigator();

export default function MerchantStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MerchantHome" component={MerchantHome} />
      <Stack.Screen name="AddProductScreen" component={AddProductScreen} />
      <Stack.Screen name="ManageProductsScreen" component={ManageProductsScreen} />
      <Stack.Screen name="MerchantOrdersScreen" component={MerchantOrdersScreen} />
      <Stack.Screen name="DisputeManagerScreen" component={DisputeManagerScreen} />
    </Stack.Navigator>
  );
}
