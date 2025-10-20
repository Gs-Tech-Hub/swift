import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import WalletStack from './WalletStack';
import MarketplaceStack from './MarketplaceStack';
import FinanceStack from './FinanceStack'; 
import ProfileStack from './ProfileStack';
import MerchantStack from './MerchantStack';
import { ThemeContext } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  const { theme } = useContext(ThemeContext);
  const { user } = useAuth();

  return (
    <Tab.Navigator
      initialRouteName="Wallet"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: theme?.accent || '#04366bff',
        tabBarInactiveTintColor: theme?.textMuted || '#ABAFB5',
        tabBarStyle: {
          backgroundColor: theme?.background || '#fff',
          borderTopColor: theme?.border || '#E5E5EA',
        },
        tabBarIcon: ({ color }) => {
          let iconName;
          switch (route.name) {
            case 'Wallet':
              iconName = 'wallet-outline';
              break;
            case 'Marketplace':
              iconName = 'cart-outline';
              break;
            case 'Finance':
              iconName = 'stats-chart-outline';
               break;

            case 'Profile':
              iconName = 'person-outline';
              break;
            case 'Merchant':
              iconName = 'speedometer-outline';
              break;
            default:
              iconName = 'ellipse-outline';
          }
          return <Icon name={iconName} size={24} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Wallet" component={WalletStack} />
      <Tab.Screen name="Marketplace" component={MarketplaceStack} />
      <Tab.Screen name="Finance" component={FinanceStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />

      {/* Only show Merchant tab if user is merchant */}
      {user && user.isMerchant && (
        <Tab.Screen name="Merchant" component={MerchantStack} />
      )}
    </Tab.Navigator>
  );
}
