import React, { createContext, useContext, useState } from 'react';
import * as authApi from '../api/authApi';
const AuthContext = createContext(null);
export function AuthProvider({children}){
  const [user,setUser]=useState(null);
  const signup = async (p)=> await authApi.signup(p);
  const verifyOtp = async (p)=> await authApi.verifyOtp(p);
  const setPasscode = async (p)=> await authApi.setPasscode(p);
  const setTxnPin = async (p)=> await authApi.setTxnPin(p);
  const login = async (p)=> { const r = await authApi.login(p); if(r.success) setUser(r.user); return r; };
  const uploadKyc = async (p)=> { const r=await authApi.uploadKyc(p); if(r.success) setUser(prev=> ({...prev, kyc:r.kyc})); return r; };
  return <AuthContext.Provider value={{user,signup,verifyOtp,setPasscode,setTxnPin,login,uploadKyc,setUser}}>{children}</AuthContext.Provider>
}
export const useAuth=()=> useContext(AuthContext);
