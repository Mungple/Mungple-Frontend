// src/state/useMapStore.ts
import create from 'zustand';

interface Zone {
  latitude: number;
  longitude: number;
  weight?: number; // 히트맵 데이터의 경우
}

interface MapState {
  showPersonalBlueZone: boolean;
  showGlobalBlueZone: boolean;
  showRedZone: boolean;
  showMungPlace: boolean;
  personalBlueZones: Zone[];
  globalBlueZones: Zone[];
  redZones: Zone[];
  mungPlaces: Zone[];
  markers: { id: string; latitude: number; longitude: number; title: string; body: string; imageUri?: string }[]; // 마커 데이터 추가
  togglePersonalBlueZone: () => void;
  toggleGlobalBlueZone: () => void;
  toggleRedZone: () => void;
  toggleMungPlace: () => void;
  fetchPersonalBlueZone: (latitude: number, longitude: number) => void;
  fetchGlobalBlueZone: (latitude: number, longitude: number) => void;
  fetchRedZone: (latitude: number, longitude: number) => void;
  fetchMungPlace: (latitude: number, longitude: number) => void;
  addMarker: (marker: { id: string; latitude: number; longitude: number; title: string; body: string; imageUri?: string }) => void;
}

export const useMapStore = create<MapState>((set) => ({
  showPersonalBlueZone: false,
  showGlobalBlueZone: false,
  showRedZone: false,
  showMungPlace: false,
  personalBlueZones: [],
  globalBlueZones: [],
  redZones: [],
  mungPlaces: [],
  markers: [], // 마커 초기 상태

  togglePersonalBlueZone: () => set((state) => ({ showPersonalBlueZone: !state.showPersonalBlueZone })),
  toggleGlobalBlueZone: () => set((state) => ({ showGlobalBlueZone: !state.showGlobalBlueZone })),
  toggleRedZone: () => set((state) => ({ showRedZone: !state.showRedZone })),
  toggleMungPlace: () => set((state) => ({ showMungPlace: !state.showMungPlace })),

  fetchPersonalBlueZone: async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(`/users/{userId}/bluezone`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf8',
        },
        body: JSON.stringify({
          userId: 'your-user-id', // 실제 userId로 교체
          latitude,
          longitude,
          radius: 500,
          year: new Date().getFullYear(),
          month: new Date().getMonth() + 1,
        }),
      });
      const data = await response.json();
      set({ personalBlueZones: data.points });
    } catch (error) {
      console.error('Failed to fetch personal blue zone', error);
    }
  },

  fetchGlobalBlueZone: async (latitude: number, longitude: number) => {
    try {
      const response = await fetch('/bluezone', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf8',
        },
        body: JSON.stringify({
          latitude,
          longitude,
          radius: 500,
        }),
      });
      const data = await response.json();
      set({ globalBlueZones: data.points });
    } catch (error) {
      console.error('Failed to fetch global blue zone', error);
    }
  },

  fetchRedZone: async (latitude: number, longitude: number) => {
    try {
      const response = await fetch('/redzone', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf8',
        },
        body: JSON.stringify({
          latitude,
          longitude,
          radius: 500,
        }),
      });
      const data = await response.json();
      set({ redZones: data.points });
    } catch (error) {
      console.error('Failed to fetch red zone', error);
    }
  },

  fetchMungPlace: async (latitude: number, longitude: number) => {
    try {
      const response = await fetch('/mungplace', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf8',
        },
        body: JSON.stringify({
          latitude,
          longitude,
        }),
      });
      const data = await response.json();
      set({ mungPlaces: data.points });
    } catch (error) {
      console.error('Failed to fetch mung place', error);
    }
  },

  addMarker: (marker) => set((state) => ({
    markers: [...state.markers, marker],
  })),
}));
