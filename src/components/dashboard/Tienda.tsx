import { useState, useMemo } from "react";
import React from "react";
import type { Producto } from "../../types/producto";
import { useProductos } from "../../context/ProductosContext";
import { useAuth } from "../../context/AuthContext";
import { CATEGORIAS } from "../../data/productos";
import type { ItemCarrito } from "../../types/carrito";

const STORE_NAME = "Eagle Gamer PERU";
const STORE_SLOGAN = "Tecnología Gamer";

/* ── Iconos por categoría ── */
const CAT_SVG: Record<string, React.ReactElement> = {
  "Monitores": (
    <svg viewBox="0 0 64 64" width="56" height="56" fill="none" stroke="#c0392b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="8" width="52" height="36" rx="3"/>
      <line x1="20" y1="44" x2="16" y2="56"/><line x1="44" y1="44" x2="48" y2="56"/>
      <line x1="14" y1="56" x2="50" y2="56"/>
      <rect x="12" y="14" width="40" height="24" rx="1"/>
      <circle cx="32" cy="47" r="1.5" fill="#c0392b"/>
    </svg>
  ),
  "Case": (
    <svg viewBox="0 0 64 64" width="56" height="56" fill="none" stroke="#c0392b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="14" y="6" width="28" height="52" rx="3"/>
      <rect x="18" y="12" width="20" height="14" rx="1"/>
      <circle cx="28" cy="34" r="5"/>
      <circle cx="28" cy="34" r="2" fill="#c0392b"/>
      <line x1="18" y1="44" x2="38" y2="44"/>
      <line x1="18" y1="48" x2="30" y2="48"/>
      <rect x="42" y="20" width="8" height="4" rx="1"/>
      <rect x="42" y="28" width="8" height="4" rx="1"/>
    </svg>
  ),
  "PC Completa": (
    <svg viewBox="0 0 64 64" width="56" height="56" fill="none" stroke="#c0392b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="8" width="30" height="22" rx="2"/>
      <rect x="8" y="34" width="22" height="6" rx="1"/>
      <line x1="19" y1="30" x2="19" y2="34"/>
      <rect x="38" y="8" width="22" height="38" rx="2"/>
      <rect x="42" y="14" width="14" height="10" rx="1"/>
      <circle cx="49" cy="32" r="4"/>
      <circle cx="49" cy="32" r="1.5" fill="#c0392b"/>
      <line x1="42" y1="40" x2="56" y2="40"/>
      <rect x="6" y="42" width="28" height="8" rx="1"/>
      <line x1="10" y1="45" x2="10" y2="47"/><line x1="14" y1="45" x2="14" y2="47"/>
      <line x1="18" y1="45" x2="18" y2="47"/><line x1="22" y1="45" x2="22" y2="47"/>
    </svg>
  ),
  "Disco SSD": (
    <svg viewBox="0 0 64 64" width="56" height="56" fill="none" stroke="#c0392b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="8" y="18" width="48" height="28" rx="4"/>
      <rect x="14" y="24" width="20" height="16" rx="2"/>
      <text x="24" y="36" textAnchor="middle" fontSize="8" fill="#c0392b" stroke="none" fontWeight="bold">SSD</text>
      <circle cx="44" cy="32" r="6"/>
      <circle cx="44" cy="32" r="2.5" fill="#c0392b"/>
      <line x1="14" y1="28" x2="34" y2="28"/>
    </svg>
  ),
  "Estabilizador": (
    <svg viewBox="0 0 64 64" width="56" height="56" fill="none" stroke="#c0392b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="8" y="14" width="48" height="36" rx="3"/>
      <rect x="14" y="20" width="10" height="24" rx="1"/>
      <rect x="28" y="20" width="10" height="24" rx="1"/>
      <line x1="16" y1="24" x2="22" y2="24"/><line x1="16" y1="28" x2="22" y2="28"/>
      <line x1="16" y1="32" x2="22" y2="32"/>
      <circle cx="47" cy="28" r="4"/>
      <line x1="47" y1="34" x2="47" y2="44"/>
      <line x1="43" y1="44" x2="51" y2="44"/>
    </svg>
  ),
  "Fuente de Poder": (
    <svg viewBox="0 0 64 64" width="56" height="56" fill="none" stroke="#c0392b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="8" y="12" width="40" height="40" rx="3"/>
      <rect x="50" y="22" width="6" height="4" rx="1"/>
      <rect x="50" y="30" width="6" height="4" rx="1"/>
      <rect x="50" y="38" width="6" height="4" rx="1"/>
      <polyline points="26 22 20 32 28 32 22 42" strokeWidth="2.5"/>
      <circle cx="38" cy="22" r="3"/>
      <line x1="14" y1="44" x2="22" y2="44"/>
    </svg>
  ),
  "Memoria RAM": (
    <svg viewBox="0 0 64 64" width="56" height="56" fill="none" stroke="#c0392b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="20" width="52" height="20" rx="2"/>
      <line x1="14" y1="20" x2="14" y2="40"/><line x1="22" y1="20" x2="22" y2="40"/>
      <line x1="30" y1="20" x2="30" y2="40"/><line x1="38" y1="20" x2="38" y2="40"/>
      <line x1="46" y1="20" x2="46" y2="40"/>
      <rect x="10" y="24" width="6" height="8" rx="1" fill="rgba(192,57,43,0.2)"/>
      <rect x="18" y="24" width="6" height="8" rx="1" fill="rgba(192,57,43,0.2)"/>
      <rect x="26" y="24" width="6" height="8" rx="1" fill="rgba(192,57,43,0.2)"/>
      <rect x="34" y="24" width="6" height="8" rx="1" fill="rgba(192,57,43,0.2)"/>
      <rect x="42" y="24" width="6" height="8" rx="1" fill="rgba(192,57,43,0.2)"/>
      <line x1="14" y1="40" x2="14" y2="46"/><line x1="22" y1="40" x2="22" y2="46"/>
      <line x1="30" y1="40" x2="30" y2="46"/><line x1="38" y1="40" x2="38" y2="46"/>
      <line x1="46" y1="40" x2="46" y2="46"/>
    </svg>
  ),
  "Periféricos": (
    <svg viewBox="0 0 64 64" width="56" height="56" fill="none" stroke="#c0392b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="22" width="36" height="22" rx="3"/>
      <line x1="10" y1="28" x2="10" y2="34"/><line x1="16" y1="28" x2="16" y2="34"/>
      <line x1="22" y1="28" x2="22" y2="34"/><line x1="28" y1="28" x2="28" y2="34"/>
      <line x1="10" y1="36" x2="10" y2="38"/><line x1="16" y1="36" x2="16" y2="38"/>
      <line x1="22" y1="36" x2="22" y2="38"/><line x1="28" y1="36" x2="28" y2="38"/>
      <path d="M40 26h8a8 8 0 0 1 0 16h-8"/>
      <circle cx="52" cy="34" r="2" fill="#c0392b"/>
    </svg>
  ),
  "Placa Madre": (
    <svg viewBox="0 0 64 64" width="56" height="56" fill="none" stroke="#c0392b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="6" width="52" height="52" rx="2"/>
      <rect x="12" y="12" width="16" height="16" rx="1"/>
      <rect x="36" y="12" width="16" height="10" rx="1"/>
      <rect x="12" y="36" width="36" height="6" rx="1"/>
      <rect x="12" y="46" width="36" height="6" rx="1"/>
      <line x1="28" y1="20" x2="36" y2="20"/>
      <line x1="20" y1="28" x2="20" y2="36"/>
      <circle cx="44" cy="30" r="4"/>
      <circle cx="44" cy="30" r="1.5" fill="#c0392b"/>
    </svg>
  ),
  "Tarjetas de Video": (
    <svg viewBox="0 0 64 64" width="56" height="56" fill="none" stroke="#c0392b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="16" width="56" height="28" rx="3"/>
      <circle cx="20" cy="30" r="8"/>
      <circle cx="20" cy="30" r="4" fill="rgba(192,57,43,0.2)"/>
      <circle cx="40" cy="30" r="8"/>
      <circle cx="40" cy="30" r="4" fill="rgba(192,57,43,0.2)"/>
      <line x1="14" y1="44" x2="14" y2="52"/><line x1="20" y1="44" x2="20" y2="52"/>
      <line x1="26" y1="44" x2="26" y2="52"/><line x1="32" y1="44" x2="32" y2="52"/>
      <line x1="38" y1="44" x2="38" y2="52"/><line x1="44" y1="44" x2="44" y2="52"/>
      <rect x="52" y="20" width="4" height="6" rx="1"/>
    </svg>
  ),
  "default": (
    <svg viewBox="0 0 64 64" width="56" height="56" fill="none" stroke="#c0392b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="4"/>
      <circle cx="32" cy="28" r="8"/>
      <path d="M16 52c0-8.8 7.2-16 16-16s16 7.2 16 16"/>
    </svg>
  ),
};

