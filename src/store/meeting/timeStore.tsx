// timeStore.ts
import create from 'zustand';

interface TimeSlot {
  hour: string;
  day: string;
  date: string;
  month: string;
}

interface TimeStore {
  selectedTimes: TimeSlot[];
  toggleTime: (time: TimeSlot) => void;
}

export const useTimeStore = create<TimeStore>((set) => ({
  selectedTimes: [],
  toggleTime: (time) =>
    set((state) => {
      const index = state.selectedTimes.findIndex(
        (t) => t.hour === time.hour && t.day === time.day
      );
      if (index > -1) {
        return {
          selectedTimes: state.selectedTimes.filter((_, i) => i !== index),
        };
      }
      return { selectedTimes: [...state.selectedTimes, time] };
    }),
}));
