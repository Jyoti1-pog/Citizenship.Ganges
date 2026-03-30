import { create } from 'zustand'

export type VisaStatus = 
  | 'Student Visa'
  | 'Work Permit'
  | 'Permanent Resident'
  | 'Investor Visa'
  | 'Temporary Protection'
  | 'Other';

export interface FormData {
  dob: Date;
  yearsLived: number;
  visaStatus: VisaStatus;
}

type AppState = { status: 'form' };

interface AppStore {
  state: AppState;
  setForm: () => void;
}

export const useAppStore = create<AppStore>((set) => ({
  state: { status: 'form' },
  setForm: () => set({ state: { status: 'form' } }),
}));
