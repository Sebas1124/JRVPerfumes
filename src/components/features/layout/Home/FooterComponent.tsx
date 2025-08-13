import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// --- Dependencias de Material UI ---
import {
    Box,
    Container,
    Typography,
    Grid,
    IconButton,
    TextField,
    Button,
    Divider,
} from '@mui/material';

// --- Iconos de Material UI ---
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

// --- Dependencias de GSAP (instaladas vía npm) ---
// NOTA: Para el entorno de vista previa, se cambiará a carga por CDN,
// pero en tu entorno local, estas importaciones son las correctas.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Se registra el plugin de GSAP
gsap.registerPlugin(ScrollTrigger);


// --- Componente Footer ---
export const FooterComponent: React.FC = () => {
    const footerRef = useRef<HTMLDivElement>(null);
    const socialIconsRef = useRef<(HTMLButtonElement | null)[]>([]);

    useEffect(() => {
        const footerElement = footerRef.current;
        if (!footerElement) return;

        // Animación de entrada para todo el footer
        gsap.from(footerElement, {
            scrollTrigger: {
                trigger: footerElement,
                start: 'top 95%', // Se activa cuando el 95% del footer es visible
                toggleActions: 'play none none none',
            },
            y: 100,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
        });

        // Animación de hover para los iconos de redes sociales
        socialIconsRef.current.forEach(icon => {
            if (icon) {
                icon.addEventListener('mouseenter', () => gsap.to(icon, { scale: 1.2, duration: 0.3 }));
                icon.addEventListener('mouseleave', () => gsap.to(icon, { scale: 1, duration: 0.3 }));
            }
        });

        // Limpieza de ScrollTrigger al desmontar el componente
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <Box
            ref={footerRef}
            component="footer"
            sx={{
                backgroundColor: '#141414',
                color: 'rgba(255, 255, 255, 0.7)',
                py: { xs: 6, md: 8 },
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                position: 'relative',
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={5}>
                    {/* Sección de Marca y Newsletter */}
                    <Grid size={{xs:12, md: 4}}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#fff', mb: 2 }}>
                            JRV Perfumes
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 3 }}>
                            Suscríbete para recibir ofertas exclusivas y ser el primero en conocer nuestros nuevos lanzamientos.
                        </Typography>
                        <Box component="form" sx={{ display: 'flex', gap: 1 }}>
                            <TextField
                                variant="outlined"
                                size="small"
                                placeholder="Tu correo electrónico"
                                sx={{
                                    flexGrow: 1,
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '50px',
                                        backgroundColor: 'rgba(255,255,255,0.1)',
                                        '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
                                        '&:hover fieldset': { borderColor: '#fff' },
                                    },
                                    '& .MuiInputBase-input': { color: '#fff' },
                                }}
                            />
                            <Button variant="contained" sx={{ borderRadius: '50px', backgroundColor: '#fff', color: '#000', '&:hover': { backgroundColor: '#e0e0e0' } }}>
                                Unirse
                            </Button>
                        </Box>
                    </Grid>

                    {/* Sección de Enlaces Rápidos */}
                    <Grid size={{xs:6, md:2}}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#fff', mb: 2 }}>
                            Explorar
                        </Typography>
                        <Box component="nav" sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Inicio</Link>
                            <Link to="/products" style={{ textDecoration: 'none', color: 'inherit' }}>Productos</Link>
                            <Link to="/contact" style={{ textDecoration: 'none', color: 'inherit' }}>Contacto</Link>
                        </Box>
                    </Grid>

                    {/* Sección de Soporte */}
                    <Grid size={{xs:6, md:2}}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#fff', mb: 2 }}>
                            Soporte
                        </Typography>
                        <Box component="nav" sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <Link to="/faq" style={{ textDecoration: 'none', color: 'inherit' }}>FAQ</Link>
                            <Link to="/shipping" style={{ textDecoration: 'none', color: 'inherit' }}>Envíos</Link>
                            <Link to="/privacy" style={{ textDecoration: 'none', color: 'inherit' }}>Privacidad</Link>
                        </Box>
                    </Grid>

                    {/* Sección de Redes Sociales */}
                    <Grid
                      size={{xs:12, md: 4}} 
                      sx={{ textAlign: { xs: 'center', md: 'right' } }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#fff', mb: 2 }}>
                            Síguenos
                        </Typography>
                        <Box>
                            <IconButton ref={el => { if (el) socialIconsRef.current[0] = el; }} sx={{ color: 'white' }} aria-label="Facebook">
                                <FacebookIcon />
                            </IconButton>
                            <IconButton ref={el => { if (el) socialIconsRef.current[1] = el; }} sx={{ color: 'white' }} aria-label="Instagram">
                                <InstagramIcon />
                            </IconButton>
                            <IconButton ref={el => { if (el) socialIconsRef.current[2] = el; }} sx={{ color: 'white' }} aria-label="Twitter">
                                <TwitterIcon />
                            </IconButton>
                        </Box>
                    </Grid>
                </Grid>

                <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

                <Typography variant="body2" sx={{ textAlign: 'center' }}>
                    © {new Date().getFullYear()} JRV Perfumes. Todos los derechos reservados.
                </Typography>
            </Container>
        </Box>
    );
};

