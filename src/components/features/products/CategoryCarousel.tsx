import { Box, Container, Typography } from "@mui/material";
import { useEffect, useRef } from "react";


import gsap from "gsap";
import { ImageWithFallback } from "../../../utils/imageHooks";

const categorias = [
    { id: "todos", nombre: "Todos", imagen: "https://infinityjavea.es/content/images/sdasdasdad/0021830_americanas_440.jpeg" },
    { id: "masculino", nombre: "Masculino", imagen: "https://infinityjavea.es/content/images/thumbs/0021830_americanas_440.jpeg" },
    { id: "femenino", nombre: "Femenino", imagen: "https://media.istockphoto.com/id/155374012/photo/young-woman-applying-perfume.jpg?s=612x612&w=0&k=20&c=juQ8YhTFB2ac-O3ugmYf0fM2akHZydrJr0qb5pWPZx8=" },
    { id: "arabe", nombre: "Árabe", imagen: "https://images-na.ssl-images-amazon.com/images/I/71UczsO032L._UL500_.jpg" },
];

interface Props {
    onCategorySelect: (categoryId: string) => void;
}

export const CategoryCarousel = ({ onCategorySelect }: Props) => {
    const parallaxBgRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        gsap.to(parallaxBgRef.current, {
            backgroundPosition: `50% ${window.innerHeight / 2}px`,
            ease: "none",
            scrollTrigger: {
                trigger: parallaxBgRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
            },
        });
    }, []);

    return (
        <Box
            ref={parallaxBgRef}
            sx={{
                py: { xs: 3, md: 5 },
                position: "relative",
                color: "white",
            }}
        >
            <ImageWithFallback
                src="https://images.unsplash.com/photo-1557171634-347f32b441c9?q=80&w=1600&auto=format&fit=crop"
                alt="Fondo de Categorías"
                style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    zIndex: -2,
                    filter: "brightness(0.45)",
                    pointerEvents: "none",
                }}
            />
            <Box
                sx={{
                    position: "absolute",
                    inset: 0,
                    background:
                        "linear-gradient(180deg, rgba(0,0,0,.55), rgba(0,0,0,.65))",
                    backdropFilter: "blur(3px)",
                    zIndex: -1,
                    pointerEvents: "none", // evita bloquear los drag events
                }}
            />
            <Container maxWidth="xl" sx={{ position: "relative" }}>
                <Box
                    sx={{
                        display: "flex",
                        overflow: "hidden",
                        "& .swiper": {
                            px: 2,
                        },
                    }}
                >
                    {categorias.map((cat) => (
                        <Box
                            key={cat.id}
                            style={{
                                width: 150, // ancho fijo (Swiper usa width para slidesPerView="auto")
                                display: "flex",
                                justifyContent: "center",
                            }}
                            onClick={() => onCategorySelect(cat.id)}
                        >
                            <Box
                                sx={{
                                    textAlign: "center",
                                    cursor: "pointer",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    gap: 1,
                                    "&:hover img": {
                                        transform: "scale(1.08)",
                                        borderColor: "#fff",
                                    },
                                }}
                            >
                                <ImageWithFallback
                                    src={cat.imagen} // CORREGIDO (antes usabas cat.nombre)
                                    alt={cat.nombre}
                                    style={{
                                        width: 110,
                                        height: 110,
                                        borderRadius: "50%",
                                        objectFit: "cover",
                                        border: "3px solid rgba(255,255,255,0.65)",
                                        transition: "transform .35s ease, border-color .35s ease",
                                    }}
                                />
                                <Typography
                                    sx={{
                                        fontWeight: 600,
                                        fontSize: 13,
                                        letterSpacing: ".5px",
                                        textTransform: "uppercase",
                                        textShadow: "0 2px 4px rgba(0,0,0,.6)",
                                    }}
                                >
                                    {cat.nombre}
                                </Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Container>
        </Box>
    );
};