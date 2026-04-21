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
  badge?: "oferta" | "nuevo" | "ultimas" | "";
  especificaciones: Record<string, string | number>;
  imagenPrincipal?: string;
  imagenesSecundarias?: string[];
}
