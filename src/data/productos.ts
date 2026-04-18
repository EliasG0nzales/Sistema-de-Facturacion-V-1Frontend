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

export const productosEjemplo: Producto[] = [
  {
    id: 11,
    nombre: "H510",
    marca: "NZXT",
    modelo: "Mid Tower",
    categoria: "Case",
    precio: 95,
    costo: 60,
    stock: 0,
    stockMinimo: 1,
    codigo: "CAS-001",
    descripcion: "Gabinete minimalista con panel de vidrio templado",
    destacado: false,
    especificaciones: {
      tipo: "Mid Tower",
      formato: "ATX, Micro-ATX, Mini-ITX",
      panelLateral: "Vidrio templado",
      ventiladores: "2x 120mm incluidos",
      bahias: "2x 3.5 pulgadas, 2x 2.5 pulgadas",
      puertosUSB: "USB 3.1 Gen 1, USB-C"
    }
  },
  {
    id: 10,
    nombre: "RM750x",
    marca: "Corsair",
    modelo: "750W 80+ Gold",
    categoria: "Fuente de Poder",
    precio: 115,
    costo: 75,
    stock: 6,
    stockMinimo: 2,
    codigo: "FUE-001",
    descripcion: "Fuente de poder modular con certificación 80 Plus Gold",
    destacado: false,
    especificaciones: {
      potencia: "750W",
      certificacion: "80 Plus Gold",
      modular: "Totalmente modular",
      ventilador: "135mm",
      protecciones: "OVP, UVP, OCP, OTP, SCP"
    }
  },
  {
    id: 1,
    nombre: "RTX 3060",
    marca: "ASUS",
    modelo: "Dual OC",
    categoria: "Tarjetas de Video",
    precio: 420,
    costo: 320,
    stock: 2,
    stockMinimo: 1,
    codigo: "GPU-001",
    descripcion: "Tarjeta gráfica NVIDIA GeForce RTX 3060 con tecnología Ray Tracing",
    destacado: true,
    especificaciones: {
      memoria: "12GB",
      tipoMemoria: "GDDR6",
      interfaz: "PCIe 4.0",
      consumo: "170W",
      conectores: "HDMI 2.1, DisplayPort 1.4a"
    }
  },
  {
    id: 2,
    nombre: "RTX 4070",
    marca: "MSI",
    modelo: "Gaming X Trio",
    categoria: "Tarjetas de Video",
    precio: 680,
    costo: 520,
    stock: 0,
    stockMinimo: 1,
    codigo: "GPU-002",
    descripcion: "Tarjeta gráfica de alto rendimiento con sistema de refrigeración avanzado",
    destacado: true,
    especificaciones: {
      memoria: "12GB",
      tipoMemoria: "GDDR6X",
      interfaz: "PCIe 4.0",
      consumo: "200W",
      conectores: "HDMI 2.1, DisplayPort 1.4a"
    }
  },
  {
    id: 7,
    nombre: "UltraGear 24GN600",
    marca: "LG",
    modelo: "24 pulgadas",
    categoria: "Monitores",
    precio: 180,
    costo: 120,
    stock: 5,
    stockMinimo: 2,
    codigo: "MON-001",
    descripcion: "Monitor gaming con alta tasa de refresco",
    destacado: false,
    especificaciones: {
      tamaño: "24 pulgadas",
      resolucion: "1920x1080",
      panelTipo: "IPS",
      tasaRefresco: "144Hz",
      tiempoRespuesta: "1ms",
      conectores: "HDMI, DisplayPort"
    }
  },
  {
    id: 8,
    nombre: "Odyssey G5",
    marca: "Samsung",
    modelo: "27 pulgadas",
    categoria: "Monitores",
    precio: 280,
    costo: 190,
    stock: 3,
    stockMinimo: 1,
    codigo: "MON-002",
    descripcion: "Monitor curvo gaming con resolución QHD",
    destacado: true,
    especificaciones: {
      tamaño: "27 pulgadas",
      resolucion: "2560x1440",
      panelTipo: "VA",
      tasaRefresco: "165Hz",
      tiempoRespuesta: "1ms",
      curvatura: "1000R",
      conectores: "HDMI, DisplayPort"
    }
  },
  {
    id: 12,
    nombre: "K70 RGB",
    marca: "Corsair",
    modelo: "MK.2",
    categoria: "Periféricos",
    precio: 145,
    costo: 95,
    stock: 0,
    stockMinimo: 2,
    codigo: "PER-001",
    descripcion: "Teclado mecánico gaming con switches Cherry MX",
    destacado: true,
    especificaciones: {
      tipo: "Mecánico",
      switches: "Cherry MX Red",
      iluminacion: "RGB por tecla",
      conectividad: "USB",
      teclas: "104 teclas",
      reposaMuñecas: "Incluido"
    }
  },
  {
    id: 9,
    nombre: "B550M",
    marca: "ASUS",
    modelo: "TUF Gaming",
    categoria: "Placa Madre",
    precio: 145,
    costo: 95,
    stock: 4,
    stockMinimo: 2,
    codigo: "PLM-001",
    descripcion: "Placa madre micro-ATX para procesadores AMD Ryzen",
    destacado: false,
    especificaciones: {
      socket: "AM4",
      chipset: "B550",
      formato: "Micro-ATX",
      memoriaMax: "128GB",
      slotsRAM: 4,
      m2Slots: 2,
      pcie: "PCIe 4.0"
    }
  },
  {
    id: 3,
    nombre: "Fury Beast",
    marca: "Kingston",
    modelo: "DDR4 3200MHz",
    categoria: "Memoria RAM",
    precio: 35,
    costo: 22,
    stock: 15,
    stockMinimo: 5,
    codigo: "RAM-001",
    descripcion: "Memoria RAM de alto rendimiento para gaming y multitarea",
    destacado: false,
    especificaciones: {
      capacidad: "8GB",
      tipo: "DDR4",
      velocidad: "3200MHz",
      latencia: "CL16",
      voltaje: "1.35V"
    }
  },
  {
    id: 4,
    nombre: "Vengeance RGB Pro",
    marca: "Corsair",
    modelo: "DDR4 3600MHz",
    categoria: "Memoria RAM",
    precio: 75,
    costo: 52,
    stock: 10,
    stockMinimo: 3,
    codigo: "RAM-002",
    descripcion: "Memoria RAM con iluminación RGB personalizable",
    destacado: false,
    especificaciones: {
      capacidad: "16GB",
      tipo: "DDR4",
      velocidad: "3600MHz",
      latencia: "CL18",
      voltaje: "1.35V",
      rgb: "Sí"
    }
  },
  {
    id: 5,
    nombre: "A400",
    marca: "Kingston",
    modelo: "SATA III",
    categoria: "Disco SSD",
    precio: 55,
    costo: 35,
    stock: 0,
    stockMinimo: 3,
    codigo: "SSD-001",
    descripcion: "SSD de entrada con excelente relación precio-rendimiento",
    destacado: false,
    especificaciones: {
      capacidad: "240GB",
      interfaz: "SATA III",
      velocidadLectura: "500 MB/s",
      velocidadEscritura: "450 MB/s",
      formato: "2.5 pulgadas"
    }
  },
  {
    id: 6,
    nombre: "970 EVO Plus",
    marca: "Samsung",
    modelo: "NVMe M.2",
    categoria: "Disco SSD",
    precio: 125,
    costo: 85,
    stock: 6,
    stockMinimo: 2,
    codigo: "SSD-002",
    descripcion: "SSD NVMe de alto rendimiento para cargas de trabajo intensivas",
    destacado: true,
    especificaciones: {
      capacidad: "500GB",
      interfaz: "NVMe PCIe 3.0 x4",
      velocidadLectura: "3500 MB/s",
      velocidadEscritura: "3200 MB/s",
      formato: "M.2 2280"
    }
  }
];
