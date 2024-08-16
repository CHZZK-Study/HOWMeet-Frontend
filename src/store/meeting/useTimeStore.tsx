// timeStore.ts
import { ResultHeatmapCellInfo } from '@/types/ResultHeatmap';
import create from 'zustand';

interface TimeSlot {
  hour: string;
  minute: string;
  day: string;
  date: string;
  month: string;
}

interface TimeStore {
  selectedTimes: TimeSlot[];
  formatTime: string[];
  toggleTime: (time: TimeSlot) => void;
  selectedResult: ResultHeatmapCellInfo[];
  toggleSelectedResult: (result: ResultHeatmapCellInfo) => void;
}

export const useTimeStore = create<TimeStore>((set) => ({
  selectedTimes: [],
  formatTime: [],
  selectedResult: [],
  toggleSelectedResult: (result) =>
    set((state) => {
      const index = state.selectedResult.findIndex(
        (r) => r.time === result.time
      );
      if (index > -1) {
        return {
          selectedResult: state.selectedResult.filter((_, i) => i !== index),
        };
      }
      return {
        selectedResult: [...state.selectedResult, result],
      };
    }),
  toggleTime: (time) =>
    set((state) => {
      const index = state.selectedTimes.findIndex(
        (t) =>
          t.hour === time.hour && t.minute === time.minute && t.day === time.day
      );
      if (index > -1) {
        return {
          selectedTimes: state.selectedTimes.filter((_, i) => i !== index),
        };
      }
      return {
        selectedTimes: [...state.selectedTimes, time],
      };
    }),
}));
