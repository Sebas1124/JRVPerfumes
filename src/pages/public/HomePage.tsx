import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useEffect, useRef } from 'react';

import gsap from 'gsap';

import Swiper from 'swiper';
import { productos } from '../../constants/data';
import { CategoryCard } from '../../components/features/home';

const productosMasVendidos = productos.filter(p => p.esMasVendido);

import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ProductCard } from '../../components/features/products';

gsap.registerPlugin(ScrollTrigger);

export const HomePage = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuredTitleRef = useRef<HTMLHeadingElement>(null);
  const categoriesTitleRef = useRef<HTMLHeadingElement>(null);
  const categoryCardsRef = useRef<HTMLDivElement[]>([]);


  useEffect(() => {

    // Inicializar Swiper
    const swiper = new Swiper('.mySwiper', {
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      loop: true,
      slidesPerView: 'auto',
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      },
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });

    // --- ANIMACIÓN HERO SECTION (GSAP) ---
    const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
    heroTimeline
      .from(heroRef.current!.querySelector('h1'), { opacity: 0, y: 30, duration: 1 })
      .from(heroRef.current!.querySelector('p'), { opacity: 0, y: 20, duration: 0.8 }, "-=0.6")
      .from(heroRef.current!.querySelector('button'), { opacity: 0, y: 20, duration: 0.6 }, "-=0.5");

    // --- ANIMACIÓN DE TÍTULOS EN SCROLL (GSAP + ScrollTrigger) ---
    [featuredTitleRef, categoriesTitleRef].forEach(ref => {
      gsap.from(ref.current, {
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: 'power3.out',
      });
    });

    // --- ANIMACIÓN DE TARJETAS DE CATEGORÍA EN SCROLL (GSAP + ScrollTrigger) ---
    gsap.from(categoryCardsRef.current, {
      scrollTrigger: {
        trigger: categoriesTitleRef.current,
        start: 'bottom 90%',
      },
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.2,
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      if (swiper && !swiper.destroyed) {
        swiper.destroy();
      }
    };
  }, []);

  return (
    <Box sx={{
      backgroundColor: '#0d0d0d',
      color: '#ffffff',
      overflowX: 'hidden',
    }}>
      {/* SECCIÓN HERO */}
      <Box
        ref={heroRef}
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          px: 3,
          position: 'relative',
          background: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.9)), url(https://images.unsplash.com/photo-1594035918253-125839a54a3a?q=80&w=2070&auto=format&fit=crop) no-repeat center center',
          backgroundSize: 'cover',
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontWeight: 'bold',
              fontSize: { xs: '3rem', sm: '4rem', md: '5.5rem' },
              letterSpacing: '0.05em',
              textShadow: '0px 4px 15px rgba(0,0,0,0.7)',
            }}
          >
            JRV Perfumes
          </Typography>
          <Typography
            variant="h5"
            component="p"
            sx={{
              mt: 2,
              mb: 4,
              maxWidth: '600px',
              mx: 'auto',
              color: 'rgba(255, 255, 255, 0.8)',
              textShadow: '0px 2px 10px rgba(0,0,0,0.7)',
            }}
          >
            Descubre fragancias que definen tu esencia. Calidad y exclusividad en cada gota.
          </Typography>
          <Button
            variant="contained"
            size="large"
            endIcon={<ArrowForwardIcon />}
            sx={{
              py: 1.5,
              px: 5,
              borderRadius: '50px',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              color: '#000',
              fontWeight: 'bold',
              transition: 'transform 0.3s ease, background-color 0.3s ease',
              '&:hover': {
                backgroundColor: '#fff',
                transform: 'scale(1.05)',
              },
            }}
          >
            Explorar Colección
          </Button>
        </Container>
      </Box>

      {/* SECCIÓN DE MÁS VENDIDOS (CARRUSEL SWIPER) */}
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="xl">
          <Typography ref={featuredTitleRef} variant="h3" component="h2" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold', mb: 6 }}>
            Nuestros Más Vendidos
          </Typography>
          <div className="swiper mySwiper">
            <div className="swiper-wrapper" style={{ gap: '20px', display: 'flex', justifyContent: 'center' }}>
              {productosMasVendidos.map((producto) => (
                <div key={producto.ref} className="swiper-slide" style={{ width: '300px', height: '400px' }}>
                  <ProductCard
                    producto={producto}
                  />
                </div>
              ))}
            </div>
            <div className="swiper-pagination"></div>
          </div>
        </Container>
      </Box>

      {/* SECCIÓN DE CATEGORÍAS */}
      <Box sx={{ py: { xs: 8, md: 12 }, backgroundColor: '#141414' }}>
        <Container maxWidth="lg">
          <Typography ref={categoriesTitleRef} variant="h3" component="h2" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold', mb: 6 }}>
            Explora por Categoría
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            <Grid
              size={{xs: 12, sm: 6, md: 4}}
            >
              <CategoryCard
                elRef={el => { if (el) categoryCardsRef.current[0] = el; }}
                title="Masculinos"
                description="Fragancias audaces y con carácter para el hombre moderno."
                image="https://infinityjavea.es/content/images/thumbs/0021830_americanas_440.jpeg"
              />
            </Grid>
            <Grid
              size={{xs: 12, sm: 6, md: 4}}
            >
              <CategoryCard
                elRef={el => { if (el) categoryCardsRef.current[1] = el; }}
                title="Femeninos"
                description="Aromas elegantes y sofisticados que celebran la feminidad."
                image="https://media.istockphoto.com/id/155374012/photo/young-woman-applying-perfume.jpg?s=612x612&w=0&k=20&c=juQ8YhTFB2ac-O3ugmYf0fM2akHZydrJr0qb5pWPZx8="
              />
            </Grid>
            <Grid
              size={{xs: 12, sm: 6, md: 4}}
            >
              <CategoryCard
                elRef={el => { if (el) categoryCardsRef.current[2] = el; }}
                title="Árabes"
                description="Perfumes exóticos y lujosos con una estela inolvidable."
                image="https://images-na.ssl-images-amazon.com/images/I/71UczsO032L._UL500_.jpg"
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};
