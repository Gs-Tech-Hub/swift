import { createStackNavigator } from "@react-navigation/stack";
import MarketplaceHome from "../screens/Marketplace/MarketplaceHome";
import ProductDetailScreen from "../screens/Marketplace/ProductDetailScreen";

const Stack = createStackNavigator();

export default function MarketplaceStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MarketplaceHome" component={MarketplaceHome} />
      <Stack.Screen name="ProductDetailScreen" component={ProductDetailScreen} />
    </Stack.Navigator>
  );
}
