import React, { createContext, useContext, useEffect, useState } from 'react';
const CreditContext = createContext(null);
export function CreditProvider({children}){
  const [score,setScore]=useState(500);
  const [limit,setLimit]=useState(0);
  useEffect(()=>{ updateLimit(500); },[]);
  const updateLimit=(s)=>{ if(s<=500) setLimit(0); else if(s<=650) setLimit(20000); else if(s<=750) setLimit(50000); else setLimit(100000); };
  const applyAction=(a)=>{ if(a==='deposit'||a==='repay') setScore(s=> Math.min(850,s+5)); if(a==='bill') setScore(s=> Math.min(850,s+3)); if(a==='transfer') setScore(s=> Math.min(850,s+2)); updateLimit(score); };
  const applyBorrow = async (amount)=>{ setScore(s=> Math.max(300, s-5)); updateLimit(score-5); return {id:Date.now().toString(),amount,dueDate:new Date().toISOString()}; };
  const repayLoan = async (id)=> { setScore(s=> Math.min(850,s+10)); updateLimit(score+10); };
  return <CreditContext.Provider value={{score,limit,applyAction,applyBorrow,repayLoan}}>{children}</CreditContext.Provider>;
}
export const useCredit=()=> useContext(CreditContext);
