import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { Producto } from "../types/producto";
import { productosEjemplo } from "../data/productos";

interface ProductosContextType {
  productos: Producto[];
  agregarProducto: (producto: Producto) => void;
  actualizarProducto: (id: number, producto: Producto) => void;
  eliminarProducto: (id: number) => void;
}

const ProductosContext = createContext<ProductosContextType | undefined>(undefined);

const STORAGE_KEY = "productos_inventario";
const IMAGES_KEY = "productos_imagenes";

// Guardar imágenes por separado en localStorage
const guardarImagenes = (productos: Producto[]) => {
  const mapa: Record<number, { principal?: string; secundarias?: string[] }> = {};
  productos.forEach(p => {
    if (p.imagenPrincipal || (p.imagenesSecundarias && p.imagenesSecundarias.length > 0)) {
      mapa[p.id] = {
        principal: p.imagenPrincipal,
        secundarias: p.imagenesSecundarias,
      };
    }
  });
  try {
    localStorage.setItem(IMAGES_KEY, JSON.stringify(mapa));
  } catch {
    // Si falla, ignorar (imágenes no persistidas)
  }
};

const cargarImagenes = (): Record<number, { principal?: string; secundarias?: string[] }> => {
  try {
    const stored = localStorage.getItem(IMAGES_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
};

export const ProductosProvider = ({ children }: { children: ReactNode }) => {
  const [productos, setProductos] = useState<Producto[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const prods: Producto[] = JSON.parse(stored);
        const imagenes = cargarImagenes();
        // Reinyectar imágenes
        return prods.map(p => ({
          ...p,
          imagenPrincipal: imagenes[p.id]?.principal || p.imagenPrincipal,
          imagenesSecundarias: imagenes[p.id]?.secundarias || p.imagenesSecundarias,
        }));
      }
      return productosEjemplo;
    } catch {
      return productosEjemplo;
    }
  });

  useEffect(() => {
    try {
      // Guardar datos sin imágenes (para no superar cuota)
      const sinImagenes = productos.map(p => ({
        ...p,
        imagenPrincipal: undefined,
        imagenesSecundarias: undefined,
      }));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sinImagenes));
      // Guardar imágenes por separado
      guardarImagenes(productos);
    } catch (error) {
      console.error("Error al guardar productos:", error);
    }
  }, [productos]);

  const agregarProducto = (producto: Producto) => {
    setProductos((prev) => [producto, ...prev]);
  };

  const actualizarProducto = (id: number, producto: Producto) => {
    setProductos((prev) => prev.map((p) => (p.id === id ? producto : p)));
  };

  const eliminarProducto = (id: number) => {
    setProductos((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <ProductosContext.Provider value={{ productos, agregarProducto, actualizarProducto, eliminarProducto }}>
      {children}
    </ProductosContext.Provider>
  );
};

export const useProductos = () => {
  const context = useContext(ProductosContext);
  if (!context) {
    throw new Error("useProductos debe usarse dentro de ProductosProvider");
  }
  return context;
};
