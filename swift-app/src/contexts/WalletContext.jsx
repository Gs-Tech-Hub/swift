import React, { createContext, useState, useEffect } from "react";
import { getWalletBalance, getTransactionHistory } from "../api/walletApi";

export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [balance, setBalance] = useState(0);
  const [currency, setCurrency] = useState("NGN");
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Load wallet data when app starts
    async function fetchWalletData() {
      const walletData = await getWalletBalance();
      setBalance(walletData.balance);
      setCurrency(walletData.currency);

      const history = await getTransactionHistory();
      setTransactions(history);
    }

    fetchWalletData();
  }, []);

  return (
    <WalletContext.Provider
      value={{
        balance,
        currency,
        transactions,
        setBalance,
        setTransactions,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};


