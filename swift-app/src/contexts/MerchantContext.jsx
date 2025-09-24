import React, { createContext, useContext, useEffect, useState } from 'react';
const MerchantContext = createContext(null);
export function MerchantProvider({children}){
  const [dashboard,setDashboard]=useState({totalSales:0,pendingEscrow:0,disputes:0});
  useEffect(()=>{},[]);
  return <MerchantContext.Provider value={{dashboard}}>{children}</MerchantContext.Provider>
}
export const useMerchant=()=> useContext(MerchantContext);
