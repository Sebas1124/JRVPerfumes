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
          backgroundSize: 'cover',
          overflow: 'hidden'
        }}
      >

        <Box>
          <div className='stars'></div>
          <div className="shooting-star"></div>
          <div className="shooting-star"></div>
          <div className="shooting-star"></div>
          <div className="shooting-star"></div>
          <div className="shooting-star"></div>
        </Box>
        
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

        <style>
          {`
          .stars {
            width: 1px;
            height: 1px;
            position: absolute;
            background: white;
            box-shadow: 2vw 5vh 2px white, 10vw 8vh 2px white, 15vw 15vh 1px white,
              22vw 22vh 1px white, 28vw 12vh 2px white, 32vw 32vh 1px white,
              38vw 18vh 2px white, 42vw 35vh 1px white, 48vw 25vh 2px white,
              53vw 42vh 1px white, 58vw 15vh 2px white, 63vw 38vh 1px white,
              68vw 28vh 2px white, 73vw 45vh 1px white, 78vw 32vh 2px white,
              83vw 48vh 1px white, 88vw 20vh 2px white, 93vw 52vh 1px white,
              98vw 35vh 2px white, 5vw 60vh 1px white, 12vw 65vh 2px white,
              18vw 72vh 1px white, 25vw 78vh 2px white, 30vw 85vh 1px white,
              35vw 68vh 2px white, 40vw 82vh 1px white, 45vw 92vh 2px white,
              50vw 75vh 1px white, 55vw 88vh 2px white, 60vw 95vh 1px white,
              65vw 72vh 2px white, 70vw 85vh 1px white, 75vw 78vh 2px white,
              80vw 92vh 1px white, 85vw 82vh 2px white, 90vw 88vh 1px white,
              95vw 75vh 2px white;
            animation: twinkle 8s infinite linear;
          }

          .shooting-star {
            position: absolute;
            width: 100px;
            height: 2px;
            background: linear-gradient(90deg, white, transparent);
            animation: shoot 3s infinite ease-in;
          }

          .shooting-star:nth-child(1) {
            top: 50%;
            left: -100px;
            animation-delay: 0s;
          }

          .shooting-star:nth-child(2) {
            top: 25%;
            left: -100px;
            animation-delay: 1s;
          }

          .shooting-star:nth-child(3) {
            top: 1%;
            left: -100px;
            animation-delay: 2s;
          }

          @keyframes twinkle {
            0%,
            100% {
              opacity: 0.8;
            }
            50% {
              opacity: 0.4;
            }
          }

          @keyframes shoot {
            0% {
              transform: translateX(0) translateY(0) rotate(25deg);
              opacity: 1;
            }
            100% {
              transform: translateX(120vw) translateY(50vh) rotate(25deg);
              opacity: 0;
            }
          }

          /* Additional twinkling stars with different animation timing */
          .stars::after {
            content: "";
            position: absolute;
            width: 1px;
            height: 1px;
            background: white;
            box-shadow: 8vw 12vh 2px white, 16vw 18vh 1px white, 24vw 25vh 2px white,
              33vw 15vh 1px white, 41vw 28vh 2px white, 49vw 35vh 1px white,
              57vw 22vh 2px white, 65vw 42vh 1px white, 73vw 28vh 2px white,
              81vw 48vh 1px white, 89vw 32vh 2px white, 97vw 45vh 1px white,
              3vw 68vh 2px white, 11vw 75vh 1px white, 19vw 82vh 2px white,
              27vw 88vh 1px white, 35vw 72vh 2px white, 43vw 85vh 1px white,
              51vw 92vh 2px white, 59vw 78vh 1px white;
            animation: twinkle 6s infinite linear reverse;
          }
          `}
        </style>
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
