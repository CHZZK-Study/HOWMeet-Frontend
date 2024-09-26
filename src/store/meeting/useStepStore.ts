import { Content } from '@/types/meeting';
import { create } from 'zustand';

interface State {
  step: Content;
  setStep: (stepName: Content) => void;
}

const useStepStore = create<State>((set) => ({
  step: 'make',
  setStep: (stepName) => set(() => ({ step: stepName })),
}));

export default useStepStore;
