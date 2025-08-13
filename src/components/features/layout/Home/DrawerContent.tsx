import { Box, Button, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom';

interface DrawerContentProps {
    isMobile: boolean;
    handleDrawerToggle: () => void;
    navItems: { text: string; icon: React.ReactNode; path: string }[];
    drawerWidth: number;
}

const NAMEAPP = import.meta.env.VITE_NAME_APP || 'DonaMe';

export const DrawerContent = ({ isMobile, handleDrawerToggle, navItems, drawerWidth = 240 }: DrawerContentProps) => {

    const navigate = useNavigate();
    
  return (
    <Box
        sx={{
            width: { xs: drawerWidth, md: drawerWidth },
            height: "100%",
            display: "flex",
            flexDirection: "column",
            bgcolor: "background.paper",
        }}
        role="presentation"
        onClick={isMobile ? handleDrawerToggle : undefined}
        >
        <Toolbar>
            <Typography variant="h6" noWrap>
            {NAMEAPP}
            </Typography>
        </Toolbar>
        <List>
            {navItems.map((item) => (
            <ListItem 
                key={item.text}
                onClick={() => {
                    navigate(item.path);
                    if (isMobile) handleDrawerToggle();
                }}
                sx={{ 
                    borderRadius: 2, 
                    '&:hover': { bgcolor: 'primary.light' },
                    color: 'text.primary',
                    cursor: 'pointer'
                }}
            >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
            </ListItem>
            ))}
        </List>
        <Box flexGrow={1} />
        <Box p={2}>
            <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => navigate('/login')}
                sx={{ borderRadius: 2 }}
            >
                Ingresar
            </Button>
        </Box>
    </Box>
  )
}
