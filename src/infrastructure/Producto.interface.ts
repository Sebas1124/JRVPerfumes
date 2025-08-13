export interface IProducto {
  ref: string;
  nombre: string;
  genero: 'Masculino' | 'Femenino' | 'Árabe' | 'No especificado';
  precio_100ml: number; // Coste proveedor
  precio_50ml: number;  // Coste proveedor
  precioVenta_100ml_cop: number; // Precio de venta final en COP
  precioVenta_50ml_cop: number;  // Precio de venta final en COP
  stock_100ml: number;
  stock_50ml: number;
  esMasVendido: boolean;
  imagenUrl: string; // URL de la imagen del producto
  descripcion: string;
  notasPrincipales: string[];
  notasCorazon: string[];
  notasFondo: string[];
  productosRelacionados: Pick<IProducto, 'ref' | 'nombre' | 'genero' | 'precioVenta_100ml_cop' | 'imagenUrl'>[]; // Usamos Pick para evitar redundancia
}