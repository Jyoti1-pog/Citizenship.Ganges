import { create } from 'zustand'
import { type CitizenshipResult } from '@/utils/calculateCitizenship';

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

type AppState =
  | { status: 'landing' }
  | { status: 'form' }
  | { status: 'loading'; formData: FormData }
  | { status: 'result'; result: CitizenshipResult };

interface AppStore {
  state: AppState;
  setLanding: () => void;
  setForm: () => void;
  setLoading: (data: FormData) => void;
  setResult: (result: CitizenshipResult) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  state: { status: 'landing' },
  setLanding: () => set({ state: { status: 'landing' } }),
  setForm: () => set({ state: { status: 'form' } }),
  setLoading: (formData) => set({ state: { status: 'loading', formData } }),
  setResult: (result) => set({ state: { status: 'result', result } }),
}));
