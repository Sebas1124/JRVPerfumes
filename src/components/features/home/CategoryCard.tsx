import { Card, CardContent, CardMedia, Typography } from "@mui/material";

interface Props {
    title: string;
    image: string;
    description: string;
    elRef: React.Ref<HTMLDivElement>;
}

export const CategoryCard = ({ title, image, description, elRef }: Props) => (
  <Card ref={elRef} sx={{
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    color: '#fff',
    borderRadius: '16px',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
      transform: 'translateY(-8px)',
      boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
    },
    objectFit: 'cover',
    maxWidth: 220,
    maxHeight: 500
  }}>
    <CardMedia
      component="img"
      height="280"
      image={image}
      alt={title}
      loading="lazy"
      sx={{ objectFit: 'cover', cursor: 'pointer' }}
    />
    <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
      <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
        {title}
      </Typography>
      <Typography variant="body2" color="rgba(255, 255, 255, 0.7)">
        {description}
      </Typography>
    </CardContent>
  </Card>
);
