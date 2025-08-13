import { create } from 'zustand';
import type { AlertColor } from '@mui/material/Alert'; // Tipo para la severidad

interface SnackbarState {
    open: boolean;
    message: string;
    severity: AlertColor; // 'success' | 'error' | 'warning' | 'info'
    duration: number | null; // null para que no se cierre automáticamente
    vertical: 'top' | 'bottom';
    horizontal: 'left' | 'center' | 'right';
    showSnackbar: (
        message: string,
        severity?: AlertColor,
        duration?: number | null,
        vertical?: 'top' | 'bottom',
        horizontal?: 'left' | 'center' | 'right'
    ) => void;
    hideSnackbar: () => void;
}

export const useSnackbarStore = create<SnackbarState>((set) => ({
    open: false,
    message: '',
    severity: 'info', // Severidad por defecto
    duration: 6000,   // Duración por defecto (6 segundos)
    vertical: 'bottom',
    horizontal: 'center',

    showSnackbar: (
        message,
        severity = 'info',
        duration = 6000,
        vertical = 'bottom',
        horizontal = 'center'
    ) => set({
        open: true,
        message,
        severity,
        duration,
        vertical,
        horizontal,
    }),

    hideSnackbar: () => set({ open: false }),
}));