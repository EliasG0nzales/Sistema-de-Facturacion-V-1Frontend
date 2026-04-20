import { useState } from "react";
import { useProductos } from "../../context/ProductosContext";
import { CATEGORIAS } from "../../data/productos";
import type { Producto } from "../../types/producto";

// ── Tipos de usuario registrado ────────────────────────────────────────────
interface RegisteredUser {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
}

// ── Sección activa del panel ───────────────────────────────────────────────
type AdminSection = "dashboard" | "productos" | "usuarios" | "configuracion";

// ── Estilos base ──────────────────────────────────────────────────────────
const card: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #e2e8f0",
  borderRadius: 12,
  padding: "16px 20px",
};

const inputCls: React.CSSProperties = {
  width: "100%",
  padding: "8px 12px",
  border: "1px solid #e2e8f0",
  borderRadius: 8,
  fontSize: 13,
  outline: "none",
  color: "#1e293b",
  background: "#fff",
  boxSizing: "border-box",
};

const labelCls: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 600,
  color: "#64748b",
  marginBottom: 4,
  display: "block",
  textAlign: "left",
};

const btnPrimary: React.CSSProperties = {
  padding: "9px 18px",
  background: "#2563eb",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  fontSize: 13,
  fontWeight: 600,
  cursor: "pointer",
};

const btnDanger: React.CSSProperties = {
  padding: "6px 12px",
  background: "#fee2e2",
  color: "#dc2626",
  border: "none",
  borderRadius: 6,
  fontSize: 12,
  fontWeight: 600,
  cursor: "pointer",
};

// ── Stat card ─────────────────────────────────────────────────────────────
const StatCard = ({ label, value, color }: { label: string; value: string | number; color: string }) => (
  <div style={{ ...card, borderLeft: `4px solid ${color}`, display: "flex", flexDirection: "column", gap: 4 }}>
    <span style={{ fontSize: 12, color: "#64748b", fontWeight: 600 }}>{label}</span>
    <span style={{ fontSize: 26, fontWeight: 800, color: "#0f172a" }}>{value}</span>
  </div>
);

