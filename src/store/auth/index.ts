import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IAuthState {
  username: string | null;
  name: string | null;
  access_token: string | null;
  setUser: (username: string, name: string, access_token: string) => void;
}

export const useAuthStore = create<IAuthState>()(
  persist(
    (set) => ({
      username: null,
      name: null,
      access_token: null,
      setUser: (username, name, access_token) =>
        set({ username, name, access_token }),
    }),
    {
      name: "user-session",
    }
  )
);
