import React, { createContext, useContext, useEffect, useState } from 'react';
import * as mp from '../api/marketplaceApi';
const MarketplaceContext = createContext(null);
export function MarketplaceProvider({children}){
  const [products,setProducts]=useState([]);
  const [cart,setCart]=useState([]);
  useEffect(()=>{ (async ()=> setProducts(await mp.fetchProducts()))(); },[]);
  const addToCart=(p)=> setCart(c=> [...c,p]);
  const clearCart=()=> setCart([]);
  const addProduct= async(p)=> { await mp.addProduct(p); setProducts(await mp.fetchProducts()); };
  return <MarketplaceContext.Provider value={{products,cart,addToCart,clearCart,addProduct}}>{children}</MarketplaceContext.Provider>;
}
export const useMarketplace=()=> useContext(MarketplaceContext);
