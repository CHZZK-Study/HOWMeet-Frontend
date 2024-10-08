import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

interface User {
  username: string;
  id: string;
  isMember: boolean;
}

interface Store {
  user: User | null;
  setUser: (userData: User | null) => void;
}

const useUserStore = create<Store>()(
  devtools(
    persist<Store>(
      (set) => ({
        user: null,
        setUser: (userData: User | null) => {
          set(() => ({ user: userData }));
        },
      }),
      {
        name: 'UserStore',
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);

export default useUserStore;
