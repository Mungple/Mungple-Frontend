import {create} from 'zustand';
import useAuth from '@/hooks/queries/useAuth';

interface AppState {
  isLogin: boolean;
  walkingStart: boolean;
  setLogin: (value: boolean) => void;
  setWalkingStart: (value: boolean) => void;
}

export const useAppStore = create<AppState>(set => ({
  isLogin: false,
  walkingStart: false,
  setLogin: (value: boolean) => set({isLogin: value}),
  setWalkingStart: (value: boolean) => set({walkingStart: value}),
}));