/**
 * Herramienta para descargar y procesar imágenes de perfumes
 * 
 * Este script descarga imágenes de perfumes desde varias fuentes
 * y las guarda localmente para ser usadas en tu aplicación.
 * 
 * Características:
 * - Descarga imágenes desde Fragrantica/PerfumesDB o Unsplash
 * - Guarda las imágenes en la carpeta public/images/perfumes
 * - Optimiza las imágenes para reducir su tamaño
 * - Genera un archivo JSON con las rutas locales
 * 
 * Uso:
 * 1. Instala dependencias: npm install node-fetch sharp fs-extra
 * 2. Ejecuta: node download-perfume-images.js
 */

const fs = require('fs-extra');
const path = require('path');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const sharp = require('sharp');

// Importamos solo los nombres y referencias de los perfumes
const { baseProductos } = require('../src/constants/data');

// Configuración
const OUTPUT_DIR = path.join(__dirname, '../public/images/perfumes');
const IMAGE_QUALITY = 80; // 0-100, más alto = mejor calidad pero archivos más grandes
const MAX_WIDTH = 400; // Ancho máximo de la imagen
const TIMEOUT_MS = 10000; // Tiempo máximo de espera para descargar cada imagen
const USE_UNSPLASH_FALLBACK = true; // Si no encuentra en Fragrantica, usa Unsplash

// Diccionario de mapeo para perfumes más conocidos
const knownPerfumeIds = {
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
};

// Prepara la carpeta de salida
fs.ensureDirSync(OUTPUT_DIR);

// Función para normalizar nombres
function normalizeProductName(name) {
  return name.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "-");
}

// Función para buscar ID del perfume
function findPerfumeId(normalizedName) {
  const matchKey = Object.keys(knownPerfumeIds).find(key => 
    normalizedName.includes(key));
    
  return matchKey ? knownPerfumeIds[matchKey] : null;
}

// Función para obtener URL de Fragrantica/PerfumesDB
function getFragranticaUrl(perfumeName) {
  const normalizedName = normalizeProductName(perfumeName);
  const id = findPerfumeId(normalizedName);
  
  return id ? `https://fimgs.net/mdimg/perfume/375x500.${id}.jpg` : null;
}

// Función para obtener URL de Unsplash
function getUnsplashUrl(perfumeName) {
  const query = encodeURIComponent(`perfume,bottle,${perfumeName}`);
  return `https://source.unsplash.com/featured/?${query}`;
}

// Función para descargar una imagen con tiempo límite
async function downloadImageWithTimeout(url, timeout = TIMEOUT_MS) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`Error descargando imagen: ${response.status} ${response.statusText}`);
    }
    
    return await response.buffer();
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

// Función para procesar una imagen con Sharp
async function processImage(buffer, outputPath) {
  return sharp(buffer)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .jpeg({ quality: IMAGE_QUALITY })
    .toFile(outputPath);
}

// Función principal
async function downloadAllPerfumeImages() {
  console.log(`🚀 Iniciando descarga de ${baseProductos.length} imágenes de perfumes...`);
  console.log(`📁 Las imágenes se guardarán en: ${OUTPUT_DIR}`);
  
  const imageMap = {};
  let successCount = 0;
  let errorCount = 0;
  
  for (const [index, perfume] of baseProductos.entries()) {
    const { ref, nombre } = perfume;
    const normalizedName = normalizeProductName(nombre);
    const outputFileName = `${ref}-${normalizedName}.jpg`;
    const outputPath = path.join(OUTPUT_DIR, outputFileName);
    
    console.log(`\n[${index + 1}/${baseProductos.length}] Procesando: ${nombre} (${ref})`);
    
    try {
      // Primero intenta con Fragrantica/PerfumesDB
      let imageBuffer = null;
      let sourceUrl = getFragranticaUrl(nombre);
      
      if (sourceUrl) {
        try {
          console.log(`🔍 Buscando en Fragrantica/PerfumesDB: ${sourceUrl}`);
          imageBuffer = await downloadImageWithTimeout(sourceUrl);
          console.log(`✅ Imagen encontrada en Fragrantica/PerfumesDB`);
        } catch (err) {
          console.log(`⚠️ No se encontró en Fragrantica/PerfumesDB: ${err.message}`);
          sourceUrl = null;
        }
      } else {
        console.log(`ℹ️ No hay ID conocido para este perfume en Fragrantica/PerfumesDB`);
      }
      
      // Si falla o no hay ID conocido, usa Unsplash como respaldo
      if (!imageBuffer && USE_UNSPLASH_FALLBACK) {
        sourceUrl = getUnsplashUrl(nombre);
        try {
          console.log(`🔍 Buscando en Unsplash: ${sourceUrl}`);
          imageBuffer = await downloadImageWithTimeout(sourceUrl);
          console.log(`✅ Imagen encontrada en Unsplash`);
        } catch (err) {
          console.log(`⚠️ Error con Unsplash: ${err.message}`);
          throw err; // Propaga el error si ambas fuentes fallan
        }
      }
      
      if (imageBuffer) {
        // Procesa y guarda la imagen
        await processImage(imageBuffer, outputPath);
        console.log(`💾 Imagen guardada como: ${outputFileName}`);
        
        // Guarda la ruta relativa para el JSON final
        imageMap[ref] = `/images/perfumes/${outputFileName}`;
        successCount++;
      }
    } catch (error) {
      console.error(`❌ Error procesando ${nombre}: ${error.message}`);
      errorCount++;
    }
    
    // Pequeña pausa entre descargas para no sobrecargar los servidores
    if (index < baseProductos.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }
  
  // Guarda el mapa de imágenes en un archivo JSON
  const outputJsonPath = path.join(__dirname, '../src/constants/perfumeImages.json');
  fs.writeFileSync(outputJsonPath, JSON.stringify(imageMap, null, 2));
  
  console.log(`\n✅ Proceso completado!`);
  console.log(`📊 Resumen:`);
  console.log(`   - Imágenes exitosas: ${successCount}`);
  console.log(`   - Errores: ${errorCount}`);
  console.log(`   - Total intentado: ${baseProductos.length}`);
  console.log(`📝 Mapa de imágenes guardado en: ${outputJsonPath}`);
  console.log(`\n💡 Siguiente paso: Actualiza tu código para usar el archivo JSON para las imágenes.`);
}

// Ejecuta la función principal
downloadAllPerfumeImages().catch(err => {
  console.error('Error crítico en el proceso:', err);
  process.exit(1);
});
