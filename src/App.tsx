import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './router/AppRouter'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useThemeStore } from './store/useThemeStore';
import { getTheme } from './styles/theme';
import { ThemeProvider } from '@mui/material';

const queryClient = new QueryClient();

export const App = () => {

  const themeMode = useThemeStore((state) => state.mode);
  const theme = getTheme(themeMode);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <AppRouter />
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
