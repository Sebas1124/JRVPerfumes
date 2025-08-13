import { Grid } from "@mui/material";
import { useEffect, useRef } from "react";
import { ProductCard } from "./ProductCard";
import type { IProducto } from "../../../infrastructure";

import gsap from "gsap";

interface Props {
    productos: IProducto[]
}

export const ProductsGrid = ({ productos }: Props) => {
    const gridRef = useRef<HTMLDivElement | null>(null);
    const productCardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {

        // Animación de entrada para las tarjetas de producto
        const anim = gsap.from(productCardsRef.current, {
            duration: 0.8,
            autoAlpha: 0,
            y: 50,
            ease: 'power3.out',
            stagger: 0.1,
            scrollTrigger: {
                trigger: gridRef.current,
                start: 'top 85%',
                toggleActions: 'play none none none',
            }
        });
        return () => { anim.kill(); }; // Limpieza de la animación
    }, [productos]); // Se re-activa la animación si la lista de productos cambia

    return (
        <Grid ref={gridRef} container spacing={4}>
            {productos.map((producto, index) => (
                <Grid
                    key={producto.ref}
                    size={{xs: 12, sm: 6, md: 4, lg: 3}}
                >
                    <ProductCard
                        producto={producto}
                        elRef={el => { if (el) productCardsRef.current[index] = el; }}
                    />
                </Grid>
            ))}
        </Grid>
    );
};