// ── AdminPanel ─────────────────────────────────────────────────────────────
const AdminPanel = ({ onVolverTienda }: { onVolverTienda?: () => void }) => {
  const { productos, agregarProducto, eliminarProducto, actualizarProducto } = useProductos();
  const [section, setSection] = useState<AdminSection>("dashboard");

  // ── Estado productos ───────────────────────────────────────────────────
  const EMPTY_PROD = {
    nombre: "", marca: "", modelo: "", precio: "", costo: "", stock: "",
    stockMinimo: "", categoria: CATEGORIAS[0], descripcion: "", codigo: "",
    destacado: false, imagenPrincipal: "", imagenesSecundarias: ["", "", "", ""],
  };
  const [formProd, setFormProd]         = useState(EMPTY_PROD);
  const [editandoId, setEditandoId]     = useState<number | null>(null);
  const [busqProd, setBusqProd]         = useState("");
  const [confirmDel, setConfirmDel]     = useState<number | null>(null);

  // ── Estado usuarios ────────────────────────────────────────────────────
  const getUsers = (): RegisteredUser[] =>
    JSON.parse(localStorage.getItem("eagle_users") || "[]");
  const [usuarios, setUsuarios]         = useState<RegisteredUser[]>(getUsers);
  const [busqUser, setBusqUser]         = useState("");
  const [confirmDelUser, setConfirmDelUser] = useState<string | null>(null);

  // ── Estado config ──────────────────────────────────────────────────────
  const [storeName, setStoreName]       = useState(localStorage.getItem("eagle_store_name") || "Eagle Gaming");
  const [storeMsg, setStoreMsg]         = useState("");

  // ── Handlers productos ─────────────────────────────────────────────────
  const handleProdChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormProd(prev => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleImgPrincipal = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setFormProd(prev => ({ ...prev, imagenPrincipal: reader.result as string }));
    reader.readAsDataURL(file);
  };

  const handleImgSecundaria = (i: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () =>
      setFormProd(prev => {
        const arr = [...prev.imagenesSecundarias];
        arr[i] = reader.result as string;
        return { ...prev, imagenesSecundarias: arr };
      });
    reader.readAsDataURL(file);
  };

  const handleProdSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const datos: Producto = {
      id: editandoId ?? Date.now(),
      nombre: formProd.nombre,
      marca: formProd.marca,
      modelo: formProd.modelo,
      categoria: formProd.categoria,
      precio: parseFloat(formProd.precio) || 0,
      costo: parseFloat(formProd.costo) || 0,
      stock: parseInt(formProd.stock) || 0,
      stockMinimo: parseInt(formProd.stockMinimo) || 0,
      codigo: formProd.codigo,
      descripcion: formProd.descripcion,
      destacado: formProd.destacado,
      especificaciones: {},
      imagenPrincipal: formProd.imagenPrincipal,
      imagenesSecundarias: formProd.imagenesSecundarias.filter(img => img !== ""),
    };
    if (editandoId !== null) {
      actualizarProducto(editandoId, datos);
      setEditandoId(null);
    } else {
      agregarProducto(datos);
    }
    setFormProd(EMPTY_PROD);
  };

  const handleEditar = (p: Producto) => {
    setEditandoId(p.id);
    setFormProd({
      nombre: p.nombre, marca: p.marca, modelo: p.modelo,
      precio: String(p.precio), costo: String(p.costo),
      stock: String(p.stock), stockMinimo: String(p.stockMinimo),
      categoria: p.categoria, descripcion: p.descripcion,
      codigo: p.codigo, destacado: p.destacado,
      imagenPrincipal: p.imagenPrincipal || "",
      imagenesSecundarias: [...(p.imagenesSecundarias || ["", "", "", ""]), "", "", "", ""].slice(0, 4),
    });
    setSection("productos");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ── Handlers usuarios ──────────────────────────────────────────────────
  const eliminarUsuario = (email: string) => {
    const nuevos = usuarios.filter(u => u.email !== email);
    localStorage.setItem("eagle_users", JSON.stringify(nuevos));
    setUsuarios(nuevos);
    setConfirmDelUser(null);
  };

  // ── Stats ──────────────────────────────────────────────────────────────
  const sinStock        = productos.filter(p => p.stock === 0).length;
  const valorInventario = productos.reduce((a, p) => a + p.precio * p.stock, 0);

  const prodFiltrados  = productos.filter(p =>
    p.nombre.toLowerCase().includes(busqProd.toLowerCase()) ||
    p.codigo.toLowerCase().includes(busqProd.toLowerCase())
  );
  const usersFiltrados = usuarios.filter(u =>
    `${u.nombre} ${u.apellido} ${u.email}`.toLowerCase().includes(busqUser.toLowerCase())
  );

  // ── NAV ITEMS ──────────────────────────────────────────────────────────
  const navItems: { key: AdminSection; label: string; icon: React.ReactNode }[] = [
    { key: "dashboard", label: "Dashboard", icon: <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg> },
    { key: "productos", label: "Productos", icon: <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg> },
    { key: "usuarios", label: "Usuarios", icon: <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
    { key: "configuracion", label: "Configuración", icon: <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg> },
  ];

  return (
    <div style={{ display: "flex", height: "100%", fontFamily: "sans-serif", background: "#f1f5f9" }}>

      {/* ── Sidebar admin ────────────────────────────────────────────── */}
      <aside style={{ width: 220, background: "#0f172a", display: "flex", flexDirection: "column", padding: "24px 16px", gap: 4, flexShrink: 0 }}>
        <div style={{ marginBottom: 24, paddingBottom: 16, borderBottom: "1px solid #1e293b" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {/* ── LOGO ÁGUILA ── */}
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiBocmg0ZVPn-wZHzRpimfCLHYFPfrbdsmQQ&s"
              alt="Eagle Admin"
              style={{ width: 36, height: 36, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }}
            />
            <div>
              <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "#f1f5f9" }}>Eagle Admin</p>
              <p style={{ margin: 0, fontSize: 11, color: "#64748b" }}>Administrador</p>
            </div>
          </div>
        </div>

        {navItems.map(item => (
          <button
            key={item.key}
            onClick={() => setSection(item.key)}
            style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "10px 12px", borderRadius: 8, border: "none",
              background: section === item.key ? "#2563eb" : "transparent",
              color: section === item.key ? "#fff" : "#94a3b8",
              fontSize: 13, fontWeight: 600, cursor: "pointer", textAlign: "left",
              transition: "background 0.2s",
            }}
          >
            {item.icon}
            {item.label}
          </button>
        ))}

        <div style={{ marginTop: "auto", paddingTop: 16, borderTop: "1px solid #1e293b", display: "flex", flexDirection: "column", gap: 12 }}>
          {onVolverTienda && (
            <button
              onClick={onVolverTienda}
              style={{
                width: "100%", padding: "10px 12px", borderRadius: 8, border: "none",
                background: "#2563eb", color: "#fff",
                fontSize: 13, fontWeight: 600, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
              }}
            >
              ← Ver tienda
            </button>
          )}
          <div style={{ fontSize: 11, color: "#475569", textAlign: "center" }}>
            Panel de Administración<br />Eagle Gaming v1.0
          </div>
        </div>
      </aside>

      {/* ── Contenido ────────────────────────────────────────────────── */}
      <main style={{ flex: 1, overflowY: "auto", padding: "24px 28px" }}>

        {/* ════ DASHBOARD ════ */}
        {section === "dashboard" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "#0f172a", textAlign: "left" }}>Resumen general</h2>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
              <StatCard label="Total productos"      value={productos.length}                    color="#2563eb" />
              <StatCard label="Usuarios registrados" value={usuarios.length}                     color="#16a34a" />
              <StatCard label="Sin stock"            value={sinStock}                            color="#dc2626" />
              <StatCard label="Valor inventario"     value={`S/ ${valorInventario.toFixed(2)}`} color="#d97706" />
            </div>

            {/* Tabla resumen productos */}
            <div style={card}>
              <h3 style={{ margin: "0 0 14px", fontSize: 15, fontWeight: 700, color: "#0f172a", textAlign: "left" }}>Productos recientes</h3>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr style={{ background: "#f8fafc" }}>
                    {["Nombre", "Categoría", "Precio", "Stock", "Estado"].map(h => (
                      <th key={h} style={{ padding: "8px 12px", textAlign: "left", fontWeight: 600, color: "#64748b", borderBottom: "1px solid #e2e8f0" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {productos.slice(0, 6).map(p => {
                    const est = p.stock === 0
                      ? { label: "Sin stock", bg: "#fee2e2", color: "#dc2626" }
                      : p.stock <= p.stockMinimo
                        ? { label: "Stock bajo", bg: "#fef9c3", color: "#ca8a04" }
                        : { label: "En stock", bg: "#dcfce7", color: "#16a34a" };
                    return (
                      <tr key={p.id}>
                        <td style={{ padding: "8px 12px", borderBottom: "1px solid #f1f5f9", fontWeight: 600 }}>{p.nombre}</td>
                        <td style={{ padding: "8px 12px", borderBottom: "1px solid #f1f5f9", color: "#64748b" }}>{p.categoria}</td>
                        <td style={{ padding: "8px 12px", borderBottom: "1px solid #f1f5f9" }}>S/ {p.precio.toFixed(2)}</td>
                        <td style={{ padding: "8px 12px", borderBottom: "1px solid #f1f5f9" }}>{p.stock}</td>
                        <td style={{ padding: "8px 12px", borderBottom: "1px solid #f1f5f9" }}>
                          <span style={{ background: est.bg, color: est.color, padding: "2px 8px", borderRadius: 20, fontSize: 11, fontWeight: 600 }}>{est.label}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Tabla resumen usuarios */}
            <div style={card}>
              <h3 style={{ margin: "0 0 14px", fontSize: 15, fontWeight: 700, color: "#0f172a", textAlign: "left" }}>Usuarios registrados</h3>
              {usuarios.length === 0 ? (
                <p style={{ color: "#94a3b8", fontSize: 13, textAlign: "center", padding: "20px 0" }}>No hay usuarios registrados aún.</p>
              ) : (
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                  <thead>
                    <tr style={{ background: "#f8fafc" }}>
                      {["Nombre", "Apellido", "Email"].map(h => (
                        <th key={h} style={{ padding: "8px 12px", textAlign: "left", fontWeight: 600, color: "#64748b", borderBottom: "1px solid #e2e8f0" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {usuarios.slice(0, 5).map(u => (
                      <tr key={u.email}>
                        <td style={{ padding: "8px 12px", borderBottom: "1px solid #f1f5f9" }}>{u.nombre}</td>
                        <td style={{ padding: "8px 12px", borderBottom: "1px solid #f1f5f9" }}>{u.apellido}</td>
                        <td style={{ padding: "8px 12px", borderBottom: "1px solid #f1f5f9", color: "#2563eb" }}>{u.email}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* ════ PRODUCTOS ════ */}
        {section === "productos" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "#0f172a", textAlign: "left" }}>
              {editandoId ? "Editar producto" : "Agregar producto"}
            </h2>

            {/* Formulario */}
            <form onSubmit={handleProdSubmit} style={{ ...card, display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "grid", gridTemplateColumns: "140px 1fr 1fr", gap: 16, alignItems: "start" }}>

                {/* Imágenes */}
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <label style={labelCls}>Portada</label>
                  <input type="file" accept="image/*" id="adm-img-principal" style={{ display: "none" }} onChange={handleImgPrincipal} />
                  <label
                    htmlFor="adm-img-principal"
                    style={{
                      width: "100%", aspectRatio: "1/1",
                      background: formProd.imagenPrincipal ? `url(${formProd.imagenPrincipal}) center/cover` : "#e2e8f0",
                      borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
                      cursor: "pointer", border: "2px dashed #cbd5e1", overflow: "hidden",
                    }}
                  >
                    {!formProd.imagenPrincipal && (
                      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#94a3b8" strokeWidth="1.5">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                        <polyline points="7 10 12 15 17 10"/>
                        <line x1="12" y1="15" x2="12" y2="3"/>
                      </svg>
                    )}
                  </label>
                  <label style={labelCls}>Galería</label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
                    {[0,1,2,3].map(i => (
                      <div key={i}>
                        <input type="file" accept="image/*" id={`adm-img-sec-${i}`} style={{ display: "none" }} onChange={e => handleImgSecundaria(i, e)} />
                        <label
                          htmlFor={`adm-img-sec-${i}`}
                          style={{
                            aspectRatio: "1/1",
                            background: formProd.imagenesSecundarias[i] ? `url(${formProd.imagenesSecundarias[i]}) center/cover` : "#e2e8f0",
                            borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center",
                            cursor: "pointer", border: "1px dashed #cbd5e1", overflow: "hidden",
                          }}
                        >
                          {!formProd.imagenesSecundarias[i] && (
                            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#94a3b8" strokeWidth="2">
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                              <polyline points="7 10 12 15 17 10"/>
                              <line x1="12" y1="15" x2="12" y2="3"/>
                            </svg>
                          )}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Info principal */}
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {[
                    { label: "Nombre", name: "nombre", placeholder: "Nombre del producto" },
                    { label: "Marca",  name: "marca",  placeholder: "Marca" },
                    { label: "Modelo", name: "modelo", placeholder: "Modelo" },
                    { label: "Código", name: "codigo", placeholder: "Código" },
                  ].map(f => (
                    <div key={f.name}>
                      <label style={labelCls}>{f.label}</label>
                      <input
                        style={inputCls}
                        name={f.name}
                        value={(formProd as Record<string, unknown>)[f.name] as string}
                        onChange={handleProdChange}
                        placeholder={f.placeholder}
                        required={["nombre","marca","modelo"].includes(f.name)}
                      />
                    </div>
                  ))}
                  <div>
                    <label style={labelCls}>Categoría</label>
                    <select style={inputCls} name="categoria" value={formProd.categoria} onChange={handleProdChange}>
                      {CATEGORIAS.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={labelCls}>Descripción</label>
                    <textarea
                      style={{ ...inputCls, resize: "vertical" }}
                      name="descripcion"
                      value={formProd.descripcion}
                      onChange={handleProdChange}
                      rows={3}
                      placeholder="Descripción del producto"
                    />
                  </div>
                </div>

                {/* Precios + stock */}
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {[
                    { label: "Precio de venta (S/)", name: "precio" },
                    { label: "Costo (S/)",           name: "costo" },
                    { label: "Stock actual",          name: "stock" },
                    { label: "Stock mínimo",          name: "stockMinimo" },
                  ].map(f => (
                    <div key={f.name}>
                      <label style={labelCls}>{f.label}</label>
                      <input
                        style={inputCls}
                        name={f.name}
                        type="number"
                        min="0"
                        step={f.name.includes("precio") || f.name === "costo" ? "0.01" : "1"}
                        value={(formProd as Record<string, unknown>)[f.name] as string}
                        onChange={handleProdChange}
                        placeholder="0"
                      />
                    </div>
                  ))}
                  <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#475569", cursor: "pointer", textAlign: "left" }}>
                    <input type="checkbox" name="destacado" checked={formProd.destacado} onChange={handleProdChange} />
                    Marcar como destacado ★
                  </label>
                  <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                    <button type="submit" style={{ ...btnPrimary, flex: 1 }}>
                      {editandoId ? "Guardar cambios" : "Agregar producto"}
                    </button>
                    {editandoId && (
                      <button
                        type="button"
                        onClick={() => { setEditandoId(null); setFormProd(EMPTY_PROD); }}
                        style={{ padding: "9px 14px", background: "#f1f5f9", color: "#475569", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}
                      >
                        Cancelar
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </form>

            {/* Tabla productos */}
            <div style={card}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <span style={{ fontWeight: 700, fontSize: 14, color: "#0f172a", textAlign: "left" }}>Todos los productos ({productos.length})</span>
                <input
                  style={{ ...inputCls, width: 220 }}
                  placeholder="Buscar por nombre o código..."
                  value={busqProd}
                  onChange={e => setBusqProd(e.target.value)}
                />
              </div>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, minWidth: 800 }}>
                  <thead>
                    <tr style={{ background: "#f8fafc" }}>
                      {["", "Código", "Nombre", "Categoría", "Precio", "Costo", "Stock", "Estado", "Acciones"].map(h => (
                        <th key={h} style={{ padding: "9px 12px", textAlign: "left", fontWeight: 600, color: "#64748b", borderBottom: "1px solid #e2e8f0", whiteSpace: "nowrap" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {prodFiltrados.map(p => {
                      const est = p.stock === 0
                        ? { label: "Sin stock", bg: "#fee2e2", color: "#dc2626" }
                        : p.stock <= p.stockMinimo
                          ? { label: "Stock bajo", bg: "#fef9c3", color: "#ca8a04" }
                          : { label: "En stock", bg: "#dcfce7", color: "#16a34a" };
                      return (
                        <tr key={p.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                          <td style={{ padding: "8px 12px" }}>
                            {p.imagenPrincipal
                              ? <img src={p.imagenPrincipal} alt={p.nombre} style={{ width: 36, height: 36, borderRadius: 6, objectFit: "cover" }} />
                              : <div style={{ width: 36, height: 36, borderRadius: 6, background: "#e2e8f0" }} />
                            }
                          </td>
                          <td style={{ padding: "8px 12px", color: "#64748b", fontFamily: "monospace" }}>{p.codigo}</td>
                          <td style={{ padding: "8px 12px", fontWeight: 600 }}>
                            {p.nombre}{p.destacado && <span style={{ marginLeft: 5, color: "#f59e0b" }}>★</span>}
                          </td>
                          <td style={{ padding: "8px 12px", color: "#64748b" }}>{p.categoria}</td>
                          <td style={{ padding: "8px 12px" }}>S/ {p.precio.toFixed(2)}</td>
                          <td style={{ padding: "8px 12px", color: "#64748b" }}>S/ {p.costo.toFixed(2)}</td>
                          <td style={{ padding: "8px 12px" }}>{p.stock}</td>
                          <td style={{ padding: "8px 12px" }}>
                            <span style={{ background: est.bg, color: est.color, padding: "2px 8px", borderRadius: 20, fontSize: 11, fontWeight: 600 }}>{est.label}</span>
                          </td>
                          <td style={{ padding: "8px 12px" }}>
                            <div style={{ display: "flex", gap: 6 }}>
                              <button
                                onClick={() => handleEditar(p)}
                                style={{ padding: "5px 10px", background: "#eff6ff", color: "#2563eb", border: "none", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer" }}
                              >
                                Editar
                              </button>
                              <button onClick={() => setConfirmDel(p.id)} style={btnDanger}>Eliminar</button>
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
        )}

        {/* ════ USUARIOS ════ */}
        {section === "usuarios" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "#0f172a", textAlign: "left" }}>Usuarios registrados</h2>
            <div style={card}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: "#0f172a" }}>Total: {usuarios.length} usuarios</span>
                <input
                  style={{ ...inputCls, width: 240 }}
                  placeholder="Buscar por nombre o email..."
                  value={busqUser}
                  onChange={e => setBusqUser(e.target.value)}
                />
              </div>
              {usersFiltrados.length === 0 ? (
                <p style={{ color: "#94a3b8", textAlign: "center", padding: "30px 0", fontSize: 14 }}>No hay usuarios registrados.</p>
              ) : (
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                  <thead>
                    <tr style={{ background: "#f8fafc" }}>
                      {["Nombre", "Apellido", "Email", "Rol", "Acciones"].map(h => (
                        <th key={h} style={{ padding: "9px 12px", textAlign: "left", fontWeight: 600, color: "#64748b", borderBottom: "1px solid #e2e8f0" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {usersFiltrados.map(u => (
                      <tr key={u.email} style={{ borderBottom: "1px solid #f1f5f9" }}>
                        <td style={{ padding: "10px 12px", fontWeight: 600 }}>{u.nombre}</td>
                        <td style={{ padding: "10px 12px" }}>{u.apellido}</td>
                        <td style={{ padding: "10px 12px", color: "#2563eb" }}>{u.email}</td>
                        <td style={{ padding: "10px 12px" }}>
                          <span style={{ background: "#eff6ff", color: "#2563eb", padding: "2px 8px", borderRadius: 20, fontSize: 11, fontWeight: 600 }}>Usuario</span>
                        </td>
                        <td style={{ padding: "10px 12px" }}>
                          <button onClick={() => setConfirmDelUser(u.email)} style={btnDanger}>Eliminar</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* ════ CONFIGURACIÓN ════ */}
        {section === "configuracion" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "#0f172a", textAlign: "left" }}>Configuración</h2>
            <div style={{ ...card, maxWidth: 500 }}>
              <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 700, color: "#0f172a", textAlign: "left" }}>Nombre del negocio</h3>
              <label style={labelCls}>Nombre que verán los usuarios</label>
              <input
                style={{ ...inputCls, marginBottom: 12 }}
                value={storeName}
                onChange={e => setStoreName(e.target.value)}
                placeholder="Eagle Gaming"
              />
              <button
                style={btnPrimary}
                onClick={() => {
                  localStorage.setItem("eagle_store_name", storeName);
                  setStoreMsg("¡Guardado correctamente!");
                  setTimeout(() => setStoreMsg(""), 2500);
                }}
              >
                Guardar cambios
              </button>
              {storeMsg && <p style={{ color: "#16a34a", fontSize: 13, marginTop: 8 }}>{storeMsg}</p>}
            </div>

            <div style={{ ...card, maxWidth: 500 }}>
              <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 700, color: "#0f172a", textAlign: "left" }}>Credenciales de acceso admin</h3>
              <p style={{ fontSize: 13, color: "#64748b", margin: "0 0 8px", textAlign: "left" }}>
                Las credenciales de administrador se gestionan desde el archivo{" "}
                <code style={{ background: "#f1f5f9", padding: "2px 6px", borderRadius: 4 }}>.env</code> del proyecto.
              </p>
              <div style={{ background: "#f8fafc", borderRadius: 8, padding: "12px 14px", fontSize: 12, color: "#475569", fontFamily: "monospace", textAlign: "left" }}>
                VITE_ADMIN_EMAIL=eaglegamer147@gmail.com<br />
                VITE_ADMIN_PASSWORD=••••••••••••
              </div>
            </div>

            <div style={{ ...card, maxWidth: 500 }}>
              <h3 style={{ margin: "0 0 12px", fontSize: 15, fontWeight: 700, color: "#dc2626", textAlign: "left" }}>Zona de peligro</h3>
              <p style={{ fontSize: 13, color: "#64748b", margin: "0 0 12px", textAlign: "left" }}>Eliminar todos los usuarios registrados del sistema.</p>
              <button
                style={{ ...btnDanger, padding: "9px 18px" }}
                onClick={() => {
                  if (confirm("¿Eliminar TODOS los usuarios? Esta acción no se puede deshacer.")) {
                    localStorage.removeItem("eagle_users");
                    setUsuarios([]);
                  }
                }}
              >
                Eliminar todos los usuarios
              </button>
            </div>
          </div>
        )}
      </main>

      {/* ── Modal confirmar eliminar producto ─────────────────────── */}
      {confirmDel !== null && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "#fff", borderRadius: 12, padding: 24, width: 320, boxShadow: "0 10px 40px rgba(0,0,0,0.2)" }}>
            <p style={{ fontWeight: 700, fontSize: 15, color: "#0f172a", margin: "0 0 8px", textAlign: "left" }}>¿Eliminar producto?</p>
            <p style={{ fontSize: 13, color: "#64748b", margin: "0 0 20px", textAlign: "left" }}>Esta acción no se puede deshacer.</p>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={() => { eliminarProducto(confirmDel); setConfirmDel(null); }}
                style={{ flex: 1, padding: "9px", background: "#dc2626", color: "#fff", border: "none", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontSize: 13 }}
              >
                Eliminar
              </button>
              <button
                onClick={() => setConfirmDel(null)}
                style={{ flex: 1, padding: "9px", background: "#f1f5f9", color: "#475569", border: "none", borderRadius: 8, fontWeight: 600, cursor: "pointer", fontSize: 13 }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Modal confirmar eliminar usuario ──────────────────────── */}
      {confirmDelUser !== null && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "#fff", borderRadius: 12, padding: 24, width: 320, boxShadow: "0 10px 40px rgba(0,0,0,0.2)" }}>
            <p style={{ fontWeight: 700, fontSize: 15, color: "#0f172a", margin: "0 0 8px", textAlign: "left" }}>¿Eliminar usuario?</p>
            <p style={{ fontSize: 13, color: "#2563eb", margin: "0 0 4px", textAlign: "left" }}>{confirmDelUser}</p>
            <p style={{ fontSize: 13, color: "#64748b", margin: "0 0 20px", textAlign: "left" }}>Esta acción no se puede deshacer.</p>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={() => eliminarUsuario(confirmDelUser)}
                style={{ flex: 1, padding: "9px", background: "#dc2626", color: "#fff", border: "none", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontSize: 13 }}
              >
                Eliminar
              </button>
              <button
                onClick={() => setConfirmDelUser(null)}
                style={{ flex: 1, padding: "9px", background: "#f1f5f9", color: "#475569", border: "none", borderRadius: 8, fontWeight: 600, cursor: "pointer", fontSize: 13 }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;