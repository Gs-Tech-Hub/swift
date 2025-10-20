import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const WalletContext = createContext();
export const useWallet = () => useContext(WalletContext);

const WALLET_KEY = "app_wallet_v1";
const TX_KEY = "app_transactions_v1";
const NOTIF_KEY = "app_notifications_v1";

export const WalletProvider = ({ children }) => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [notifications, setNotifications] = useState([]);

  
  useEffect(() => {
    (async () => {
      try {
        const w = await AsyncStorage.getItem(WALLET_KEY);
        const tx = await AsyncStorage.getItem(TX_KEY);
        const nt = await AsyncStorage.getItem(NOTIF_KEY);
        if (w) setBalance(JSON.parse(w).balance || 0);
        if (tx) setTransactions(JSON.parse(tx));
        if (nt) setNotifications(JSON.parse(nt));
      } catch (err) {
        console.warn("WalletContext load err", err);
      }
    })();
  }, []);

  // persist helpers
  const persistWallet = async (newBalance) => {
    setBalance(newBalance);
    await AsyncStorage.setItem(WALLET_KEY, JSON.stringify({ balance: newBalance }));
  };

  const persistTransactions = async (txs) => {
    setTransactions(txs);
    await AsyncStorage.setItem(TX_KEY, JSON.stringify(txs));
  };

  const persistNotifications = async (nots) => {
    setNotifications(nots);
    await AsyncStorage.setItem(NOTIF_KEY, JSON.stringify(nots));
  };

  // transaction + notification helpers
  const addTransaction = async (type, amount, note = "") => {
    const tx = {
      id: Date.now().toString(),
      type,
      amount,
      note,
      date: new Date().toLocaleString(),
    };
    const next = [tx, ...transactions];
    await persistTransactions(next);
    return tx;
  };

  const pushNotification = async (message) => {
    const note = {
      id: Date.now().toString(),
      message,
      read: false,
      date: new Date().toLocaleString(),
    };
    const next = [note, ...notifications];
    await persistNotifications(next);
    return note;
  };

  const markNotificationRead = async (id) => {
    const next = notifications.map((n) => (n.id === id ? { ...n, read: true } : n));
    await persistNotifications(next);
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  // wallet operations
  const deposit = async (amount, note = "Deposit") => {
    const newBalance = Number(balance) + Number(amount);
    await persistWallet(newBalance);
    await addTransaction("Deposit", Number(amount), note);
    await pushNotification(`You deposited ₦${Number(amount).toLocaleString()}`);
    return newBalance;
  };

  const withdraw = async (amount, note = "Withdraw") => {
    if (Number(balance) < Number(amount)) throw new Error("INSUFFICIENT");
    const newBalance = Number(balance) - Number(amount);
    await persistWallet(newBalance);
    await addTransaction("Withdraw", Number(amount), note);
    await pushNotification(`You withdrew ₦${Number(amount).toLocaleString()}`);
    return newBalance;
  };

  const transfer = async (amount, to, note = "Transfer") => {
    if (Number(balance) < Number(amount)) throw new Error("INSUFFICIENT");
    const newBalance = Number(balance) - Number(amount);
    await persistWallet(newBalance);
    await addTransaction("Transfer", Number(amount), `${note} to ${to || "recipient"}`);
    await pushNotification(`You transferred ₦${Number(amount).toLocaleString()} to ${to || "recipient"}`);
    return newBalance;
  };

  const debitForPurchase = async (amount, note = "Purchase") => {
    if (Number(balance) < Number(amount)) throw new Error("INSUFFICIENT");
    const newBalance = Number(balance) - Number(amount);
    await persistWallet(newBalance);
    await addTransaction("Purchase", Number(amount), note);
    await pushNotification(`You were charged ₦${Number(amount).toLocaleString()} for ${note}`);
    return newBalance;
  };

  return (
    <WalletContext.Provider
      value={{
        balance,
        transactions,
        notifications,
        unreadCount,
        deposit,
        withdraw,
        transfer,
        debitForPurchase,
        addTransaction,
        pushNotification,
        markNotificationRead,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
