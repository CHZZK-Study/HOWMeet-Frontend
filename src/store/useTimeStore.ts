import { create } from 'zustand';

interface State {
  time: string;
  updateTime: (updateTime: string) => void;
  resetTime: () => void;
}

const createTimeStore = () =>
  create<State>((set) => ({
    time: '0:00',
    updateTime: (updatedTime) => set(() => ({ time: updatedTime })),
    resetTime: () => set(() => ({ time: '0:00' })),
  }));

const useStartTimeStore = createTimeStore();
const useEndTimeStore = createTimeStore();

export { useStartTimeStore, useEndTimeStore };
