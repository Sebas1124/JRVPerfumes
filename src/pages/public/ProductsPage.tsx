import { Box, Container, InputAdornment, Pagination, TextField, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";

import Swiper from 'swiper';
import { CategoryCarousel, ProductsGrid } from "../../components/features/products";
import { productos } from "../../constants/data";

import { SearchOutlined } from '@mui/icons-material'

interface Pagination {
    pageCount: number;
    currentPage: number;
    setCurrentPage: (page: number) => void;
}

const PaginationComponent = ({ pageCount, currentPage, setCurrentPage }: Pagination) => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10, mb: 10 }}>
            <Pagination
                count={pageCount}
                page={currentPage}
                onChange={(_, value) => setCurrentPage(value)}
                color="primary"
                sx={{ '& .MuiPaginationItem-root': { color: '#fff' } }}
            />
        </Box>
    );
};

export const ProductsPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('todos');
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 12;

    // Lógica de filtrado y paginación
    const filteredProducts = useMemo(() => {
        return productos
            .filter(p => selectedCategory === 'todos' || p.genero.toLowerCase() === selectedCategory)
            .filter(p => p.nombre.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [searchTerm, selectedCategory]);

    const paginatedProducts = useMemo(() => {
        const startIndex = (currentPage - 1) * productsPerPage;
        return filteredProducts.slice(startIndex, startIndex + productsPerPage);
    }, [filteredProducts, currentPage, productsPerPage]);

    const pageCount = Math.ceil(filteredProducts.length / productsPerPage);



    useEffect(() => {

        const swiper = new Swiper('.categorySwiper', {
            slidesPerView: 'auto',
            spaceBetween: 20,
            centeredSlides: true,
            loop: true,
            breakpoints: {
                320: { slidesPerView: 2, spaceBetween: 20 },
                640: { slidesPerView: 3, spaceBetween: 30 },
                1024: { slidesPerView: 4, spaceBetween: 40 },
            }
        });
        return () => { if (swiper && !swiper.destroyed) swiper.destroy(); };
    }, []);
    
    // Resetear a la página 1 cuando cambian los filtros
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, selectedCategory]);


    return (
        <Box sx={{ backgroundColor: '#0d0d0d', color: '#ffffff', minHeight: '100vh' }}>
            <CategoryCarousel onCategorySelect={setSelectedCategory} />

            <Container maxWidth="xl" sx={{ py: { xs: 4, md: 6 } }}>
                <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
                    <TextField
                        variant="outlined"
                        placeholder="Buscar por nombre..."
                        onChange={(e) => setSearchTerm(e.target.value)}
                        sx={{
                            width: { xs: '100%', sm: '80%', md: '50%' },
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '50px',
                                backgroundColor: 'rgba(255,255,255,0.1)',
                                '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
                                '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.5)' },
                                '&.Mui-focused fieldset': { borderColor: '#fff' },
                            },
                            '& .MuiInputBase-input': { color: '#fff' },
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchOutlined sx={{ color: 'rgba(255,255,255,0.5)' }} />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>

                {pageCount > 1 && (
                    <PaginationComponent
                        pageCount={pageCount}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />  
                )}

                {paginatedProducts.length > 0 ? (
                    <ProductsGrid productos={paginatedProducts} />
                ) : (
                    <Typography sx={{ textAlign: 'center', mt: 8 }}>
                        No se encontraron productos con esos criterios.
                    </Typography>
                )}

                {pageCount > 1 && (
                    <PaginationComponent
                        pageCount={pageCount}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />  
                )}
            </Container>
        </Box>
    );
};