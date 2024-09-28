import { create } from 'zustand';

interface State {
  time: string;
  updateTime: (updateTime: string) => void;
}

const createTimeStore = () =>
  create<State>((set) => ({
    time: '0:00',
    updateTime: (updatedTime) => set(() => ({ time: updatedTime })),
  }));

const useStartTimeStore = createTimeStore();
const useEndTimeStore = createTimeStore();

export { useStartTimeStore, useEndTimeStore };
