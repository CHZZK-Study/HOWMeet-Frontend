import { create } from 'zustand';

interface Store {
  roomName: string;
  setRoomName: (value: string) => void;
  resetRoomName: () => void;
}

const useMakeRoomStore = create<Store>((set) => ({
  roomName: '',
  setRoomName: (updatedName) => set({ roomName: updatedName }),
  resetRoomName: () => set({ roomName: '' }),
}));

export default useMakeRoomStore;
