import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation, Link } from 'react-router-dom';

// --- Dependencias de Material UI ---
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    ListItemIcon,
    Divider,
    IconButton,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';

// --- Dependencias de GSAP (instaladas vía npm) ---
// NOTA: Para el entorno de vista previa, se cambiará a carga por CDN,
// pero en tu entorno local, estas importaciones son las correctas.
import { gsap } from 'gsap';


// --- Componente Drawer (Sidebar) Optimizado ---
// Se saca como un componente separado y se memoiza para evitar re-renders.
const NavDrawer: React.FC<{
    open: boolean;
    onClose: () => void;
    currentPath: string;
    navItems: {
        text: string;
        icon: React.ReactNode;
        path: string;
    }[];
}> = React.memo(({ open, onClose, currentPath, navItems }) => {
    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            sx={{ '& .MuiDrawer-paper': { backgroundColor: '#141414', color: '#fff' } }}
        >
            <Box
                sx={{ width: 250 }}
                role="presentation"
                onClick={onClose}
                onKeyDown={onClose}
            >
                <Typography variant="h6" sx={{ p: 2, fontWeight: 'bold' }}>
                    JRV Perfumes
                </Typography>
                <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)' }} />
                <List>
                    {navItems.map((link) => (
                        <ListItem key={link.text} disablePadding>
                            <ListItemButton
                                component={Link}
                                to={link.path}
                                selected={currentPath === link.path}
                            >
                                <ListItemIcon sx={{ color: '#fff' }}>{link.icon}</ListItemIcon>
                                <ListItemText primary={link.text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Drawer>
    );
});
NavDrawer.displayName = 'NavDrawer';

interface NavItem {
    text: string;
    icon: React.ReactNode;
    path: string;
}

interface Props {
    navItems: NavItem[];
}

// --- Componente Principal Navbar Optimizado ---
export const NavbarComponent = ({ navItems }: Props) => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const location = useLocation();
    const activeLinkRef = useRef<HTMLDivElement>(null);
    const navLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);
    const navbarRef = useRef<HTMLHeadElement>(null);

    // Animación de entrada (se ejecuta una sola vez)
    useEffect(() => {
        gsap.from(navbarRef.current, {
            y: -100,
            duration: 1,
            ease: 'power3.out',
        });
    }, []);

    // Animación del indicador de enlace activo (más eficiente)
    useEffect(() => {
        const activeIndex = navItems.findIndex(link => link.path === location.pathname);
        const activeElement = navLinksRef.current[activeIndex];

        if (activeElement && activeLinkRef.current) {
            // Un solo tween de GSAP para animar la barra. Es más simple y performante.
            gsap.to(activeLinkRef.current, {
                width: activeElement.offsetWidth,
                x: activeElement.offsetLeft,
                duration: 0.5,
                ease: 'power3.inOut',
            });
        } else if (activeLinkRef.current) {
            // Si no hay enlace activo, ocultamos la barra
            gsap.to(activeLinkRef.current, {
                width: 0,
                duration: 0.5,
                ease: 'power3.inOut',
            });
        }
    }, [location.pathname]); // Solo se ejecuta cuando cambia la ruta

    // useCallback con dependencias vacías es seguro porque setDrawerOpen no cambia.
    const handleToggleDrawer = useCallback((open: boolean) => {
        setDrawerOpen(open);
    }, []);

    return (
        <>
            <AppBar
                ref={navbarRef}
                sx={{
                    backgroundColor: 'rgba(13, 13, 13, 0.8)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: 'none',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                }}
            >
                <Toolbar sx={{ justifyContent: 'space-between', height: '70px' }}>
                    <Typography variant="h5" component={Link} to="/" sx={{ textDecoration: 'none', color: 'white', fontWeight: 'bold' }}>
                        JRV
                    </Typography>

                    <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 4, position: 'relative' }}>
                        {navItems.map((link, index) => (
                            <Typography
                                key={link.text}
                                component={Link}
                                to={link.path}
                                ref={el => { if (el) navLinksRef.current[index] = el; }}
                                sx={{
                                    textDecoration: 'none',
                                    color: location.pathname === link.path ? '#fff' : 'rgba(255,255,255,0.7)',
                                    fontWeight: 'bold',
                                    transition: 'color 0.3s',
                                    '&:hover': {
                                        color: '#fff',
                                    },
                                }}
                            >
                                {link.text}
                            </Typography>
                        ))}
                        <Box
                            ref={activeLinkRef}
                            sx={{
                                position: 'absolute',
                                bottom: -10,
                                left: 0,
                                height: '3px',
                                backgroundColor: '#fff',
                                borderRadius: '2px',
                            }}
                        />
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="end"
                            onClick={() => handleToggleDrawer(true)}
                            sx={{ display: { md: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>

            <NavDrawer
                open={drawerOpen}
                onClose={() => handleToggleDrawer(false)}
                currentPath={location.pathname}
                navItems={navItems}
            />
        </>
    );
};

