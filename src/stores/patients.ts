import { create } from "zustand";
import { mockPatients } from "@/lib/mock-data";
import type { Patient } from "@/types/patient";

interface PatientsState {
  patients: Patient[];
  isLoading: boolean;
  error: string | null;
  selectedPatientId: string | null;
  fetchPatients: () => Promise<void>;
  selectPatient: (id: string | null) => void;
}

export const usePatientsStore = create<PatientsState>((set) => ({
  patients: [],
  isLoading: false,
  error: null,
  selectedPatientId: null,

  fetchPatients: async () => {
    set({ isLoading: true, error: null });

    try {
      // Simulating API call with mock data
      await new Promise((resolve) => setTimeout(resolve, 500));
      const patients = mockPatients;
      set({ patients, isLoading: false });
    } catch (error) {
      console.error("Error fetching patients:", error);
      set({
        error: "Failed to fetch patients. Please try again.",
        isLoading: false,
      });
    }
  },

  selectPatient: (id) => {
    set({ selectedPatientId: id });
  },
}));
