import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { getTheme } from '../../../../../styles/theme';
import { useThemeStore } from '../../../../../store/useThemeStore';

export const AuthButtons = () => {

    const mode = useThemeStore((state) => state.mode);
    const navigate = useNavigate();
    const muiTheme = getTheme(mode);

  return (
    <>
        <Button
            variant="contained"
            color="primary"
            size="small"
            sx={{ 
                ml: 1, 
                textTransform: 'none', 
                fontSize: '0.875rem',
                fontWeight: 500,
                px: 2,
                '&:hover': {
                    bgcolor: muiTheme.palette.primary.dark,
                }
            }}
            onClick={() => navigate('/login')}
        >
            Ingresar
        </Button>
        <Button
            variant="outlined"
            color="primary"
            size="small"
            sx={{ 
                ml: 1, 
                textTransform: 'none', 
                fontSize: '0.875rem',
                fontWeight: 500,
                px: 2,
                '&:hover': {
                    bgcolor: muiTheme.palette.primary.light,
                    borderColor: muiTheme.palette.primary.main,
                }
            }}
            onClick={() => navigate('/register')}
        >
            Registrarse
        </Button>
    </>
  )
}
