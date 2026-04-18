import type { Producto } from "../types/producto";

export const CATEGORIAS = [
  "Monitores",
  "Case",
  "PC Completa",
  "Disco SSD",
  "Estabilizador",
  "Fuente de Poder",
  "Memoria RAM",
  "Periféricos",
  "Placa Madre",
  "Tarjetas de Video",
];

// Datos de ejemplo — se reemplazarán con datos reales del backend
export const productosEjemplo: Producto[] = [
  { id: 1,  nombre: "Monitor LG 24\"",      precio: 180, costo: 120, stock: 5,  stockMinimo: 2, categoria: "Monitores",         descripcion: "Monitor Full HD 24 pulgadas.", codigo: "MON-001", destacado: false },
  { id: 2,  nombre: "Case NZXT H510",       precio: 95,  costo: 60,  stock: 3,  stockMinimo: 1, categoria: "Case",               descripcion: "Case ATX mid-tower.",          codigo: "CAS-001", destacado: false },
  { id: 3,  nombre: "PC Gingston 480GB",   precio: 55,  costo: 35,  stock: 10, stockMinimo: 3, categoria: "Disco SSD",          descripcion: "SSD SATA 480GB.",              codigo: "SSD-001", destacado: false },
  { id: 5,  nombre: "Estabilizador 1200VA", precio: 40,  costo: 25,  stock: 0,  stockMinimo: 2, categoria: "Estabilizador",      descripcion: "Protección de voltaje.",       codigo: "EST-001", destacado: false },
  { id: 6,  nombre: "Fuente Corsair 650W",  precio: 85,  costo: 55,  stock: 4,  stockMinimo: 2, categoria: "Fuente de Poder",    descripcion: "Fuente 80 Plus Bronze.",       codigo: "FUE-001", destacado: false },
  { id: 7,  nombre: "RAM DDR4 8GB",         precio: 30,  costo: 18,  stock: 15, stockMinimo: 5, categoria: "Memoria RAM",        descripcion: "Memoria DDR4 2666MHz.",        codigo: "RAM-001", destacado: false },
  { id: 8,  nombre: "Teclado Mecánico",     precio: 45,  costo: 28,  stock: 0,  stockMinimo: 2, categoria: "Periféricos",        descripcion: "Teclado mecánico RGB.",        codigo: "PER-001", destacado: false },
  { id: 9,  nombre: "Placa B450M",          precio: 110, costo: 75,  stock: 6,  stockMinimo: 2, categoria: "Placa Madre",        descripcion: "Placa madre AM4 micro-ATX.",   codigo: "PLM-001", destacado: false },
  { id: 10, nombre: "RTX 3060 12GB",        precio: 420, costo: 320, stock: 2,  stockMinimo: 1, categoria: "Tarjetas de Video",  descripcion: "GPU NVIDIA RTX 3060.",         codigo: "GPU-001", destacado: true  },
  { id: 11, nombre: "Monitor Samsung 27",   precio: 220, costo: 160, stock: 3,  stockMinimo: 1, categoria: "Monitores",         descripcion: "Monitor QHD 27 pulgadas.",     codigo: "MON-002", destacado: false },
  { id: 12, nombre: "RAM DDR4 16GB",        precio: 750, costo: 550, stock: 2,  stockMinimo: 1, categoria: "PC Completa", descripcion: "PC armada lista para usar.",   codigo: "PC-001",  destacado: true  },
  { id: 4,  nombre: "SSD Kingston 240GB",   precio: 55,  costo: 35,  stock: 0,  stockMinimo: 3, categoria: "Disco SSD",          descripcion: "SSD SATA 240GB.",              codigo: "SSD-002", destacado: false },
];
