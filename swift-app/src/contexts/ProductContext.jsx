import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProductContext = createContext();
export const useProducts = () => useContext(ProductContext);

const PRODUCTS_KEY = "app_products_v1";
const ORDERS_KEY = "app_orders_v1";

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const p = await AsyncStorage.getItem(PRODUCTS_KEY);
        const o = await AsyncStorage.getItem(ORDERS_KEY);
        if (p) setProducts(JSON.parse(p));
        if (o) setOrders(JSON.parse(o));
      } catch (err) {
        console.warn("ProductContext load err", err);
      }
    })();
  }, []);

  const persistProducts = async (next) => {
    setProducts(next);
    await AsyncStorage.setItem(PRODUCTS_KEY, JSON.stringify(next));
  };

  const persistOrders = async (next) => {
    setOrders(next);
    await AsyncStorage.setItem(ORDERS_KEY, JSON.stringify(next));
  };

  const addProduct = async (payload) => {
    const item = { ...payload, id: Date.now().toString(), createdAt: new Date().toISOString() };
    const next = [item, ...products];
    await persistProducts(next);
    return item;
  };

  const deleteProduct = async (id) => {
    const next = products.filter((p) => p.id !== id);
    await persistProducts(next);
  };

  const recordOrder = async ({ productId, productName, amount, buyer = "Anonymous" }) => {
    const order = {
      id: Date.now().toString(),
      productId,
      productName,
      amount,
      buyer,
      status: "paid",
      createdAt: new Date().toISOString(),
    };
    const next = [order, ...orders];
    await persistOrders(next);
    return order;
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, deleteProduct, orders, recordOrder }}>
      {children}
    </ProductContext.Provider>
  );
};
