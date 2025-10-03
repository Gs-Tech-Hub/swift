// Mock wallet API (replace with real backend later)

export const getWalletBalance = async () => {
  // Simulate API call
  return {
    balance: 5000,
    currency: "NGN",
  };
};

export const getTransactionHistory = async () => {
  return [
    { id: 1, type: "Deposit", amount: 2000, date: "2025-09-21" },
    { id: 2, type: "Withdraw", amount: 1000, date: "2025-09-23" },
    { id: 3, type: "Transfer", amount: 500, date: "2025-09-25" },
  ];
};

