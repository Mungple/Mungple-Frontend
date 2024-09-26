import {create} from 'zustand';
import {Exploration} from '@/types';

interface AppState {
  token: string;
  isLogin: boolean;
  exploration: Exploration;
  walkingStart: boolean;
  setToken: (value: string) => void;
  setLogin: (value: boolean) => void;
  setWalkingStart: (value: boolean) => void;
}

export const useAppStore = create<AppState>(set => ({
  token: '',
  isLogin: false,
  exploration: {
    explorationId: 0,
    distance: 0,
    startAt: new Date(2000, 1, 1),
    endAt: new Date(2000, 1, 1),
  },
  walkingStart: false,
  setToken: (value: string) => set({token: value}),
  setLogin: (value: boolean) => set({isLogin: value}),
  setWalkingStart: (value: boolean) => set({walkingStart: value}),
}));
