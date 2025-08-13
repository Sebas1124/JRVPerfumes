import React from 'react';
import { Snackbar, Alert } from '@mui/material';
import { useSnackbarStore } from '../../store/snackbarStore';

export const GlobalSnackbar: React.FC = () => {
  const {
    open,
    message,
    severity,
    duration,
    vertical,
    horizontal,
    hideSnackbar
  } = useSnackbarStore();

  const handleClose = (_?: React.SyntheticEvent | Event, __?: string) => {
    // Permite cerrar al hacer clic fuera, pero podrías cambiarlo
    // if (reason === 'clickaway') {
    //   return;
    // }
    hideSnackbar();
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      autoHideDuration={duration} // null para que no se oculte solo
      onClose={handleClose}
      // Message prop is deprecated, Alert component should be used as a child
    >
      {/* El onClose en Alert es para el botón 'x' DENTRO del Alert,
        mientras que el onClose del Snackbar es para cuando se cierra por duración o clickaway.
        Ambos deben llamar a hideSnackbar.
      */}
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  );
};