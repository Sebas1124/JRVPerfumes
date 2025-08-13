import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { PaletteMode } from '@mui/material';

interface ThemeState {
  mode: PaletteMode;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      mode: 'light', // Estado inicial por defecto
      toggleTheme: () =>
        set((state) => ({
          mode: state.mode === 'light' ? 'dark' : 'light',
        })),
    }),
    {
      name: 'theme-storage', // Nombre de la clave en localStorage
      storage: createJSONStorage(() => localStorage), // Usa localStorage
      // Opcional: si tuvieras más estado, podrías elegir qué persistir:
      // partialize: (state) => ({ mode: state.mode }),
    }
  )
);
