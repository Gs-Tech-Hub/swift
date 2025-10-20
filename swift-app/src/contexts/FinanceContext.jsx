
import React, { createContext, useState } from "react";
import { useWallet } from "./WalletContext";
import { useTheme } from "./ThemeContext"; 

export const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
  
  const wallet = useWallet?.() || {};
  const themeHook = useTheme?.() || {};
  const walletBalance = wallet?.balance ?? 0;

  const [savingsBalance, setSavingsBalance] = useState(50000);
  const [availableCredit, setAvailableCredit] = useState(150000);
  const [loanBalance, setLoanBalance] = useState(30000);
  const [interestEarned, setInterestEarned] = useState(1200);

  const updateLoanBalance = async (delta) => {
    setLoanBalance((prev) => Math.max(0, prev + delta));
  };

  const updateSavingsBalance = async (delta) => {
    setSavingsBalance((prev) => Math.max(0, prev + delta));
  };

  return (
    <FinanceContext.Provider
      value={{
        walletBalance,
        savingsBalance,
        availableCredit,
        loanBalance,
        interestEarned,
        updateLoanBalance,
        updateSavingsBalance,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};
