import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom'; // Se asume que usas React Router para obtener el ID del producto

// --- Dependencias de Material UI ---
import { Box, Container, Typography, Grid, Chip, Divider, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// --- Dependencias de GSAP (instaladas vía npm) ---
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { productos } from '../../constants/data';
import type { IProducto } from '../../infrastructure';
import { ProductCard } from '../../components/features/products';
import { ImageWithFallback } from '../../utils/imageHooks';
import { getUnsplashImage } from '../../utils/imageUtils';

// Se registra el plugin de GSAP
gsap.registerPlugin(ScrollTrigger);


// --- SUB-COMPONENTES DE LA PÁGINA DE DETALLE ---

const ProductImage: React.FC<{ imagenUrl: string; nombre: string }> = ({ imagenUrl, nombre }) => {
    const imageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const image = imageRef.current;
        if (!image) return;

        const anim = gsap.to(image, {
            backgroundPosition: `50% 100%`,
            ease: "none",
            scrollTrigger: {
                trigger: image,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
            },
        });
        return () => anim.scrollTrigger?.kill();
    }, []);

    return (
        <Box
            // centrar la imagen
            sx={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '50px',
                height: '100%',
            }}
        >
            <ImageWithFallback
                src={imagenUrl} 
                fallbackSrc={getUnsplashImage(nombre)}
                alt={nombre} 
                className="product-image"
                style={{
                    height: 'auto',
                    width: '100%',
                    maxHeight: '60vh',
                    maxWidth: '500px',
                    backgroundImage: `url(${imagenUrl})`,
                    backgroundSize: 'cover',
                    backgroundAttachment: 'fixed',
                    backgroundPosition: 'center',
                    position: 'relative',
                    top: 0,
                    objectFit: 'cover',
                }}
            />
        </Box>
    );
};

const ProductNotes: React.FC<{ title: string; notes: string[] }> = ({ title, notes }) => {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const noteChips = sectionRef.current?.querySelectorAll('.note-chip');
        if (!noteChips) return;

        const anim = gsap.from(noteChips, {
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 85%',
            },
            opacity: 0,
            y: 20,
            stagger: 0.1,
            ease: 'power3.out',
        });
        return () => anim.scrollTrigger?.kill();
    }, []);

    return (
        <Box ref={sectionRef} sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ color: 'rgba(255,255,255,0.7)' }}>{title}</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {notes.map((note) => (
                    <Chip key={note} label={note} variant="outlined" className="note-chip" sx={{ color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }} />
                ))}
            </Box>
        </Box>
    );
};


type RelatedProduct = Pick<IProducto, 'imagenUrl' | 'ref' | 'nombre' | 'genero' | 'precioVenta_100ml_cop'>;

const RelatedProducts: React.FC<{ productos: RelatedProduct[] }> = ({ productos }) => {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const relatedCards = sectionRef.current?.querySelectorAll('.related-card');
        if (!relatedCards) return;
        
        const anim = gsap.from(relatedCards, {
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 85%',
            },
            opacity: 0,
            y: 50,
            stagger: 0.15,
            ease: 'power3.out',
        });
        return () => anim.scrollTrigger?.kill();
    }, []);

    return (
        <Box ref={sectionRef} sx={{ mt: 8 }}>
            <Typography variant="h4" component="h3" sx={{ fontWeight: 'bold', mb: 4 }}>
                También te podría gustar
            </Typography>
            <Grid container spacing={1} sx={{ justifyContent: 'center' }}>
                {productos.map(p => (
                    <ProductCard 
                        key={p.ref} 
                        producto={p as IProducto}
                        styles={{ width: 200, height: 'auto' }}
                    />
                ))}
            </Grid>
        </Box>
    );
};

// --- COMPONENTE PRINCIPAL DE LA PÁGINA ---

export const ProductPage: React.FC = () => {
    const mainContentRef = useRef<HTMLDivElement>(null);

    const { id } = useParams<{ id: string }>();

    const producto = productos.find((p) => p.ref === id);

    useEffect(() => {
        if (!mainContentRef.current) return;
        
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        tl.from(mainContentRef.current.querySelector('h1'), { opacity: 0, y: 30, duration: 1 })
          .from(mainContentRef.current.querySelector('.product-price'), { opacity: 0, y: 20, duration: 0.8 }, "-=0.7")
          .from(mainContentRef.current.querySelector('.product-description'), { opacity: 0, y: 20, duration: 0.8 }, "-=0.6")
          .from(mainContentRef.current.querySelector('.add-to-cart-btn'), { opacity: 0, scale: 0.8, duration: 0.6 }, "-=0.5");
          
        return () => {
             // Limpieza de todas las animaciones de ScrollTrigger al desmontar
             ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        }
    }, []);

    if (!producto) {
        return <Typography>Producto no encontrado.</Typography>;
    }

    return (
        <Box sx={{ backgroundColor: '#0d0d0d', color: '#ffffff' }}>
            <Grid container>
                <Grid size={{xs: 12, md: 6}}>
                    <ProductImage imagenUrl={producto.imagenUrl} nombre={producto.nombre} />
                </Grid>

                <Grid
                    size={{ xs: 12, md: 6 }}
                >
                    <Container ref={mainContentRef} sx={{ py: { xs: 4, md: 8 }, px: { xs: 2, sm: 4 } }}>
                        <IconButton sx={{ mb: 2, color: 'white' }} onClick={() => window.history.back()}>
                            <ArrowBackIcon />
                        </IconButton>
                        <Typography
                            variant="h2"
                            component="h1"
                            sx={{
                                fontWeight: 'bold',
                                fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
                                mb: 2,
                            }}
                        >
                            {producto.nombre}
                        </Typography>

                        <Typography
                            variant="h4"
                            className="product-price"
                            sx={{ mb: 4, color: 'rgba(255,255,255,0.9)' }}
                        >
                            {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(producto.precioVenta_100ml_cop)}
                        </Typography>

                        <Typography
                            variant="body1"
                            className="product-description"
                            sx={{
                                mb: 4,
                                fontSize: '1.1rem',
                                lineHeight: 1.7,
                                color: 'rgba(255,255,255,0.7)',
                                maxWidth: '600px',
                            }}
                        >
                            {producto.descripcion}
                        </Typography>
                        {/* 
                        <Button
                            variant="contained"
                            size="large"
                            className="add-to-cart-btn"
                            startIcon={<AddShoppingCartIcon />}
                            sx={{
                                py: 1.5,
                                px: 5,
                                borderRadius: '50px',
                                backgroundColor: '#fff',
                                color: '#000',
                                fontWeight: 'bold',
                                '&:hover': { backgroundColor: '#e0e0e0' },
                            }}
                        >
                            Añadir al Carrito
                        </Button> */}

                        <Divider sx={{ my: 6, borderColor: 'rgba(255,255,255,0.2)' }} />

                        <Box>
                            <ProductNotes title="Notas Principales" notes={producto.notasPrincipales} />
                            <ProductNotes title="Corazón" notes={producto.notasCorazon} />
                            <ProductNotes title="Fondo" notes={producto.notasFondo} />
                        </Box>
                        
                        {producto.productosRelacionados && producto.productosRelacionados.length > 0 && (
                            <RelatedProducts productos={producto.productosRelacionados} />
                        )}
                    </Container>
                </Grid>
            </Grid>
        </Box>
    );
};

