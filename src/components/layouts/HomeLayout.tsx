import { Outlet } from "react-router-dom";

import {
  Box,
} from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HomeIcon from "@mui/icons-material/Home";
import { ContactMailOutlined } from '@mui/icons-material'
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollToTopButton } from "../common";
import { FooterComponent, NavbarComponent } from "../features/layout/Home";

const drawerWidth = 240;

const navItems = [
  { text: "Inicio", icon: <HomeIcon />, path: "/" },
  { text: "Productos", icon: <ShoppingCartIcon />, path: "/products" },
  { text: "Contacto", icon: <ContactMailOutlined />, path: "/contact" }
];

export const HomeLayout = () => {

  const mainRef = useRef<HTMLDivElement>(null);
  const [filteredNavItems, _] = useState(navItems);

  useEffect(() => {
    if (mainRef.current) {
      gsap.fromTo(
        mainRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  }, []);


  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#141414" }}>
      {/* Navegación en movil o escritorio */}
      <NavbarComponent navItems={filteredNavItems} />

      {/* Contenedor principal con footer abajo */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          width: { xs: "100%", md: `calc(100% - ${drawerWidth}px)` },
          minHeight: "100vh",
        }}
      >
        {/* Contenido */}
        <Box
          component="main"
          ref={mainRef}
          sx={{
            flexGrow: 1,
            mt: { xs: 7, md: 8 },
            pb: 4,
            transition: "padding 0.2s",
          }}
        >
          <Outlet />
        </Box>

        {/* footer */}
        <FooterComponent />
      </Box>

      <ScrollToTopButton />
    </Box>
  );
};