const BADGES: { label: string; color: string; bg: string; check: (p: Producto) => boolean }[] = [
  { label: "🔥 Oferta",        color: "#fff", bg: "#c0392b", check: (p) => p.badge === "oferta" || p.precio < 200 },
  { label: "⭐ Destacado",     color: "#fff", bg: "#b7791f", check: (p) => p.destacado },
  { label: "⚡ Últimas uds.",  color: "#fff", bg: "#6b21a8", check: (p) => p.badge === "ultimas" || (p.stock > 0 && p.stock <= p.stockMinimo) },
  { label: "🆕 Nuevo",         color: "#fff", bg: "#065f46", check: (p) => p.badge === "nuevo" || p.id > Date.now() - 86400000 * 3 },
];

const StarRating = ({ rating = 4 }: { rating?: number }) => (
  <span style={{ fontSize: 11, color: "#f59e0b", letterSpacing: 1 }}>
    {"★".repeat(rating)}{"☆".repeat(5 - rating)}
    <span style={{ color: "#666", marginLeft: 4, fontSize: 10 }}>({Math.floor(Math.random() * 80) + 5})</span>
  </span>
);

const TiendaCard = ({ producto, onAgregar, onVerDetalle }: {
  producto: Producto;
  onAgregar: () => void;
  onVerDetalle: () => void;
}) => {
  const badge = BADGES.find(b => b.check(producto));
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="tienda-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Badge */}
      {badge && (
        <span className="tienda-badge" style={{ background: badge.bg, color: badge.color }}>
          {badge.label}
        </span>
      )}

      {/* Imagen */}
      <div className="tienda-card-img" onClick={onVerDetalle}>
        {producto.imagenPrincipal ? (
          <img src={producto.imagenPrincipal} alt={producto.nombre} />
        ) : (
          <div className="tienda-card-noimg">
            {CAT_SVG[producto.categoria] || CAT_SVG["default"]}
          </div>
        )}
        <div className={`tienda-card-overlay${hovered ? " visible" : ""}`}>
          <button className="tienda-overlay-btn" onClick={(e) => { e.stopPropagation(); onVerDetalle(); }}>
            Ver detalles
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="tienda-card-info">
        <span className="tienda-card-cat">{producto.categoria}</span>
        <p className="tienda-card-nombre">{producto.nombre}</p>
        <p className="tienda-card-marca">{producto.marca} · {producto.modelo}</p>
        <StarRating rating={producto.destacado ? 5 : 4} />
        <div className="tienda-card-bottom">
          <span className="tienda-card-precio">S/ {producto.precio.toFixed(2)}</span>
          <span className="tienda-card-stock">{producto.stock} disp.</span>
        </div>
        <button className="tienda-add-btn" onClick={onAgregar} disabled={producto.stock === 0}>
          {producto.stock === 0 ? "Sin stock" : "🛒 Agregar"}
        </button>
      </div>
    </div>
  );
};

