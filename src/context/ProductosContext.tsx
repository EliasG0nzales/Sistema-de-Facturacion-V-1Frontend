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

export const ProductosProvider = ({ children }: { children: ReactNode }) => {
  // Inicializar desde localStorage o usar productos de ejemplo
  const [productos, setProductos] = useState<Producto[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
      return productosEjemplo;
    } catch (error) {
      console.error("Error al cargar productos desde localStorage:", error);
      return productosEjemplo;
    }
  });

  // Guardar en localStorage cada vez que cambien los productos
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(productos));
    } catch (error) {
      console.error("Error al guardar productos en localStorage:", error);
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
