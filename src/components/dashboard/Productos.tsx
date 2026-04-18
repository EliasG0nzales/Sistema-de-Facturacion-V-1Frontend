import { useState } from "react";
import type { Producto } from "../../types/producto";
import { CATEGORIAS, productosEjemplo } from "../../data/productos";

const EMPTY_FORM = {
  nombre: "", precio: "", costo: "", stock: "", stockMinimo: "",
  categoria: CATEGORIAS[0], descripcion: "", codigo: "", destacado: false,
};

const Productos = () => {
  const [productos, setProductos] = useState<Producto[]>(productosEjemplo);
  const [form, setForm] = useState(EMPTY_FORM);
  const [busqueda, setBusqueda] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nuevo: Producto = {
      id: Date.now(),
      nombre: form.nombre,
      precio: parseFloat(form.precio) || 0,
      costo: parseFloat(form.costo) || 0,
      stock: parseInt(form.stock) || 0,
      stockMinimo: parseInt(form.stockMinimo) || 0,
      categoria: form.categoria,
      descripcion: form.descripcion,
      codigo: form.codigo,
      destacado: form.destacado,
    };
    setProductos((prev) => [nuevo, ...prev]);
    setForm(EMPTY_FORM);
  };

  const productosFiltrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    p.codigo.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", fontFamily: "inherit", overflow: "hidden" }}>
      <style>{`
        .prod-input {
          padding: 8px 12px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          font-size: 0.82rem;
          outline: none;
          color: #1e293b;
          background: #fff;
          width: 100%;
          transition: border-color 0.2s;
        }
        .prod-input:focus { border-color: #2563eb; }
        .prod-label { font-size: 0.72rem; font-weight: 600; color: #64748b; margin-bottom: 4px; display: block; }
        .prod-section { background: #fff; border-radius: 12px; border: 1px solid #e2e8f0; padding: 16px; }
        .prod-table { width: 100%; border-collapse: collapse; font-size: 0.78rem; }
        .prod-table th { background: #f8fafc; padding: 8px 12px; text-align: left; font-weight: 600; color: #64748b; border-bottom: 1px solid #e2e8f0; }
        .prod-table td { padding: 8px 12px; border-bottom: 1px solid #f1f5f9; color: #1e293b; }
        .prod-table tr:hover td { background: #f8fafc; }
        .stock-badge {
          display: inline-block; padding: 2px 8px; border-radius: 20px;
          font-size: 0.7rem; font-weight: 600;
        }
        .stock-ok { background: #dcfce7; color: #16a34a; }
        .stock-low { background: #fef9c3; color: #ca8a04; }
        .stock-out { background: #fee2e2; color: #dc2626; }
      `}</style>

      {/* Header */}
      <div style={{ background: "#888", padding: "10px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
        <h2 style={{ margin: 0, fontSize: 18, fontWeight: 600, color: "#fff" }}>Productos</h2>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px", background: "#e8e8e8", display: "flex", flexDirection: "column", gap: 16 }}>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="prod-section">
          <p style={{ fontSize: "0.78rem", color: "#64748b", marginBottom: 14 }}>Registre sus productos...</p>

          {/* Destacar */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, background: "#f8fafc", borderRadius: 8, padding: "8px 14px", border: "1px solid #e2e8f0" }}>
            <label style={{ fontSize: "0.82rem", color: "#475569", cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
              <input type="checkbox" name="destacado" checked={form.destacado} onChange={handleChange} />
              Destacar un producto
            </label>
            <svg viewBox="0 0 24 24" width="18" height="18" fill={form.destacado ? "#f59e0b" : "none"} stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "160px 1fr 2fr", gap: 16, alignItems: "start" }}>
            {/* Portada + Galería */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div>
                <span className="prod-label">Portada</span>
                <div style={{ width: "100%", aspectRatio: "1/1", background: "#e2e8f0", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", border: "2px dashed #cbd5e1" }}>
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                </div>
              </div>
              <div>
                <span className="prod-label">Galería</span>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
                  {[0,1,2,3].map((i) => (
                    <div key={i} style={{ aspectRatio: "1/1", background: "#e2e8f0", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", border: "1px dashed #cbd5e1" }}>
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Campos principales */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div>
                <label className="prod-label">Nombre del producto</label>
                <input className="prod-input" name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre del producto" required />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                <div>
                  <label className="prod-label">Precio</label>
                  <input className="prod-input" name="precio" value={form.precio} onChange={handleChange} placeholder="Precio" type="number" min="0" step="0.01" required />
                </div>
                <div>
                  <label className="prod-label">Categoría</label>
                  <select className="prod-input" name="categoria" value={form.categoria} onChange={handleChange}>
                    {CATEGORIAS.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="prod-label">Descripción</label>
                <textarea className="prod-input" name="descripcion" value={form.descripcion} onChange={handleChange} placeholder="Descripción" rows={4} style={{ resize: "vertical" }} />
              </div>
              <div>
                <label className="prod-label">Código del producto</label>
                <input className="prod-input" name="codigo" value={form.codigo} onChange={handleChange} placeholder="Código del producto" />
              </div>
              <div>
                <label className="prod-label">Costo</label>
                <input className="prod-input" name="costo" value={form.costo} onChange={handleChange} placeholder="Costo" type="number" min="0" step="0.01" />
              </div>
            </div>

            {/* Stock */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div className="prod-section" style={{ background: "#f8fafc" }}>
                <span className="prod-label" style={{ fontSize: "0.82rem", color: "#1e293b", marginBottom: 10 }}>Stock</span>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <div>
                    <label className="prod-label">Stock actual</label>
                    <input className="prod-input" name="stock" value={form.stock} onChange={handleChange} placeholder="Stock actual" type="number" min="0" />
                  </div>
                  <div>
                    <label className="prod-label">Stock mínimo</label>
                    <input className="prod-input" name="stockMinimo" value={form.stockMinimo} onChange={handleChange} placeholder="Stock mínimo" type="number" min="0" />
                  </div>
                </div>
              </div>
              <button
                type="submit"
                style={{ padding: "10px", background: "linear-gradient(135deg, #2563eb, #1e40af)", color: "#fff", border: "none", borderRadius: 10, fontSize: "0.85rem", fontWeight: 700, cursor: "pointer" }}
              >
                Guardar Producto
              </button>
            </div>
          </div>
        </form>

        {/* Tabla de productos */}
        <div className="prod-section">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <span style={{ fontWeight: 700, fontSize: "0.9rem", color: "#1e293b" }}>Todos los productos ({productos.length})</span>
            <input
              className="prod-input"
              style={{ width: 220 }}
              placeholder="Buscar por nombre o código..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>
          <div style={{ overflowX: "auto" }}>
            <table className="prod-table">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Nombre</th>
                  <th>Categoría</th>
                  <th>Precio</th>
                  <th>Costo</th>
                  <th>Stock</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {productosFiltrados.map((p) => {
                  const estado = p.stock === 0 ? "out" : p.stock <= p.stockMinimo ? "low" : "ok";
                  return (
                    <tr key={p.id}>
                      <td style={{ color: "#64748b", fontFamily: "monospace" }}>{p.codigo}</td>
                      <td style={{ fontWeight: 600 }}>{p.nombre}{p.destacado && <span style={{ marginLeft: 6, color: "#f59e0b", fontSize: "0.7rem" }}>★</span>}</td>
                      <td>{p.categoria}</td>
                      <td>S/ {p.precio.toFixed(2)}</td>
                      <td style={{ color: "#64748b" }}>S/ {p.costo.toFixed(2)}</td>
                      <td>{p.stock}</td>
                      <td>
                        <span className={`stock-badge stock-${estado}`}>
                          {estado === "ok" ? "En stock" : estado === "low" ? "Stock bajo" : "Sin stock"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Productos;
