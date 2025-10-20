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
import { FinanceProvider } from './src/contexts/FinanceContext';
import { ProductProvider } from './src/contexts/ProductContext';
import { SavingsProvider } from './src/contexts/SavingsContext';
import { LoanProvider } from "./src/contexts/LoanContext";

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
          <SavingsProvider>
            <FinanceProvider>
              <CreditProvider>
                <LoanProvider>
                  <ProductProvider>
                    <MarketplaceProvider>
                      <EscrowProvider>
                        <MerchantProvider>
                          <AppContent />
                        </MerchantProvider>
                      </EscrowProvider>
                    </MarketplaceProvider>
                  </ProductProvider>
                </LoanProvider>
              </CreditProvider>
            </FinanceProvider>
          </SavingsProvider>
        </WalletProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