const Tienda = ({ onLogout }: { onLogout?: () => void }) => {
  const { productos } = useProductos();
  const { user } = useAuth();
  const [busqueda, setBusqueda] = useState("");
  const [categoriaActiva, setCategoriaActiva] = useState("todas");
  const [carrito, setCarrito] = useState<ItemCarrito[]>([]);
  const [carritoAbierto, setCarritoAbierto] = useState(false);
  const [productoDetalle, setProductoDetalle] = useState<Producto | null>(null);
  const [imagenActual, setImagenActual] = useState(0);
  const [seccionDestacada, setSeccionDestacada] = useState<"todos" | "destacados" | "ofertas">("todos");

  const totalItems = carrito.reduce((a, i) => a + i.cantidad, 0);

  const agregarAlCarrito = (p: Producto) => {
    setCarrito(prev => {
      const existe = prev.find(i => i.producto.id === p.id);
      if (existe) return prev.map(i => i.producto.id === p.id ? { ...i, cantidad: i.cantidad + 1 } : i);
      return [...prev, { producto: p, cantidad: 1 }];
    });
  };

  const productosFiltrados = useMemo(() => {
    return productos.filter(p => {
      const matchBusqueda = p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        p.marca.toLowerCase().includes(busqueda.toLowerCase());
      const matchCat = categoriaActiva === "todas" || p.categoria === categoriaActiva;
      const matchSeccion =
        seccionDestacada === "todos" ? true :
        seccionDestacada === "destacados" ? p.destacado :
        p.precio < 200;
      return matchBusqueda && matchCat && matchSeccion && p.stock > 0;
    });
  }, [productos, busqueda, categoriaActiva, seccionDestacada]);

  const categorias = ["todas", ...CATEGORIAS];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", fontFamily: "inherit", background: "#f1f5f9" }}>
      <style>{`
        /* ── Banner ── */
        @keyframes bannerScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .tienda-banner-track {
          display: flex; gap: 60px; white-space: nowrap;
          animation: bannerScroll 18s linear infinite;
        }
        .tienda-banner-item {
          font-size: 12px; font-weight: 600; color: #fff;
          display: flex; align-items: center; gap: 6px;
        }

        /* ── Navbar ── */
        .tienda-nav-link {
          background: none; border: none; color: #475569;
          font-size: 13px; font-weight: 600; cursor: pointer;
          padding: 4px 10px; border-radius: 6px;
          transition: color 0.2s, background 0.2s;
        }
        .tienda-nav-link:hover, .tienda-nav-link.active {
          color: #c0392b; background: #fef2f2;
        }

        /* ── Categorías sidebar ── */
        .tienda-cat-btn {
          width: 100%; text-align: left; background: none;
          border: none; border-left: 3px solid transparent;
          color: #475569; font-size: 12.5px; font-weight: 500;
          padding: 7px 12px; cursor: pointer;
          transition: all 0.2s; border-radius: 0 6px 6px 0;
        }
        .tienda-cat-btn:hover { color: #c0392b; background: #fef2f2; border-left-color: #c0392b; }
        .tienda-cat-btn.active { color: #c0392b; background: #fef2f2; border-left-color: #e74c3c; font-weight: 700; }

        /* ── Cards ── */
        @keyframes rgb-border {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .tienda-card {
          background: #fff; border-radius: 12px;
          overflow: hidden; position: relative;
          border: 1px solid #e2e8f0;
          transition: transform 0.2s, box-shadow 0.2s;
          display: flex; flex-direction: column;
        }
        .tienda-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 32px rgba(192,57,43,0.15);
          border-color: #c0392b;
        }
        .tienda-badge {
          position: absolute; top: 8px; left: 8px;
          font-size: 10px; font-weight: 700;
          padding: 3px 8px; border-radius: 10px; z-index: 2;
        }
        .tienda-card-img {
          width: 100%; aspect-ratio: 1/1;
          background: #f8fafc; position: relative;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; overflow: hidden;
        }
        .tienda-card-img img {
          width: 100%; height: 100%; object-fit: contain; padding: 8px; box-sizing: border-box;
        }
        .tienda-card-noimg {
          display: flex; align-items: center; justify-content: center;
          width: 100%; height: 100%;
        }
        .tienda-card-overlay {
          position: absolute; inset: 0;
          background: rgba(0,0,0,0.55);
          display: flex; align-items: center; justify-content: center;
          opacity: 0; transition: opacity 0.2s;
        }
        .tienda-card-overlay.visible { opacity: 1; }
        .tienda-overlay-btn {
          background: rgba(192,57,43,0.9); color: #fff;
          border: none; border-radius: 20px;
          padding: 7px 18px; font-size: 12px; font-weight: 700;
          cursor: pointer;
        }
        .tienda-card-info {
          padding: 10px 12px 12px;
          display: flex; flex-direction: column; gap: 4px; flex: 1;
        }
        .tienda-card-cat {
          font-size: 10px; color: #e74c3c; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;
        }
        .tienda-card-nombre {
          margin: 0; font-size: 13px; font-weight: 700; color: #1e293b;
          line-height: 1.3; display: -webkit-box;
          -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
        }
        .tienda-card-marca { margin: 0; font-size: 11px; color: #94a3b8; }
        .tienda-card-bottom {
          display: flex; justify-content: space-between; align-items: center; margin-top: 4px;
        }
        .tienda-card-precio { font-size: 16px; font-weight: 800; color: #c0392b; }
        .tienda-card-stock { font-size: 10px; color: #94a3b8; }
        .tienda-add-btn {
          width: 100%; margin-top: 6px;
          padding: 7px; border-radius: 8px; border: none;
          background: linear-gradient(135deg, #c0392b, #e74c3c);
          color: #fff; font-size: 12px; font-weight: 700;
          cursor: pointer; transition: opacity 0.2s;
        }
        .tienda-add-btn:hover:not(:disabled) { opacity: 0.85; }
        .tienda-add-btn:disabled { background: #333; color: #666; cursor: not-allowed; }

        /* ── Secciones destacadas ── */
        .seccion-btn {
          padding: 6px 16px; border-radius: 20px; border: 1px solid #e2e8f0;
          background: transparent; color: #475569; font-size: 12px; font-weight: 600;
          cursor: pointer; transition: all 0.2s;
        }
        .seccion-btn:hover { border-color: #c0392b; color: #c0392b; }
        .seccion-btn.active { background: linear-gradient(135deg,#c0392b,#e74c3c); color: #fff; border-color: #c0392b; }

        /* ── Buscador ── */
        .tienda-search {
          flex: 1; padding: 8px 16px; border-radius: 20px;
          border: 1px solid #e2e8f0; background: #f8fafc;
          color: #1e293b; font-size: 13px; outline: none;
        }
        .tienda-search::placeholder { color: #94a3b8; }
        .tienda-search:focus { border-color: #c0392b; }

        /* ── Modal detalle ── */
        .tienda-modal-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.75);
          z-index: 200; display: flex; align-items: center; justify-content: center; padding: 20px;
        }
        .tienda-modal-box {
          background: #fff; border-radius: 14px; width: 100%; max-width: 860px;
          display: flex; flex-direction: column;
          box-shadow: 0 20px 60px rgba(0,0,0,0.2);
          border: 1px solid #e2e8f0;
          animation: modalIn 0.2s ease;
          max-height: 90vh; overflow: hidden;
        }
        @keyframes modalIn {
          from { transform: scale(0.95); opacity: 0; }
          to   { transform: scale(1); opacity: 1; }
        }
        .tienda-modal-header {
          padding: 14px 20px; border-bottom: 1px solid #e2e8f0;
          display: flex; justify-content: space-between; align-items: center;
          font-weight: 700; font-size: 0.95rem; color: #fff; flex-shrink: 0;
          background: linear-gradient(135deg, #c0392b, #e74c3c);
        }
        .tienda-modal-body {
          padding: 20px 24px; display: flex; gap: 28px; align-items: flex-start;
          overflow-y: auto; background: #fff;
        }
        .tienda-modal-left {
          width: 380px; min-width: 380px; display: flex; flex-direction: column; gap: 8px;
        }
        .tienda-modal-img-main {
          width: 100%; aspect-ratio: 1/1;
          background: #f8fafc; border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          position: relative; overflow: hidden; border: 1px solid #e2e8f0;
        }
        .tienda-modal-img-main img { width: 100%; height: 100%; object-fit: contain; }
        .tienda-modal-thumbs { display: flex; gap: 6px; }
        .tienda-modal-thumb {
          flex: 1; min-width: 0; aspect-ratio: 1/1;
          border-radius: 6px; overflow: hidden;
          border: 2px solid transparent; cursor: pointer;
          background: #f8fafc; transition: border-color 0.15s;
        }
        .tienda-modal-thumb.active { border-color: #c0392b; }
        .tienda-modal-thumb img { width: 100%; height: 100%; object-fit: cover; }
        .tienda-modal-info { flex: 1; display: flex; flex-direction: column; gap: 10px; min-width: 0; }
        .tienda-modal-nombre { font-size: 1.2rem; font-weight: 800; color: #0f172a; line-height: 1.3; }
        .tienda-modal-precio { font-size: 1.6rem; font-weight: 900; color: #c0392b; }
        .tienda-modal-specs {
          display: grid; grid-template-columns: 1fr 1fr; gap: 6px 12px;
          background: #f8fafc; border-radius: 8px; padding: 10px 12px;
          border: 1px solid #e2e8f0;
        }
        .tienda-modal-spec { font-size: 0.78rem; color: #64748b; }
        .tienda-modal-spec span { font-weight: 600; color: #1e293b; }
        .tienda-modal-footer {
          padding: 14px 20px; border-top: 1px solid #e2e8f0;
          display: flex; gap: 10px; flex-shrink: 0;
          background: #f8fafc;
        }
        .tienda-btn-agregar {
          flex: 1; padding: 12px;
          background: linear-gradient(135deg, #c0392b, #e74c3c);
          color: #fff; border: none; border-radius: 10px;
          font-size: 0.9rem; font-weight: 700; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          transition: opacity 0.2s;
        }
        .tienda-btn-agregar:hover { opacity: 0.85; }
        .tienda-btn-cerrar {
          padding: 12px 20px; background: #f1f5f9; color: #475569;
          border: 1px solid #e2e8f0; border-radius: 10px;
          font-size: 0.85rem; font-weight: 600; cursor: pointer;
          transition: background 0.2s;
        }
        .tienda-btn-cerrar:hover { background: #e2e8f0; }
        .carrusel-btn {
          position: absolute; top: 50%; transform: translateY(-50%);
          background: rgba(255,255,255,0.9); border: 1px solid #e2e8f0; border-radius: 50%;
          width: 32px; height: 32px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; z-index: 10; color: #1e293b;
        }
        .carrusel-btn-prev { left: 8px; }
        .carrusel-btn-next { right: 8px; }
      `}</style>

      {/* ── Banner informativo ── */}
      <div style={{ background: "linear-gradient(90deg, #c0392b, #e74c3c, #c0392b)", padding: "6px 0", overflow: "hidden" }}>
        <div className="tienda-banner-track">
          {[...Array(2)].map((_, rep) => (
            ["🚚 Envíos a todo el país", "🛡 Garantía 12 meses", "💬 Soporte técnico gratis", "⚡ Entrega rápida", "🔒 Compra segura"].map((item, i) => (
              <span key={`${rep}-${i}`} className="tienda-banner-item">{item}</span>
            ))
          ))}
        </div>
      </div>

      {/* ── Header / Navbar ── */}
      <div style={{ background: "#fff", padding: "10px 20px", display: "flex", alignItems: "center", gap: 16, borderBottom: "1px solid #e2e8f0", flexShrink: 0 }}>
        {/* Logo + nombre */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginRight: 8 }}>
          <img src="/eagle gamer logo.png" alt="logo" style={{ width: 42, height: 42, objectFit: "contain", filter: "drop-shadow(0 0 6px rgba(200,160,0,0.5))" }} />
          <div>
            <div style={{ fontSize: 15, fontWeight: 800, color: "#1e293b", lineHeight: 1.1 }}>{STORE_NAME}</div>
            <div style={{ fontSize: 10, color: "#c0392b", fontWeight: 600 }}>{STORE_SLOGAN}</div>
          </div>
        </div>

        {/* Buscador */}
        <input
          className="tienda-search"
          placeholder="🔍  Buscar productos, marcas..."
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
        />

        {/* Nav links */}
        <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
          {(["todos", "destacados", "ofertas"] as const).map(s => (
            <button key={s} className={`tienda-nav-link${seccionDestacada === s ? " active" : ""}`} onClick={() => setSeccionDestacada(s)}>
              {s === "todos" ? "Inicio" : s === "destacados" ? "⭐ Destacados" : "🔥 Ofertas"}
            </button>
          ))}
        </div>

        {/* Carrito */}
        <button
          onClick={() => setCarritoAbierto(true)}
          style={{ position: "relative", background: "linear-gradient(135deg,#c0392b,#e74c3c)", border: "none", color: "#fff", borderRadius: 20, padding: "7px 18px", fontSize: 13, cursor: "pointer", fontWeight: 700, flexShrink: 0, display: "flex", alignItems: "center", gap: 6 }}
        >
          🛒 Carrito
          {totalItems > 0 && (
            <span style={{ position: "absolute", top: -6, right: -6, background: "#fff", color: "#c0392b", borderRadius: "50%", width: 18, height: 18, fontSize: 10, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {totalItems}
            </span>
          )}
        </button>

        {/* Usuario + acciones */}
        <div style={{ flexShrink: 0, textAlign: "right", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
          <div style={{ fontSize: 12, color: "#1e293b", fontWeight: 700 }}>Hola, {user?.username || "Usuario"} 👋</div>
          <div style={{ display: "flex", gap: 6 }}>
            {onLogout && (
              <button onClick={onLogout} style={{ fontSize: 10, padding: "3px 10px", borderRadius: 10, border: "1px solid #e2e8f0", background: "transparent", color: "#475569", cursor: "pointer" }}>
                Salir
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Cuerpo: sidebar categorías + grid + carrito ── */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>

        {/* Sidebar categorías */}
        <aside style={{ width: 160, background: "#fff", borderRight: "1px solid #e2e8f0", padding: "16px 0", flexShrink: 0, overflowY: "auto" }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#c0392b", padding: "0 12px 8px", textTransform: "uppercase", letterSpacing: 1 }}>Categorías</div>
          {categorias.map(c => (
            <button
              key={c}
              className={`tienda-cat-btn${categoriaActiva === c ? " active" : ""}`}
              onClick={() => setCategoriaActiva(c)}
            >
              {c === "todas" ? "📦 Todos" : c}
            </button>
          ))}
        </aside>

        {/* Grid */}
        <div style={{ flex: 1, overflowY: "auto", padding: "16px", background: "#f1f5f9" }}>
          {/* Sección header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <div style={{ display: "flex", gap: 8 }}>
              {(["todos", "destacados", "ofertas"] as const).map(s => (
                <button key={s} className={`seccion-btn${seccionDestacada === s ? " active" : ""}`} onClick={() => setSeccionDestacada(s)}>
                  {s === "todos" ? "Todos" : s === "destacados" ? "⭐ Destacados" : "🔥 Ofertas"}
                </button>
              ))}
            </div>
            <span style={{ fontSize: 12, color: "#94a3b8" }}>{productosFiltrados.length} productos</span>
          </div>

          {productosFiltrados.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 0", color: "#555" }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
              <div style={{ fontSize: 14 }}>No se encontraron productos</div>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 14 }}>
              {productosFiltrados.map(p => (
                <TiendaCard
                  key={p.id}
                  producto={p}
                  onAgregar={() => agregarAlCarrito(p)}
                  onVerDetalle={() => { setProductoDetalle(p); setImagenActual(0); }}
                />
              ))}
            </div>
          )}
        </div>

        {/* ── Panel Carrito lateral ── */}
        {carritoAbierto && (
          <aside style={{
            width: 300, flexShrink: 0,
            background: "#f1f5f9",
            borderLeft: "1px solid #cbd5e1",
            display: "flex", flexDirection: "column",
            boxShadow: "-4px 0 20px rgba(0,0,0,0.15)"
          }}>
            {/* Header carrito */}
            <div style={{ padding: "14px 16px", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#fff" }}>
              <span style={{ fontWeight: 800, fontSize: 15, color: "#1e293b" }}>🛒 Carrito ({totalItems})</span>
              <button onClick={() => setCarritoAbierto(false)} style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer", color: "#94a3b8" }}>✕</button>
            </div>

            {/* Items */}
            <div style={{ flex: 1, overflowY: "auto", padding: "10px 12px", display: "flex", flexDirection: "column", gap: 8 }}>
              {carrito.length === 0 ? (
                <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, color: "#94a3b8", padding: "40px 0", textAlign: "center" }}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round">
                    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                  </svg>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#64748b" }}>Tu carrito está vacío</span>
                  <span style={{ fontSize: 11, color: "#94a3b8" }}>Agrega productos para comenzar</span>
                </div>
              ) : carrito.map(item => (
                <div key={item.producto.id} style={{ background: "#fff", borderRadius: 10, padding: "10px 12px", display: "flex", alignItems: "center", gap: 10, border: "1px solid #e2e8f0", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
                  {/* Imagen */}
                  <div style={{ width: 48, height: 48, minWidth: 48, borderRadius: 8, overflow: "hidden", background: "#f8fafc", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {item.producto.imagenPrincipal
                      ? <img src={item.producto.imagenPrincipal} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                      : <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                    }
                  </div>
                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#1e293b", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.producto.nombre}</div>
                    <div style={{ fontSize: 11, color: "#94a3b8" }}>{item.producto.categoria}</div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#2563eb", marginTop: 2 }}>S/ {(item.producto.precio * item.cantidad).toFixed(2)}</div>
                  </div>
                  {/* Cantidad */}
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <button onClick={() => setCarrito(prev => prev.map(i => i.producto.id === item.producto.id ? { ...i, cantidad: Math.max(1, i.cantidad - 1) } : i))}
                      style={{ width: 22, height: 22, border: "1px solid #e2e8f0", borderRadius: 4, background: "#f8fafc", cursor: "pointer", fontWeight: 700, fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", color: "#475569" }}>−</button>
                    <span style={{ minWidth: 20, textAlign: "center", fontSize: 12, fontWeight: 700, color: "#1e293b" }}>{item.cantidad}</span>
                    <button onClick={() => setCarrito(prev => prev.map(i => i.producto.id === item.producto.id ? { ...i, cantidad: i.cantidad + 1 } : i))}
                      style={{ width: 22, height: 22, border: "1px solid #e2e8f0", borderRadius: 4, background: "#f8fafc", cursor: "pointer", fontWeight: 700, fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", color: "#475569" }}>+</button>
                  </div>
                  {/* Eliminar */}
                  <button onClick={() => setCarrito(prev => prev.filter(i => i.producto.id !== item.producto.id))}
                    style={{ background: "none", border: "none", cursor: "pointer", color: "#ef4444", padding: 4 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
                  </button>
                </div>
              ))}
            </div>

            {/* Footer */}
            {carrito.length > 0 && (
              <div style={{ padding: "14px 16px", borderTop: "1px solid #e2e8f0", background: "#fff" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, fontSize: 14, fontWeight: 800, color: "#1e293b" }}>
                  <span>Total</span>
                  <span style={{ color: "#2563eb" }}>S/ {carrito.reduce((a, i) => a + i.producto.precio * i.cantidad, 0).toFixed(2)}</span>
                </div>
                <button style={{ width: "100%", padding: "11px", background: "linear-gradient(135deg,#c0392b,#e74c3c)", color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
                  Proceder al pago
                </button>
              </div>
            )}
          </aside>
        )}
      </div>

      {/* ── Modal detalle ── */}
      {productoDetalle && (() => {
        const imagenes = [productoDetalle.imagenPrincipal, ...(productoDetalle.imagenesSecundarias || [])].filter(Boolean) as string[];
        const total = imagenes.length;
        return (
          <div className="tienda-modal-overlay" onClick={() => { setProductoDetalle(null); setImagenActual(0); }}>
            <div className="tienda-modal-box" onClick={e => e.stopPropagation()}>
              <div className="tienda-modal-header">
                <span>Detalles del Producto</span>
                <button onClick={() => { setProductoDetalle(null); setImagenActual(0); }} style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer", color: "#888" }}>✕</button>
              </div>
              <div className="tienda-modal-body">
                {/* Imágenes */}
                <div className="tienda-modal-left">
                  <div className="tienda-modal-img-main">
                    {imagenes[imagenActual] ? (
                      <img src={imagenes[imagenActual]} alt={productoDetalle.nombre} />
                    ) : (
                      <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="#333" strokeWidth="1.2">
                        <rect x="3" y="3" width="18" height="18" rx="2"/>
                        <circle cx="8.5" cy="8.5" r="1.5"/>
                        <polyline points="21 15 16 10 5 21"/>
                      </svg>
                    )}
                    {total > 1 && (
                      <>
                        <button className="carrusel-btn carrusel-btn-prev" onClick={() => setImagenActual(i => (i - 1 + total) % total)}>‹</button>
                        <button className="carrusel-btn carrusel-btn-next" onClick={() => setImagenActual(i => (i + 1) % total)}>›</button>
                      </>
                    )}
                  </div>
                  {total > 1 && (
                    <div className="tienda-modal-thumbs">
                      {imagenes.map((img, i) => (
                        <div key={i} className={`tienda-modal-thumb${imagenActual === i ? " active" : ""}`} onClick={() => setImagenActual(i)}>
                          <img src={img} alt="" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="tienda-modal-info">
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: "#e74c3c", textTransform: "uppercase" }}>{productoDetalle.marca}</span>
                    <span style={{ fontSize: 11, color: "#94a3b8" }}>·</span>
                    <span style={{ fontSize: 11, color: "#64748b" }}>{productoDetalle.categoria}</span>
                    <span style={{ background: productoDetalle.stock > 0 ? "#dcfce7" : "#fee2e2", color: productoDetalle.stock > 0 ? "#16a34a" : "#dc2626", fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 10 }}>
                      {productoDetalle.stock > 0 ? `✓ ${productoDetalle.stock} en stock` : "Sin stock"}
                    </span>
                  </div>
                  <div className="tienda-modal-nombre">{productoDetalle.nombre}</div>
                  <div style={{ fontSize: 11, color: "#94a3b8" }}>{productoDetalle.modelo}</div>
                  <StarRating rating={productoDetalle.destacado ? 5 : 4} />
                  <div className="tienda-modal-precio">S/ {productoDetalle.precio.toFixed(2)}</div>

                  {productoDetalle.descripcion && (
                    <ul style={{ margin: "0 0 4px", paddingLeft: 18, display: "flex", flexDirection: "column", gap: 6, textAlign: "left" }}>
                      {productoDetalle.descripcion
                        .split(/(?=✅)|\.(?=\s)/)
                        .map(s => s.replace(/✅/g, "").trim().replace(/\.$/, ""))
                        .filter(Boolean)
                        .map((item, i) => (
                          <li key={i} style={{ fontSize: "0.82rem", color: "#475569", lineHeight: 1.5 }}>{item}.</li>
                        ))}
                    </ul>
                  )}

                  {Object.keys(productoDetalle.especificaciones).length > 0 && (
                    <div className="tienda-modal-specs">
                      {Object.entries(productoDetalle.especificaciones).map(([k, v]) => (
                        <div key={k} className="tienda-modal-spec">{k}: <span>{String(v)}</span></div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="tienda-modal-footer">
                <button className="tienda-btn-agregar" onClick={() => { agregarAlCarrito(productoDetalle); setProductoDetalle(null); setImagenActual(0); }} disabled={productoDetalle.stock === 0}>
                  🛒 Agregar al Carrito
                </button>
                <button className="tienda-btn-cerrar" onClick={() => { setProductoDetalle(null); setImagenActual(0); }}>Cerrar</button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};

export default Tienda;
