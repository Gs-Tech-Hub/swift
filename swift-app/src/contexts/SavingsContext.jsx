// src/contexts/SavingsContext.js
import React, { createContext, useState, useEffect } from 'react';

export const SavingsContext = createContext();

export const SavingsProvider = ({ children }) => {
  const [savingsBalance, setSavingsBalance] = useState(25000); 
  const [goals, setGoals] = useState([
    {
      id: 'g1',
      title: 'Vacation 2026',
      saved: 10000,
      target: 50000,
      color: '#60A5FA',
    },
    {
      id: 'g2',
      title: 'Emergency Fund',
      saved: 25000,
      target: 25000,
      color: '#34D399',
    },
  ]);
  const [activities, setActivities] = useState([
    { id: 'a1', type: 'deposit', label: 'Transfer to savings', amount: 5000, date: 'Oct 15' },
    { id: 'a2', type: 'goal-deposit', label: 'Saved to Vacation 2026', amount: 10000, date: 'Oct 05' },
  ]);

  useEffect(() => {
    // placeholder: fetch real data from API later
  }, []);

  const addToSavings = (amount, note = 'Deposit') => {
    setSavingsBalance(prev => prev + amount);
    setActivities(prev => [{ id: Date.now().toString(), type: 'deposit', label: note, amount, date: 'Today' }, ...prev]);
  };

  const withdrawFromSavings = (amount, note = 'Withdraw') => {
    setSavingsBalance(prev => Math.max(0, prev - amount));
    setActivities(prev => [{ id: Date.now().toString(), type: 'withdraw', label: note, amount, date: 'Today' }, ...prev]);
  };

  const createGoal = (goal) => {
    setGoals(prev => [{ ...goal, id: Date.now().toString() }, ...prev]);
  };

  const depositToGoal = (goalId, amount) => {
    setGoals(prev => prev.map(g => g.id === goalId ? { ...g, saved: g.saved + amount } : g));
    setSavingsBalance(prev => Math.max(0, prev - amount)); 
    setActivities(prev => [{ id: Date.now().toString(), type: 'goal-deposit', label: `Saved to ${goalId}`, amount, date: 'Today' }, ...prev]);
  };

  return (
    <SavingsContext.Provider value={{
      savingsBalance,
      goals,
      activities,
      addToSavings,
      withdrawFromSavings,
      createGoal,
      depositToGoal,
      setSavingsBalance,
    }}>
      {children}
    </SavingsContext.Provider>
  );
};
