import moment from 'moment';
import { create } from 'zustand';

interface State {
  date: string;
  updateDate: (updateDate: string) => void;
  resetDate: () => void;
}

const createDateStore = () =>
  create<State>((set) => ({
    date: moment(new Date()).format('YYYY-MM-DD'),
    updateDate: (updatedDate) => set(() => ({ date: updatedDate })),
    resetDate: () =>
      set(() => ({ date: moment(new Date()).format('YYYY-MM-DD') })),
  }));

const useStartDateStore = createDateStore();
const useEndDateStore = createDateStore();

export { useStartDateStore, useEndDateStore };
