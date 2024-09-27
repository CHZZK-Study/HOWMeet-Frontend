import { create } from 'zustand';

interface State {
  title: string;
  setTitle: (value: string) => void;
}

const useMeetingStore = create<State>((set) => ({
  title: '',
  setTitle: (updatedTitle) => set(() => ({ title: updatedTitle })),
}));

export default useMeetingStore;
