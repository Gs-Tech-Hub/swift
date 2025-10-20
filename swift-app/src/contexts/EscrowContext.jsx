import React, { createContext, useContext, useState } from "react";

const EscrowContext = createContext();

export const EscrowProvider = ({ children }) => {
  const [escrowTransactions, setEscrowTransactions] = useState([]);
  const [disputes, setDisputes] = useState([]); 

  const addEscrowTransaction = (item) => {
    const newTransaction = {
      id: Date.now(),
      item,
      status: "Pending",
      date: new Date().toLocaleDateString(),
    };
    setEscrowTransactions((prev) => [newTransaction, ...prev]);
  };

  
  const confirmDelivery = (id) => {
    setEscrowTransactions((prev) =>
      prev.map((tx) =>
        tx.id === id ? { ...tx, status: "Delivered" } : tx
      )
    );
  };

  const reportIssue = (id, reason) => {
    setEscrowTransactions((prev) =>
      prev.map((tx) =>
        tx.id === id ? { ...tx, status: "Issue Reported" } : tx
      )
    );

    const item = escrowTransactions.find((tx) => tx.id === id);

    const newDispute = {
      id: Date.now(),
      transactionId: id,
      itemName: item?.item?.name || "Escrow Item",
      buyer: item?.item?.buyer || "User", 
      reason,
      status: "Pending",
      date: new Date().toLocaleDateString(),
    };

    setDisputes((prev) => [newDispute, ...prev]);
  };

  // merchant or admin resolves dispute
  const resolveDispute = (id, resolution) => {
    setDisputes((prev) =>
      prev.map((d) =>
        d.id === id
          ? { ...d, status: resolution === "approve" ? "Resolved" : "Rejected" }
          : d
      )
    );
    
const reportIssue = (id, reason) => {
  setEscrowTransactions((prev) =>
    prev.map((tx) =>
      tx.id === id
        ? { ...tx, status: "Issue Reported", issueReason: reason }
        : tx
    )
  );
};


    // also update escrow transaction status accordingly
    setEscrowTransactions((prev) =>
      prev.map((tx) =>
        tx.id === id
          ? {
              ...tx,
              status:
                resolution === "approve"
                  ? "Refunded to Buyer"
                  : "Closed by Merchant",
            }
          : tx
      )
    );
  };

  return (
    <EscrowContext.Provider
      value={{
        escrowTransactions,
        disputes,
        addEscrowTransaction,
        confirmDelivery,
        reportIssue,
        resolveDispute,
      }}
    >
      {children}
    </EscrowContext.Provider>
  );
};

export const useEscrow = () => useContext(EscrowContext);
