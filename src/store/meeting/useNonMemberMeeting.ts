import { create } from 'zustand';

interface State {
  meetingId: string;
  setMeetingId: (value: string) => void;
}

const useNonMemberMeetingStore = create<State>((set) => ({
  meetingId: '',
  setMeetingId: (updatedMeetingId) => set({ meetingId: updatedMeetingId }),
}));

export default useNonMemberMeetingStore;
