/**
 * Utilidad para gestionar imágenes en el lado del cliente
 * con manejo de fallbacks automáticos
 */
import { useEffect, useState } from 'react';

/**
 * Hook personalizado para manejar imágenes con respaldo automático
 * 
 * @param primaryUrl URL principal de la imagen
 * @param fallbackUrl URL de respaldo si la primera falla
 * @param placeholderUrl URL de placeholder mientras se carga la imagen
 * @returns La URL que debe usarse (primaria, fallback o placeholder)
 */
export const useImageWithFallback = (
  primaryUrl: string,
  fallbackUrl?: string,
  placeholderUrl: string = '/images/placeholder-perfume.png'
): string => {
  const [imageUrl, setImageUrl] = useState<string>(placeholderUrl);
  const [_, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Resetea el estado cuando cambia la URL primaria
    setIsLoading(true);
    setImageUrl(placeholderUrl);

    // Función para verificar si una imagen existe
    const checkImage = (url: string): Promise<boolean> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
      });
    };

    // Intenta cargar la imagen primaria
    const loadImage = async () => {
      // Comienza intentando con la URL primaria
      if (await checkImage(primaryUrl)) {
        setImageUrl(primaryUrl);
        setIsLoading(false);
        return;
      }

      // Si falla la primaria y hay fallback, intenta con esa
      if (fallbackUrl && await checkImage(fallbackUrl)) {
        setImageUrl(fallbackUrl);
        setIsLoading(false);
        return;
      }

      // Si todo falla, mantén el placeholder
      setIsLoading(false);
    };

    loadImage();
  }, [primaryUrl, fallbackUrl, placeholderUrl]);

  return imageUrl;
};

/**
 * Componente de imagen con respaldo automático
 */
export const ImageWithFallback = ({
  src,
  fallbackSrc,
  alt,
  className,
  placeholderSrc = '/images/placeholder-perfume.svg',
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement> & {
  fallbackSrc?: string;
  placeholderSrc?: string;
}) => {
  const finalSrc = useImageWithFallback(src || '', fallbackSrc, placeholderSrc);

  return <img src={finalSrc} alt={alt} className={className} {...props} />;
};

/**
 * Función para construir una URL de imagen desde Unsplash
 * 
 * @param nombre Nombre del producto
 * @returns URL de Unsplash
 */
export const getUnsplashImage = (nombre: string): string => {
  const query = encodeURIComponent(`perfume,bottle,${nombre}`);
  return `https://source.unsplash.com/featured/?${query}`;
};

/**
 * Función para construir una URL de placeholder
 * 
 * @param nombre Nombre del producto para mostrar en el placeholder
 * @param width Ancho de la imagen
 * @param height Alto de la imagen (igual al ancho por defecto)
 * @returns URL del placeholder
 */
export const getPlaceholderImage = (
  nombre: string, 
  width: number = 400, 
  height: number = width
): string => {
  return `https://placehold.co/${width}x${height}/F2F2F2/333333?text=${encodeURIComponent(nombre)}`;
};
