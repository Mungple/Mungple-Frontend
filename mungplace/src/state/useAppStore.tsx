import { create } from 'zustand';
import { StartExplorate } from '@/types';

interface AppState {
  token: string | null;
  distance: number;
  isLogin: boolean;
  isSocket: boolean;
  startExplorate: StartExplorate | null;

  setToken: (value: string) => void;
  setLogin: (value: boolean) => void;
  setDistance: (value: number) => void;
  setIsSocket: (value: boolean) => void;
  setStartExplorate: (value: StartExplorate) => void;
}

export const useAppStore = create<AppState>((set) => ({
  token: '',
  distance: 0,
  isLogin: false,
  isSocket: false,
  startExplorate: null,

  setToken: (value: string) => set({ token: value }),
  setLogin: (value: boolean) => set({ isLogin: value }),
  setDistance: (value: number) => set({ distance: value }),
  setIsSocket: (value: boolean) => set({ isSocket: value }),
  setStartExplorate: (value: StartExplorate) => set({ startExplorate: value }),
}));
