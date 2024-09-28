import { create } from 'zustand';

interface State {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const createModalStore = (initialState: boolean) =>
  create<State>((set) => ({
    isOpen: initialState,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
  }));

const useStartDateModal = createModalStore(false);
const useEndDateModal = createModalStore(false);
const useTimeModal = createModalStore(false);
const useLogOutModal = createModalStore(false);
const useQuitMakeMeetingModal = createModalStore(false);

export {
  useStartDateModal,
  useEndDateModal,
  useTimeModal,
  useLogOutModal,
  useQuitMakeMeetingModal,
};
