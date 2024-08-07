import moment from 'moment';
import { create } from 'zustand';

interface State {
  date: string;
  updateDate: (updateDate: string) => void;
}

const createDateStore = () =>
  create<State>((set) => ({
    date: moment(new Date()).format('YYYY-MM-DD'),
    updateDate: (updatedDate) => set(() => ({ date: updatedDate })),
  }));

const useStartDateStore = createDateStore();
const useEndDateStore = createDateStore();

export { useStartDateStore, useEndDateStore };
