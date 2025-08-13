import { Box, Button, Grid, IconButton, Paper, Typography } from "@mui/material";
import { useState } from "react";

import { CloudUploadOutlined, DeleteOutline } from '@mui/icons-material';

import { LazyLoadImage } from 'react-lazy-load-image-component';


interface ImageUploaderProps {
  value: File[];
  onChange: (files: File[]) => void;
  error?: string;
}

const FULL_URL_FOTOS = import.meta.env.VITE_API_PHOTO_URL || 'http://localhost:5000';


export const ImageUploader: React.FC<ImageUploaderProps> = ({ value, onChange, error }) => {

  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const updatedFiles = [...value, ...newFiles].slice(0, 5);
      onChange(updatedFiles);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files);
      const updatedFiles = [...value, ...newFiles].slice(0, 5);
      onChange(updatedFiles);
    }
  };

  const removeImage = (index: number) => {
    const newFiles = [...value];
    newFiles.splice(index, 1);
    onChange(newFiles);
  };

  return (
    <Box>
      <Box
        sx={{
          border: '2px dashed',
          borderColor: dragActive ? 'primary.main' : error ? 'error.main' : 'grey.400',
          borderRadius: 2,
          p: 3,
          textAlign: 'center',
          bgcolor: dragActive ? 'action.hover' : 'background.paper',
          transition: 'all 0.2s ease',
          cursor: 'pointer',
        }}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => document.getElementById('file-upload')?.click()}
      >
        <input
          type="file"
          id="file-upload"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        <CloudUploadOutlined fontSize="large" color={error ? 'error' : 'primary'} />
        <Typography variant="h6" gutterBottom>
          Arrastra o haz clic para subir imágenes
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Formatos: JPG, PNG, GIF (máx. 5 archivos)
        </Typography>
        <Button
          variant="contained"
          component="span"
          sx={{ mt: 2 }}
          onClick={(e) => 
            {
              e.stopPropagation()
              document.getElementById('file-upload')?.click()
            }
          }
        >
          Seleccionar archivos
        </Button>
      </Box>

      {error && (
        <Typography color="error" variant="body2" sx={{ mt: 1 }}>
          {error}
        </Typography>
      )}

      {value.length > 0 && (
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {value.map((file, index) => (
            <Grid 
                key={index}
                size={{xs: 12, sm: 6, md: 4}}
            >
              <Paper 
                elevation={2}
                sx={{ 
                  position: 'relative',
                  height: 'auto',
                  maxHeight: 350,
                  overflow: 'hidden',
                  borderRadius: 1
                }}
              >
                <LazyLoadImage
                  src={
                    // verificar si el file es una URL completa o un archivo local
                    file instanceof File
                      ? URL.createObjectURL(file)
                      : `${FULL_URL_FOTOS}/${file}`
                  }
                  onError={(e) => {
                    e.currentTarget.src = `${FULL_URL_FOTOS}${file}`; // Fallback image
                  }}
                  alt={`Preview ${index}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
                <IconButton
                  size="small"
                  sx={{
                    position: 'absolute',
                    top: 4,
                    right: 4,
                    bgcolor: 'rgba(255, 255, 255, 0.7)',
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage(index);
                  }}
                >
                  <DeleteOutline fontSize="small" />
                </IconButton>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}

      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
        {value.length} de 5 imágenes subidas
      </Typography>
    </Box>
  );
};