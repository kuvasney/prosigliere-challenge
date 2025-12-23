import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface HouseState {
  selectedHouse: string;
  setSelectedHouse: (house: string) => void;
}

export const useHouseStore = create<HouseState>()(
  persist(
    (set) => ({
      selectedHouse: '',
      setSelectedHouse: (house) => set({ selectedHouse: house }),
    }),
    { 
      name: 'house-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);