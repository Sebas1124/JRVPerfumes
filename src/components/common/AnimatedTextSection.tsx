// src/components/common/AnimatedTextSection.tsx
import React, { useRef, useEffect } from "react";
import type { ReactNode } from "react";
import { Box } from "@mui/material";
import type { SxProps, Theme } from "@mui/system";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedTextSectionProps {
  children: ReactNode;
  sx?: SxProps<Theme>;
  delay?: number; // Delay para stagger si se usa en un grupo
}

export const AnimatedTextSection: React.FC<AnimatedTextSectionProps> = ({
  children,
  sx,
  delay = 0,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = sectionRef.current;
    if (element) {
      // Animar cada hijo directo (p.ej., cada <Typography> o <Box> dentro)
      const childrenToAnimate = Array.from(element.children);

      gsap.fromTo(
        childrenToAnimate,
        { autoAlpha: 0, y: 30 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15, // Pequeño delay entre cada elemento hijo
          ease: "power2.out",
          delay: delay, // Delay general para la sección si se pasa
          scrollTrigger: {
            trigger: element,
            start: "top 85%", // Empieza cuando el 85% superior del elemento es visible
            toggleActions: "play none none none", // Animar solo una vez
            // markers: true, // Descomenta para depurar
          },
        }
      );
    }
  }, [delay]);

  return (
    <Box ref={sectionRef} sx={{ ...sx }}>
      {" "}
      {/* Inicia oculto */}
      {children}
    </Box>
  );
};
