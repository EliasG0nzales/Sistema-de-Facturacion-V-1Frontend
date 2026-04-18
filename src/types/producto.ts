export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  costo: number;
  stock: number;
  stockMinimo: number;
  categoria: string;
  descripcion: string;
  codigo: string;
  destacado: boolean;
}
