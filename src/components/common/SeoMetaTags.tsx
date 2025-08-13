// // src/components/common/SeoMetaTags.tsx
// import React from 'react';
// import { Helmet } from 'react-helmet-async';

// interface SeoMetaTagsProps {
//     title?: string; // Título de la página (aparece en la pestaña del navegador y en resultados de búsqueda)
//     description?: string; // Descripción para motores de búsqueda y social sharing
//     imageUrl?: string; // URL absoluta de la imagen para la previsualización
//     canonicalUrl?: string; // URL canónica de la página actual
//     keywords?: string; // Palabras clave (menos importante para Google hoy en día, pero útil)
//     author?: string; // Autor del contenido o de la web
//     ogType?: string; // Tipo de Open Graph (ej. 'website', 'article', 'video.movie')
//     // Puedes añadir más props para Twitter Cards específicos si es necesario
//     // twitterCardType?: 'summary' | 'summary_large_image' | 'app' | 'player';
//     // twitterSite?: string; // @tuTwitterHandleDelSitio
//     // twitterCreator?: string; // @tuTwitterHandleDelAutor
// }

// // Valores por defecto globales
// const DEFAULT_TITLE = "SebCode - Aprende y Crece con Nosotros";
// const DEFAULT_DESCRIPTION = "Explora cursos interactivos de programación, diseño y más. Únete a nuestra comunidad y lleva tus habilidades al siguiente nivel con SebCode.";
// const DEFAULT_IMAGE_URL = `${window.location.origin}/logo-sebcode-social.png`; // URL absoluta a tu logo para social sharing
// const DEFAULT_AUTHOR = "Sebastian Rosero López - SebCode";
// const DEFAULT_KEYWORDS = "cursos online, programación, desarrollo web, javascript, react, nodejs, typescript, sebcode, aprender online";

// export const SeoMetaTags: React.FC<SeoMetaTagsProps> = ({
//     title,
//     description,
//     imageUrl,
//     canonicalUrl,
//     keywords,
//     author,
//     ogType = 'website', // Default para la mayoría de las páginas
// }) => {
//     const siteName = "SebCode";
//     const pageTitle = title ? `${title} | ${siteName}` : DEFAULT_TITLE;
//     const pageDescription = description || DEFAULT_DESCRIPTION;
//     const pageImageUrl = imageUrl || DEFAULT_IMAGE_URL;
//     const pageKeywords = keywords || DEFAULT_KEYWORDS;
//     const pageAuthor = author || DEFAULT_AUTHOR;
//     const currentUrl = canonicalUrl || window.location.href;

//     return (
//         <Helmet>
//             {/* Tags HTML Estándar */}
//             <title>{pageTitle}</title>
//             <meta name="description" content={pageDescription} />
//             {pageKeywords && <meta name="keywords" content={pageKeywords} />}
//             {pageAuthor && <meta name="author" content={pageAuthor} />}
//             {currentUrl && <link rel="canonical" href={currentUrl} />}

//             {/* Open Graph / Facebook / WhatsApp / LinkedIn etc. */}
//             <meta property="og:title" content={pageTitle} />
//             <meta property="og:description" content={pageDescription} />
//             <meta property="og:image" content={pageImageUrl} />
//             <meta property="og:url" content={currentUrl} />
//             <meta property="og:type" content={ogType} />
//             <meta property="og:site_name" content={siteName} />
//             {/* <meta property="og:locale" content="es_ES" /> */} {/* Opcional: si tu sitio es multi-idioma */}

//             {/* Twitter Card Tags */}
//             <meta name="twitter:card" content={imageUrl ? "summary_large_image" : "summary"} /> {/* summary_large_image si tienes una imagen destacada */}
//             <meta name="twitter:title" content={pageTitle} />
//             <meta name="twitter:description" content={pageDescription} />
//             <meta name="twitter:image" content={pageImageUrl} />
//             {/* <meta name="twitter:site" content="@TuCuentaDeTwitterDelSitio" /> */}
//             {/* <meta name="twitter:creator" content="@TuCuentaDeAutorSiAplica" /> */}

//             {/* Opcional: Favicons (puedes tener más) */}
//             <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
//             <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
//             <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
//             <link rel="manifest" href="/site.webmanifest" />
//             <meta name="theme-color" content="#673ab7" /> {/* Color principal de tu tema */}
//         </Helmet>
//     );
// };


export const SeoMetaTags = () => {
  return (
    <div>SeoMetaTags</div>
  )
}
