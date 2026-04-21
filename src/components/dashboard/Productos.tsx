import { useState } from "react";
import type { Producto } from "../../types/producto";
import { CATEGORIAS } from "../../data/productos";
import { useProductos } from "../../context/ProductosContext";

const EMPTY_FORM = {
  nombre: "", marca: "", modelo: "", precio: "", costo: "", stock: "", stockMinimo: "",
  categoria: CATEGORIAS[0], descripcion: "", codigo: "", destacado: false,
  badge: "" as "oferta" | "nuevo" | "ultimas" | "",
  imagenPrincipal: "", imagenesSecundarias: ["", "", "", ""],
};

const Productos = () => {
  const { productos, agregarProducto, eliminarProducto } = useProductos();
  const [form, setForm] = useState(EMPTY_FORM);
  const [busqueda, setBusqueda] = useState("");
  const [confirmEliminar, setConfirmEliminar] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleImagenPrincipal = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setForm((prev) => ({ ...prev, imagenPrincipal: reader.result as string }));
      reader.readAsDataURL(file);
    }
  };

  const handleImagenSecundaria = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => {
          const nuevasImagenes = [...prev.imagenesSecundarias];
          nuevasImagenes[index] = reader.result as string;
          return { ...prev, imagenesSecundarias: nuevasImagenes };
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const datos: Producto = {
      id: Date.now(),
      nombre: form.nombre, marca: form.marca, modelo: form.modelo,
      categoria: form.categoria,
      precio: parseFloat(form.precio) || 0,
      costo: parseFloat(form.costo) || 0,
      stock: parseInt(form.stock) || 0,
      stockMinimo: parseInt(form.stockMinimo) || 0,
      codigo: form.codigo, descripcion: form.descripcion,
      destacado: form.destacado, badge: form.badge,
      especificaciones: {},
      imagenPrincipal: form.imagenPrincipal,
      imagenesSecundarias: form.imagenesSecundarias.filter(img => img !== ""),
    };
    agregarProducto(datos);
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
          padding: 8px 12px; border: 1px solid #e2e8f0; border-radius: 8px;
          font-size: 0.82rem; outline: none; color: #1e293b; background: #fff;
          width: 100%; transition: border-color 0.2s;
        }
        .prod-input:focus { border-color: #c0392b; }
        .prod-input option { background: #fff; color: #1e293b; }
        .prod-label { font-size: 0.72rem; font-weight: 600; color: #c0392b; margin-bottom: 4px; display: block; }
        .prod-section { background: #fff; border-radius: 12px; border: 1px solid #e2e8f0; padding: 16px; }
        .prod-table { width: 100%; border-collapse: collapse; font-size: 0.78rem; min-width: 1200px; }
        .prod-table th { background: #fef2f2; padding: 10px 12px; font-weight: 600; color: #c0392b; border-bottom: 1px solid #fecaca; text-align: center; }
        .prod-table td { padding: 10px 12px; border-bottom: 1px solid #f1f5f9; color: #1e293b; text-align: center; vertical-align: middle; }
        .prod-table tr:hover td { background: #fef2f2; }
        .stock-badge { display: inline-block; padding: 2px 8px; border-radius: 20px; font-size: 0.7rem; font-weight: 600; }
        .stock-ok { background: #dcfce7; color: #16a34a; }
        .stock-low { background: #fef9c3; color: #ca8a04; }
        .stock-out { background: #fee2e2; color: #dc2626; }
        .btn-accion { border: none; border-radius: 6px; width: 28px; height: 28px; display: inline-flex; align-items: center; justify-content: center; cursor: pointer; transition: opacity 0.15s; }
        .btn-accion:hover { opacity: 0.75; }
        .btn-editar { background: #eff6ff; }
        .btn-eliminar { background: #fee2e2; }
      `}</style>

      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #c0392b, #e74c3c)", padding: "10px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
        <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: "#fff", letterSpacing: 1 }}>Productos</h2>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px", background: "#f1f5f9", display: "flex", flexDirection: "column", gap: 16 }}>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="prod-section">
          <p style={{ fontSize: "0.78rem", color: "#c0392b", marginBottom: 14 }}>Registre sus productos...</p>

          {/* Destacar + Badge */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16, background: "#fef2f2", borderRadius: 8, padding: "8px 14px", border: "1px solid #fecaca", flexWrap: "wrap" }}>
            <label style={{ fontSize: "0.82rem", color: "#1e293b", cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
              <input type="checkbox" name="destacado" checked={form.destacado} onChange={handleChange} />
              Destacar un producto
            </label>
            <svg viewBox="0 0 24 24" width="18" height="18" fill={form.destacado ? "#f59e0b" : "none"} stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginLeft: "auto" }}>
              <span style={{ fontSize: "0.75rem", color: "#c0392b", fontWeight: 600 }}>Etiqueta:</span>
              <select name="badge" value={form.badge} onChange={handleChange} className="prod-input" style={{ width: "auto", padding: "4px 10px", fontSize: "0.78rem" }}>
                <option value="">Sin etiqueta</option>
                <option value="oferta">🔥 Oferta</option>
                <option value="nuevo">🆕 Nuevo</option>
                <option value="ultimas">⚡ Últimas unidades</option>
              </select>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "160px 1fr 2fr", gap: 16, alignItems: "start" }}>
            {/* Portada + Galería */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div>
                <span className="prod-label">Portada</span>
                <input type="file" accept="image/*" onChange={handleImagenPrincipal} style={{ display: "none" }} id="imagen-principal" />
                <label htmlFor="imagen-principal" style={{ width: "100%", aspectRatio: "1/1", background: form.imagenPrincipal ? `url(${form.imagenPrincipal}) center/cover` : "#f1f5f9", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", border: "2px dashed #fca5a5", position: "relative", overflow: "hidden" }}>
                  {!form.imagenPrincipal && <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>}
                </label>
              </div>
              <div>
                <span className="prod-label">Galería</span>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
                  {[0, 1, 2, 3].map((i) => (
                    <div key={i}>
                      <input type="file" accept="image/*" onChange={(e) => handleImagenSecundaria(i, e)} style={{ display: "none" }} id={`imagen-secundaria-${i}`} />
                      <label htmlFor={`imagen-secundaria-${i}`} style={{ aspectRatio: "1/1", background: form.imagenesSecundarias[i] ? `url(${form.imagenesSecundarias[i]}) center/cover` : "#f1f5f9", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", border: "1px dashed #fca5a5", overflow: "hidden" }}>
                        {!form.imagenesSecundarias[i] && <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Campos principales */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div><label className="prod-label">Nombre del producto</label><input className="prod-input" name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre del producto" required /></div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                <div><label className="prod-label">Marca</label><input className="prod-input" name="marca" value={form.marca} onChange={handleChange} placeholder="Marca" required /></div>
                <div><label className="prod-label">Modelo</label><input className="prod-input" name="modelo" value={form.modelo} onChange={handleChange} placeholder="Modelo" required /></div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                <div><label className="prod-label">Precio</label><input className="prod-input" name="precio" value={form.precio} onChange={handleChange} placeholder="Precio" type="number" min="0" step="0.01" required /></div>
                <div><label className="prod-label">Categoría</label><select className="prod-input" name="categoria" value={form.categoria} onChange={handleChange}>{CATEGORIAS.map((c) => <option key={c} value={c}>{c}</option>)}</select></div>
              </div>
              <div><label className="prod-label">Descripción</label><textarea className="prod-input" name="descripcion" value={form.descripcion} onChange={handleChange} placeholder="Descripción" rows={4} style={{ resize: "vertical" }} /></div>
              <div><label className="prod-label">Código del producto</label><input className="prod-input" name="codigo" value={form.codigo} onChange={handleChange} placeholder="Código del producto" /></div>
              <div><label className="prod-label">Costo</label><input className="prod-input" name="costo" value={form.costo} onChange={handleChange} placeholder="Costo" type="number" min="0" step="0.01" /></div>
            </div>

            {/* Stock */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div className="prod-section" style={{ background: "#fef2f2", border: "1px solid #fecaca" }}>
                <span className="prod-label" style={{ fontSize: "0.82rem", marginBottom: 10 }}>Stock</span>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <div><label className="prod-label">Stock actual</label><input className="prod-input" name="stock" value={form.stock} onChange={handleChange} placeholder="Stock actual" type="number" min="0" /></div>
                  <div><label className="prod-label">Stock mínimo</label><input className="prod-input" name="stockMinimo" value={form.stockMinimo} onChange={handleChange} placeholder="Stock mínimo" type="number" min="0" /></div>
                </div>
              </div>
              <button type="submit" style={{ padding: "10px", background: "linear-gradient(135deg, #c0392b, #e74c3c)", color: "#fff", border: "none", borderRadius: 10, fontSize: "0.85rem", fontWeight: 700, cursor: "pointer" }}>
                Guardar Producto
              </button>
            </div>
          </div>
        </form>

        {/* Tabla */}
        <div className="prod-section">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <span style={{ fontWeight: 700, fontSize: "0.9rem", color: "#1e293b" }}>Todos los productos ({productos.length})</span>
            <input className="prod-input" style={{ width: 220 }} placeholder="Buscar por nombre o código..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
          </div>
          <div style={{ overflowX: "auto" }}>
            <table className="prod-table">
              <thead>
                <tr><th>Código</th><th>Nombre</th><th>Marca</th><th>Modelo</th><th>Categoría</th><th>Precio</th><th>Stock</th><th>Estado</th><th>Acciones</th></tr>
              </thead>
              <tbody>
                {productosFiltrados.map((p) => {
                  const estado = p.stock === 0 ? "out" : p.stock <= p.stockMinimo ? "low" : "ok";
                  return (
                    <tr key={p.id}>
                      <td style={{ color: "#64748b", fontFamily: "monospace" }}>{p.codigo}</td>
                      <td style={{ fontWeight: 600 }}>{p.nombre}{p.destacado && <span style={{ marginLeft: 6, color: "#f59e0b", fontSize: "0.7rem" }}>★</span>}</td>
                      <td>{p.marca}</td><td>{p.modelo}</td><td>{p.categoria}</td>
                      <td>S/ {p.precio.toFixed(2)}</td><td>{p.stock}</td>
                      <td><span className={`stock-badge stock-${estado}`}>{estado === "ok" ? "En stock" : estado === "low" ? "Stock bajo" : "Sin stock"}</span></td>
                      <td>
                        <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
                          <button className="btn-accion btn-eliminar" onClick={() => setConfirmEliminar(p.id)} title="Eliminar">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal eliminar */}
      {confirmEliminar !== null && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "#fff", borderRadius: 12, padding: 24, width: 320, boxShadow: "0 10px 40px rgba(0,0,0,0.15)", border: "1px solid #e2e8f0" }}>
            <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "#0f172a", marginBottom: 8 }}>¿Eliminar producto?</div>
            <div style={{ fontSize: "0.82rem", color: "#64748b", marginBottom: 20 }}>Esta acción no se puede deshacer.</div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => { eliminarProducto(confirmEliminar); setConfirmEliminar(null); }} style={{ flex: 1, padding: "9px", background: "linear-gradient(135deg,#c0392b,#e74c3c)", color: "#fff", border: "none", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontSize: "0.82rem" }}>Eliminar</button>
              <button onClick={() => setConfirmEliminar(null)} style={{ flex: 1, padding: "9px", background: "#f1f5f9", color: "#475569", border: "1px solid #e2e8f0", borderRadius: 8, fontWeight: 600, cursor: "pointer", fontSize: "0.82rem" }}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Productos;
