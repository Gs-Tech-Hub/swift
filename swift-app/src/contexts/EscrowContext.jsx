import React, { createContext, useContext, useState } from 'react';
const EscrowContext = createContext(null);
export function EscrowProvider({children}){
  const [escrows,setEscrows]=useState([]);
  const createEscrow = async ({order})=> { const e={id:Date.now().toString(), order, status:'HELD'}; setEscrows(es=> [e,...es]); return e; };
  const releaseEscrow = (id)=> setEscrows(es=> es.map(x=> x.id===id? {...x,status:'RELEASED'}: x));
  const refundEscrow = (id)=> setEscrows(es=> es.map(x=> x.id===id? {...x,status:'REFUNDED'}: x));
  return <EscrowContext.Provider value={{escrows,createEscrow,releaseEscrow,refundEscrow}}>{children}</EscrowContext.Provider>
}
export const useEscrow=()=> useContext(EscrowContext);
