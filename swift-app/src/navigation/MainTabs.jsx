import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import WalletStack from './WalletStack'
import WalletHome from '../screens/Wallet/WalletHome';
import MarketplaceHome from '../screens/Marketplace/MarketplaceHome';
import HistoryScreen from '../screens/History/HistoryScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import { ThemeContext } from '../contexts/ThemeContext';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  const { theme } = useContext(ThemeContext);

  return (
    <Tab.Navigator
      initialRouteName="Wallet"
      screenOptions={({ route }) => ({
        headerShown: true,
        headerTitleStyle: {
          fontSize: theme?.FONTS?.large || 16,
          fontFamily: 'System', // or your custom font
          color: theme?.primary || '#0E1D21',
        },
        headerStyle: {
          backgroundColor: theme?.background || '#fff',
          borderBottomColor: theme?.border || '#ccc',
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: theme?.accent || '#04366bff',
        tabBarInactiveTintColor: theme?.textMuted || '#ABAFB5',
        tabBarStyle: {
          backgroundColor: theme?.background || '#fff',
          borderTopColor: theme?.border || '#ccc',
        },
        tabBarIcon: ({ color }) => {
          let iconName;
          switch (route.name) {
            case 'Wallet': iconName = 'wallet-outline'; break;
            case 'Marketplace': iconName = 'cart-outline'; break;
            case 'History': iconName = 'time-outline'; break;
            case 'Profile': iconName = 'person-outline'; break;
          }
          return <Icon name={iconName} size={28} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Wallet" component={WalletStack} options={{headerShown: false}} />
      <Tab.Screen name="Marketplace" component={MarketplaceHome} options={{headerShown: false}} />
      <Tab.Screen name="History" component={HistoryScreen} options={{headerShown: false}} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{headerShown: false}} />
    </Tab.Navigator>
  );
}
