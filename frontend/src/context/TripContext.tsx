import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Destination } from '@/data/mockData';

export interface TripDetails {
  startingLocation: string;
  startDate: string;
  endDate: string;
  numberOfPeople: number;
  travelType: string;
  budgetRange: string;
  budgetMin: number;
  budgetMax: number;
}

interface TripContextType {
  tripDetails: TripDetails;
  setTripDetails: React.Dispatch<React.SetStateAction<TripDetails>>;
  selectedDestinations: Destination[];
  setSelectedDestinations: React.Dispatch<React.SetStateAction<Destination[]>>;
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

const TripContext = createContext<TripContextType | undefined>(undefined);

export const TripProvider = ({ children }: { children: ReactNode }) => {
  const [tripDetails, setTripDetails] = useState<TripDetails>({
    startingLocation: '',
    startDate: '',
    endDate: '',
    numberOfPeople: 1,
    travelType: '',
    budgetRange: '',
    budgetMin: 0,
    budgetMax: 0
  });

  const [selectedDestinations, setSelectedDestinations] = useState<Destination[]>([]);
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <TripContext.Provider value={{
      tripDetails,
      setTripDetails,
      selectedDestinations,
      setSelectedDestinations,
      currentStep,
      setCurrentStep
    }}>
      {children}
    </TripContext.Provider>
  );
};

export const useTripContext = () => {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error('useTripContext must be used within a TripProvider');
  }
  return context;
};
