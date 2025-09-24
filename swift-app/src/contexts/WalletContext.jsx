import React, { createContext, useContext, useEffect, useState } from 'react';
import { seedWallet } from '../api/walletApi';
const WalletContext = createContext(null);
export function WalletProvider({children}){
  const [balance,setBalance]=useState(10000);
  const [transactions,setTransactions]=useState([]);
  useEffect(()=>{},[]);
  const deposit = (amt)=>{ setBalance(b=> b+Number(amt)); setTransactions(t=> [{id:Date.now().toString(), title:'Deposit', amount:Number(amt), type:'Deposit', date:new Date().toISOString()}, ...t]); };
  const withdraw = (amt)=>{ setBalance(b=> b-Number(amt)); setTransactions(t=> [{id:Date.now().toString(), title:'Withdraw', amount:-Number(amt), type:'Withdraw', date:new Date().toISOString()}, ...t]); };
  const transfer = (to,amt)=>{ setBalance(b=> b-Number(amt)); setTransactions(t=> [{id:Date.now().toString(), title:`Transfer to ${to}`, amount:-Number(amt), type:'Transfer', date:new Date().toISOString()}, ...t]); };
  return <WalletContext.Provider value={{balance,transactions,deposit,withdraw,transfer}}>{children}</WalletContext.Provider>;
}
export const useWallet=()=> useContext(WalletContext);
