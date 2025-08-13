

// importar iconos de Material Icons
import { SearchOutlined, CloseOutlined } from "@mui/icons-material";
import { useQuery } from '@tanstack/react-query';
import { Box, IconButton, Typography } from '@mui/material'
import { useThemeStore } from '../../../../../store/useThemeStore';
import { useEffect, useRef, useState } from 'react';
// import { Swiper } from 'swiper/react';

// import { LazyLoadImage } from 'react-lazy-load-image-component';
// import { Pagination, Navigation } from 'swiper/modules';

// @ts-ignore
import 'swiper/css';
// @ts-ignore
import 'swiper/css/pagination';
// @ts-ignore
import 'swiper/css/navigation';
// import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../../../../common";

export const SearchComponent = () => {
    const mode = useThemeStore((state) => state.mode);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [debouncedValue, setDebouncedValue] = useState<string>("");
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
    const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    // const navigate = useNavigate();

    // Handle debouncing
    useEffect(() => {
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }
        
        debounceTimeout.current = setTimeout(() => {
            setDebouncedValue(searchTerm);
        }, 500);

        return () => {
            if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
        };
    }, [searchTerm]);

    const fetchSuggestions = async(value: string) => {
        console.log("Fetching suggestions for:", value);
        return value;
    }

    const { data: searchResults, isLoading } = useQuery({
        queryKey: ['searchSuggestions', debouncedValue],
        queryFn: () => fetchSuggestions(debouncedValue),
        enabled: debouncedValue.length > 2,
        refetchOnWindowFocus: false,
    });

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        setShowSuggestions(true);
    }

    const handleInputFocus = () => {
        if (debouncedValue.length > 2) {
            setShowSuggestions(true);
        }
    }

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <Box sx={{ 
            flexGrow: 1, 
            display: 'flex', 
            justifyContent: 'center',
            maxWidth: 400,
            mx: 'auto',
            position: 'relative',
            bgcolor: mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
        }}>
            <Box
                component="form"
                sx={{
                    position: 'relative',
                    width: '100%',
                    borderRadius: 1,
                    bgcolor: mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
                    display: { xs: 'none', sm: 'flex' },
                    alignItems: 'center',
                    px: 2,
                }}
            >
                <input
                    style={{
                        border: 'none',
                        outline: 'none',
                        width: '100%',
                        padding: '8px',
                        fontSize: '0.875rem',
                        backgroundColor: 'transparent',
                        color: mode === 'dark' ? '#fff' : 'inherit',
                    }}
                    placeholder="Buscar productos..."
                    value={searchTerm}
                    onChange={handleSearch}
                    onFocus={handleInputFocus}
                />
                <IconButton size="small" sx={{ color: 'text.secondary' }}>
                    {
                        searchTerm.length > 0 ? (
                            <CloseOutlined 
                                onClick={() => {
                                    setSearchTerm("");
                                    setShowSuggestions(false);
                                }} 
                                sx={{ opacity: 0.5 }}
                            />
                        ) : (
                            <SearchOutlined sx={{ opacity: 0.5 }} />
                        )
                    }
                </IconButton>
            </Box>

            {/* Results dropdown */}
            {showSuggestions && debouncedValue.length > 2 && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        bgcolor: mode === 'dark' ? '#333' : '#fff',
                        boxShadow: 3,
                        borderRadius: 1,
                        mt: 1,
                        zIndex: 10,
                        maxHeight: 400,
                        overflowY: 'auto',
                    }}
                >
                    <Box sx={{ p: 2 }}>
                        {
                            searchResults && searchResults.length > 0 ? (
                                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                                    Resultados para "{debouncedValue}"
                                </Typography>
                            ) : (
                                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                                    No se encontraron resultados para "{debouncedValue}"
                                </Typography>
                            )
                        }
                    </Box>
                </Box>
            )}
        </Box>
    );
}
