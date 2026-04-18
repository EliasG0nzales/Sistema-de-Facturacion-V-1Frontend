export interface Producto {
  id: number;
  nombre: string;
  marca: string;
  modelo: string;
  categoria: string;
  precio: number;
  costo: number;
  stock: number;
  stockMinimo: number;
  codigo: string;
  descripcion: string;
  destacado: boolean;
  especificaciones: Record<string, string | number>;
  imagenPrincipal?: string;
  imagenesSecundarias?: string[];
}
