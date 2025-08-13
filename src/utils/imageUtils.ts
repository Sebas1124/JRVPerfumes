/**
 * Utilidades para la gestión de imágenes de productos
 * 
 * Este archivo contiene funciones para obtener y gestionar imágenes de perfumes,
 * ofreciendo diferentes estrategias desde APIs de imágenes hasta recursos locales.
 */

import type { BaseProducto } from '../constants/data';

/**
 * Genera una URL de imagen de Pexels para un perfume específico
 * Requiere registrarse en https://www.pexels.com/api/ para obtener una API key gratuita
 * 
 * @param nombre Nombre del perfume
 * @param apiKey Clave API de Pexels (regístrate gratis en pexels.com/api)
 * @returns Promise con la URL de la imagen
 */
export async function getPexelsImage(nombre: string, apiKey: string): Promise<string> {
  try {
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(nombre + ' perfume')}&per_page=1&orientation=square`,
      {
        headers: {
          Authorization: apiKey
        }
      }
    );
    
    const data = await response.json();
    
    if (data.photos && data.photos.length > 0) {
      // Retorna la imagen de tamaño medio (generalmente 350-500px)
      return data.photos[0].src.medium;
    }
    
    // Si no encuentra imagen específica del perfume, busca genérica de perfumes
    return getFallbackImage(nombre);
  } catch (error) {
    console.error(`Error buscando imagen para ${nombre}:`, error);
    return getFallbackImage(nombre);
  }
}

/**
 * Genera URLs de imágenes con fondo predefinido desde PerfumesDB
 * Estas imágenes son de productos reales con fondo transparente
 * 
 * @param nombre Nombre normalizado del perfume
 * @returns URL de imagen con fondo transparente
 */
export function getPerfumeDBImage(nombre: string): string {
  // Normaliza el nombre para buscar en la base de datos de perfumes
  const normalizedName = nombre.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "-");
  
  // Usa PerfumesDB que tiene muchas imágenes con fondo transparente
  return `https://fimgs.net/mdimg/perfume/375x500.${getProductId(normalizedName)}.jpg`;
}

/**
 * Obtiene imágenes de Unsplash (respaldo)
 * 
 * @param nombre Nombre del perfume
 * @returns URL de imagen de Unsplash
 */
export function getUnsplashImage(nombre: string): string {
  return `https://source.unsplash.com/featured/?perfume,${encodeURIComponent(nombre)}`;
}

/**
 * Imagen de respaldo si ninguna otra estrategia funciona
 * 
 * @param nombre Nombre del perfume
 * @returns URL de imagen de respaldo
 */
export function getFallbackImage(nombre: string): string {
  // Opción 1: Usa Unsplash como respaldo
  return getUnsplashImage(nombre);
  
  // Opción 2: Usa un placeholder local con diseño personalizado
  // return `/assets/images/placeholders/perfume-placeholder.png?text=${encodeURIComponent(nombre)}`;
}

/**
 * Función auxiliar para mapear nombres a IDs conocidos
 * Puedes expandir esta función con más asignaciones de IDs para perfumes populares
 */
function getProductId(normalizedName: string): string {
  // Mapeo manual de nombres normalizados a IDs conocidos en la base de datos de perfumes
  const idMap: Record<string, string> = {
    "aventus": "10555",
    "sauvage": "28842",
    "bleu-de-chanel": "9099",
    "one-million": "6983",
    "invictus": "19681",
    "la-vie-est-belle": "15096",
    "olympea": "30902",
    "baccarat-rouge-540": "46454",
    "good-girl": "38112",
    "black-opium": "25324",
    "acqua-di-gio": "15796",
    "coco-mademoiselle": "611",
    "eros": "15177",
    "miss-dior": "13864",
    "j-adore": "116",
    "alien": "4291",
    "light-blue": "641",
    "dylan-blue": "39769",
    "boss-bottled": "505",
    "212-vip": "13065"
    // Puedes agregar más perfumes conocidos aquí
  };
  
  // Busca una coincidencia parcial en las claves
  const matchingKey = Object.keys(idMap).find(key => normalizedName.includes(key));
  
  // Si encuentra una coincidencia, retorna el ID; si no, usa un ID genérico
  return matchingKey ? idMap[matchingKey] : "perfume-generic";
}

/**
 * Estrategia combinada para obtener la mejor imagen disponible
 * 
 * @param producto Información del producto
 * @param apiKey Clave API opcional para Pexels (si está disponible)
 * @returns La mejor URL de imagen disponible
 */
export async function getBestProductImage(producto: BaseProducto, apiKey?: string): Promise<string> {
  try {
    // Si hay una API key disponible, intenta primero con Pexels
    if (apiKey) {
      const pexelsUrl = await getPexelsImage(producto.nombre, apiKey);
      if (pexelsUrl) return pexelsUrl;
    }
    
    // Si no hay API key o falla Pexels, intenta con PerfumesDB
    return getPerfumeDBImage(producto.nombre);
  } catch (error) {
    // En caso de error, usa Unsplash como última opción
    console.error(`Error obteniendo imagen para ${producto.nombre}:`, error);
    return getUnsplashImage(producto.nombre);
  }
}
