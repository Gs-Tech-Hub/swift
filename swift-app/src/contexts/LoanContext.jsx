
import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoanContext = createContext();
export const useLoan = () => useContext(LoanContext);

const LOAN_KEY = "app_loans_v1";

export const LoanProvider = ({ children }) => {
  const [outstandingLoan, setOutstandingLoan] = useState(0);
  const [loanHistory, setLoanHistory] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await AsyncStorage.getItem(LOAN_KEY);
        if (data) {
          const parsed = JSON.parse(data);
          setOutstandingLoan(parsed.outstandingLoan || 0);
          setLoanHistory(parsed.loanHistory || []);
        }
      } catch (err) {
        console.warn("LoanContext load error", err);
      }
    })();
  }, []);

  const persist = async (nextOutstanding, nextHistory) => {
    setOutstandingLoan(nextOutstanding);
    setLoanHistory(nextHistory);
    await AsyncStorage.setItem(
      LOAN_KEY,
      JSON.stringify({
        outstandingLoan: nextOutstanding,
        loanHistory: nextHistory,
      })
    );
  };

  const borrowLoan = async (amount, duration) => {
    const loan = {
      id: Date.now().toString(),
      amount,
      duration,
      status: "active",
      date: new Date().toLocaleString(),
    };
    const nextHistory = [loan, ...loanHistory];
    const nextOutstanding = outstandingLoan + amount;
    await persist(nextOutstanding, nextHistory);
    return loan;
  };

  const repayLoan = async (amount) => {
    const nextOutstanding = Math.max(0, outstandingLoan - amount);
    await persist(nextOutstanding, loanHistory);
    return nextOutstanding;
  };

  return (
    <LoanContext.Provider
      value={{
        outstandingLoan,
        loanHistory,
        borrowLoan,
        repayLoan,
      }}
    >
      {children}
    </LoanContext.Provider>
  );
};
