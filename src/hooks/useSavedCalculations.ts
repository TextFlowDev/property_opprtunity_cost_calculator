import { useState, useEffect } from 'react';
import { CalculationResults } from '../utils/calculations';

export interface SavedCalculation {
  id: string;
  timestamp: number;
  label: string;
  inputs: {
    monthlyRent: number;
    monthsRenting: number;
    propertyPrice: number;
  };
  results: CalculationResults;
}

const STORAGE_KEY = 'saved_calculations';
const MAX_SAVED = 10; // Maximum number of saved calculations

export const useSavedCalculations = () => {
  const [savedCalculations, setSavedCalculations] = useState<SavedCalculation[]>([]);

  // Load saved calculations from localStorage on mount
  useEffect(() => {
    loadSavedCalculations();
  }, []);

  const loadSavedCalculations = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setSavedCalculations(parsed);
      }
    } catch (error) {
      console.error('Error loading saved calculations:', error);
    }
  };

  const saveCalculation = (
    inputs: { monthlyRent: number; monthsRenting: number; propertyPrice: number },
    results: CalculationResults,
    label?: string
  ): string => {
    const id = `calc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const timestamp = Date.now();
    
    const newCalculation: SavedCalculation = {
      id,
      timestamp,
      label: label || `Calculation ${new Date(timestamp).toLocaleString()}`,
      inputs,
      results
    };

    try {
      // Add new calculation to the beginning
      let updatedCalculations = [newCalculation, ...savedCalculations];
      
      // Keep only the most recent MAX_SAVED calculations
      if (updatedCalculations.length > MAX_SAVED) {
        updatedCalculations = updatedCalculations.slice(0, MAX_SAVED);
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCalculations));
      setSavedCalculations(updatedCalculations);

      return id;
    } catch (error) {
      console.error('Error saving calculation:', error);
      throw new Error('Failed to save calculation');
    }
  };

  const deleteCalculation = (id: string) => {
    try {
      const updatedCalculations = savedCalculations.filter(calc => calc.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCalculations));
      setSavedCalculations(updatedCalculations);
    } catch (error) {
      console.error('Error deleting calculation:', error);
      throw new Error('Failed to delete calculation');
    }
  };

  const clearAllCalculations = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setSavedCalculations([]);
    } catch (error) {
      console.error('Error clearing calculations:', error);
      throw new Error('Failed to clear calculations');
    }
  };

  const getCalculationById = (id: string): SavedCalculation | undefined => {
    return savedCalculations.find(calc => calc.id === id);
  };

  return {
    savedCalculations,
    saveCalculation,
    deleteCalculation,
    clearAllCalculations,
    getCalculationById,
    hasSavedCalculations: savedCalculations.length > 0
  };
};

