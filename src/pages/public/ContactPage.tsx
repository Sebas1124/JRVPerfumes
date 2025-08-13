import React,{ useEffect, useRef } from 'react';

// --- Dependencias de Material UI ---
import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    Button,
    List,
    ListItemText,
} from '@mui/material';

// --- Iconos de Material UI ---
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import DownloadIcon from '@mui/icons-material/Download';
import InfoIcon from '@mui/icons-material/Info';

// --- Dependencias de GSAP (instaladas vía npm) ---
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Se registra el plugin de GSAP
gsap.registerPlugin(ScrollTrigger);

// --- Datos de Contacto ---
const contactInfo = {
    name: "Jaime Rodriguez Valencia",
    city: "Cali, Colombia",
    phone: "+573145713137",
    whatsappLink: "https://wa.me/573145713137?text=Hola%2C%20estoy%20interesado%2F_a%20en%20un%20perfume.",
};

// --- Sub-Componentes Modulares ---

// Tarjeta de información con icono y animación
const InfoCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode; className: string }> = ({ icon, title, children, className }) => (
    <Card className={className} sx={{
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        color: '#fff',
        borderRadius: '16px',
        height: '100%',
    }}>
        <CardContent sx={{ textAlign: 'center' }}>
            <Box sx={{ color: '#fff', fontSize: '2.5rem', mb: 1 }}>
                {icon}
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>{title}</Typography>
            <Box>{children}</Box>
        </CardContent>
    </Card>
);

// --- Componente Principal de la Página de Contacto ---
export const ContactPage: React.FC = () => {
    const pageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: pageRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                }
            });

            tl.from('.contact-title', { opacity: 0, y: -50, duration: 1, ease: 'power3.out' })
              .from('.contact-card', {
                  opacity: 0,
                  y: 50,
                  duration: 0.8,
                  stagger: 0.2,
                  ease: 'power3.out'
              }, "-=0.5")
              .from('.whatsapp-button', {
                  opacity: 0,
                  scale: 0.8,
                  duration: 0.8,
                  ease: 'back.out(1.7)'
              }, "-=0.5");

        }, pageRef);

        return () => ctx.revert(); // Limpieza de GSAP
    }, []);

    return (
        <Box
            ref={pageRef}
            sx={{
                backgroundColor: '#0d0d0d',
                color: '#ffffff',
                minHeight: '100vh',
                py: { xs: 6, md: 10 },
            }}
        >
            <Container maxWidth="lg">
                <Typography
                    className="contact-title"
                    variant="h2"
                    component="h1"
                    sx={{
                        fontWeight: 'bold',
                        textAlign: 'center',
                        mb: { xs: 6, md: 8 },
                    }}
                >
                    Contáctanos
                </Typography>

                <Grid container spacing={4} justifyContent="center">
                    {/* Tarjeta de Información General */}
                    <Grid
                        size={{xs:12, md: 6, lg: 4}}
                    >
                        <InfoCard icon={<InfoIcon fontSize="inherit" />} title="Información" className="contact-card">
                            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                                Atendido por: <strong>{contactInfo.name}</strong>
                            </Typography>
                            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                                Ubicación: <strong>{contactInfo.city}</strong>
                            </Typography>
                        </InfoCard>
                    </Grid>

                    {/* Tarjeta de Métodos de Entrega */}
                    <Grid
                        size={{xs:12, md: 6, lg: 4}}
                    >
                        <InfoCard icon={<LocalShippingIcon fontSize="inherit" />} title="Métodos de Entrega" className="contact-card">
                            <List dense>
                                <ListItemText primary="✓ Envíos Nacionales" />
                                <ListItemText primary="✓ Domicilio en Cali" />
                                <ListItemText primary="✓ Recoger en punto" />
                            </List>
                        </InfoCard>
                    </Grid>

                    {/* Tarjeta de Catálogo */}
                    <Grid
                        size={{xs:12, md: 6, lg: 4}} 
                    >
                        <InfoCard icon={<DownloadIcon fontSize="inherit" />} title="Catálogo" className="contact-card">
                            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', mb: 2 }}>
                                ¿Quieres ver nuestra colección completa? Contáctanos por WhatsApp para recibir el catálogo.
                            </Typography>
                        </InfoCard>
                    </Grid>
                </Grid>

                {/* Sección de Pedidos por WhatsApp */}
                <Box sx={{ textAlign: 'center', mt: { xs: 6, md: 8 } }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                        Realiza tu Pedido
                    </Typography>
                    <Typography sx={{ color: 'rgba(255,255,255,0.8)', maxWidth: '600px', mx: 'auto', mb: 4 }}>
                        Para realizar un pedido, solicitar más información o fotos, contáctanos directamente a nuestro WhatsApp. Solo necesitas la referencia o el nombre del producto.
                    </Typography>
                    <Button
                        className="whatsapp-button"
                        variant="contained"
                        startIcon={<WhatsAppIcon />}
                        href={contactInfo.whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                            py: 1.5,
                            px: 5,
                            borderRadius: '50px',
                            backgroundColor: '#25D366',
                            color: '#fff',
                            fontWeight: 'bold',
                            fontSize: '1.1rem',
                            transition: 'transform 0.3s ease, background-color 0.3s ease',
                            '&:hover': {
                                backgroundColor: '#128C7E',
                                transform: 'scale(1.05)',
                            },
                        }}
                    >
                        🇨🇴 {contactInfo.phone}
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};

