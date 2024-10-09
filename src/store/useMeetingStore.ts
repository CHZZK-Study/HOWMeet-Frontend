import { create } from 'zustand';

interface State {
  title: string;
  setTitle: (value: string) => void;
  resetTitle: () => void;
}

const useMeetingStore = create<State>((set) => ({
  title: '',
  setTitle: (updatedTitle) => set(() => ({ title: updatedTitle })),
  resetTitle: () => set(() => ({ title: '' })),
}));

export default useMeetingStore;
