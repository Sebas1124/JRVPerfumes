import { Box, Card, CardContent, Chip, Typography } from '@mui/material';
import type { IProducto } from '../../../infrastructure';
import { useNavigate } from 'react-router-dom';
import { ImageWithFallback } from '../../../utils/imageHooks';
import { getUnsplashImage } from '../../../utils/imageUtils';

interface Props {
    producto: IProducto;
    elRef?: React.Ref<HTMLDivElement>;
    styles?: React.CSSProperties;
}

export const ProductCard = ({ producto, elRef, styles } : Props) => {

    const navigate = useNavigate();

    return (
        <Card ref={elRef} 
            sx={{
                height: '100%',
                backgroundColor: '#1c1c1c',
                color: '#fff',
                borderRadius: '16px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
                },
                cursor: 'pointer',
                margin: '0 auto',
                ...styles
            }}
            onClick={() => navigate(`/products/${producto.ref}`)}
        >
            <ImageWithFallback
                src={producto.imagenUrl} 
                fallbackSrc={getUnsplashImage(producto.nombre)}
                alt={producto.nombre} 
                className="product-image" 
            />
            <CardContent sx={{ textAlign: 'center', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Box>
                    <Chip label={producto.genero} size="small" sx={{ mb: 1, backgroundColor: 'rgba(255,255,255,0.1)', color: '#fff' }} />
                    <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                        {producto.nombre}
                    </Typography>
                </Box>
                <Typography variant="body1" color="rgba(255, 255, 255, 0.9)" sx={{ mt: 1, fontWeight: 'bold' }}>
                    {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(producto.precioVenta_100ml_cop)}
                </Typography>
            </CardContent>
        </Card>
    )
}
