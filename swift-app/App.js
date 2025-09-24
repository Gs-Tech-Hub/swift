import React from 'react';
import { StatusBar, SafeAreaView } from 'react-native';
import RootNavigator from './src/navigation/RootNavigator';
import { ThemeProvider, useTheme } from './src/contexts/ThemeContext';
import { AuthProvider } from './src/contexts/AuthContext';
import { WalletProvider } from './src/contexts/WalletContext';
import { MarketplaceProvider } from './src/contexts/MarketplaceContext';
import { EscrowProvider } from './src/contexts/EscrowContext';
import { MerchantProvider } from './src/contexts/MerchantContext';
import { CreditProvider } from './src/contexts/CreditContext';

function AppContent() {
  const { theme, isDarkMode } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <RootNavigator />
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <WalletProvider>
          <MarketplaceProvider>
            <EscrowProvider>
              <MerchantProvider>
                <CreditProvider>
                  <AppContent />
                </CreditProvider>
              </MerchantProvider>
            </EscrowProvider>
          </MarketplaceProvider>
        </WalletProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
