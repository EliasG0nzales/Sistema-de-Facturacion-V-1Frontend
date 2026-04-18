import { useState } from "react";
import type { ReactElement } from "react";
import type { Producto } from "../../types/producto";
import type { ItemCarrito } from "../../types/carrito";
import { CATEGORIAS, productosEjemplo } from "../../data/productos";
import Carrito from "./Carrito";



const CAT_ICONS: Record<string, ReactElement> = {
  "todas": (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#e05a7a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
      <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
    </svg>
  ),
  "Monitores": (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#e05a7a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
    </svg>
  ),
  "Case": (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#e05a7a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2"/><line x1="9" y1="7" x2="15" y2="7"/><line x1="9" y1="11" x2="15" y2="11"/>
      <circle cx="12" cy="16" r="1.5"/>
    </svg>
  ),
  "PC Completa": (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#e05a7a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="14" height="10" rx="1"/><rect x="5" y="17" width="8" height="4" rx="1"/>
      <rect x="16" y="3" width="6" height="18" rx="1"/><line x1="9" y1="13" x2="9" y2="17"/>
    </svg>
  ),
  "Disco SSD": (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#e05a7a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="17" cy="12" r="2"/>
      <line x1="5" y1="10" x2="11" y2="10"/><line x1="5" y1="14" x2="11" y2="14"/>
    </svg>
  ),
  "Estabilizador": (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#e05a7a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2"/>
      <line x1="7" y1="9" x2="7" y2="15"/><line x1="12" y1="7" x2="12" y2="17"/><line x1="17" y1="9" x2="17" y2="15"/>
    </svg>
  ),
  "Fuente de Poder": (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#e05a7a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="16" rx="2"/>
      <polyline points="13 8 9 13 13 13 11 18"/><circle cx="17" cy="9" r="1"/>
    </svg>
  ),
  "Memoria RAM": (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#e05a7a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="8" width="20" height="8" rx="1"/>
      <line x1="6" y1="8" x2="6" y2="16"/><line x1="10" y1="8" x2="10" y2="16"/>
      <line x1="14" y1="8" x2="14" y2="16"/><line x1="18" y1="8" x2="18" y2="16"/>
      <line x1="6" y1="16" x2="6" y2="19"/><line x1="10" y1="16" x2="10" y2="19"/>
      <line x1="14" y1="16" x2="14" y2="19"/><line x1="18" y1="16" x2="18" y2="19"/>
    </svg>
  ),
  "Periféricos": (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#e05a7a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="8" width="14" height="9" rx="2"/>
      <line x1="5" y1="11" x2="5" y2="14"/><line x1="8" y1="11" x2="8" y2="14"/><line x1="11" y1="11" x2="11" y2="14"/>
      <path d="M16 10h3a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-3"/>
    </svg>
  ),
  "Placa Madre": (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#e05a7a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="2"/>
      <rect x="6" y="6" width="5" height="5" rx="1"/><rect x="13" y="6" width="5" height="5" rx="1"/>
      <line x1="6" y1="15" x2="18" y2="15"/><line x1="6" y1="18" x2="18" y2="18"/>
    </svg>
  ),
  "Tarjetas de Video": (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#e05a7a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="6" width="22" height="12" rx="2"/>
      <circle cx="8" cy="12" r="2.5"/><circle cx="16" cy="12" r="2.5"/>
      <line x1="6" y1="18" x2="6" y2="21"/><line x1="10" y1="18" x2="10" y2="21"/>
      <line x1="14" y1="18" x2="14" y2="21"/><line x1="18" y1="18" x2="18" y2="21"/>
    </svg>
  ),
};

const Vender = () => {
  const [busqueda, setBusqueda] = useState("");
  const [categoriaFiltro, setCategoriaFiltro] = useState("todas");
  const [dropdownAbierto, setDropdownAbierto] = useState(false);
  const [carrito, setCarrito] = useState<ItemCarrito[]>([]);
  const [carritoAbierto, setCarritoAbierto] = useState(false);
  const [productoDetalle, setProductoDetalle] = useState<Producto | null>(null);

  const totalItems = carrito.reduce((acc, i) => acc + i.cantidad, 0);

  const productosFiltrados = productosEjemplo.filter((p) => {
    const matchNombre = p.nombre.toLowerCase().includes(busqueda.toLowerCase());
    const matchCat = categoriaFiltro === "todas" || p.categoria === categoriaFiltro;
    return matchNombre && matchCat && p.stock > 0;
  });

  const agregarAlCarrito = (producto: Producto) => {
    setCarrito((prev) => {
      const existe = prev.find((i) => i.producto.id === producto.id);
      if (existe) {
        return prev.map((i) =>
          i.producto.id === producto.id ? { ...i, cantidad: i.cantidad + 1 } : i
        );
      }
      return [...prev, { producto, cantidad: 1 }];
    });
  };

  const quitarDelCarrito = (id: number) => {
    setCarrito((prev) => prev.filter((i) => i.producto.id !== id));
  };

  const categorias = ["todas", ...CATEGORIAS];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", fontFamily: "inherit" }}>
      <style>{`
        /* ── Flip card ── */
        .vender-card {
          overflow: visible;
          width: 100%;
          aspect-ratio: 1 / 1;
          perspective: 1000px;
          position: relative;
          cursor: pointer;
        }
        .vender-card-inner {
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform 300ms;
          box-shadow: 0px 0px 10px 1px #000000aa;
          border-radius: 10px;
          position: relative;
        }
        .vender-card:hover .vender-card-inner {
          transform: rotateY(180deg);
        }
        .vender-card-front, .vender-card-back {
          background-color: #151515;
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          border-radius: 10px;
          overflow: hidden;
        }
        /* DORSO (visible al hover) */
        .vender-card-back {
          justify-content: center;
          display: flex;
          align-items: center;
        }
        .vender-card-back::before {
          position: absolute;
          content: ' ';
          display: block;
          width: 160px;
          height: 160%;
          background: linear-gradient(90deg, transparent, #ff9966, #ff9966, #ff9966, transparent);
          animation: rotation_481 5000ms infinite linear;
        }
        @keyframes rotation_481 {
          0%   { transform: rotateZ(0deg); }
          100% { transform: rotateZ(360deg); }
        }
        .vender-card-back-content {
          position: absolute;
          width: 99%;
          height: 99%;
          background-color: #151515;
          border-radius: 10px;
          color: white;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 10px;
          padding: 10px;
          text-align: center;
        }
        .vender-card-back-content strong {
          font-size: 0.72rem;
        }
        .vender-card-back-precio {
          font-size: 0.78rem;
          color: #60a5fa;
          font-weight: 700;
        }
        .vender-card-back-stock {
          font-size: 0.62rem;
          color: #94a3b8;
        }
        /* FRENTE (rotado, visible por defecto) */
        .vender-card-front {
          transform: rotateY(180deg);
          color: white;
        }
        .vender-card-front-content {
          position: absolute;
          width: 100%;
          height: 100%;
          padding: 8px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .vender-card-badge {
          background-color: #00000055;
          padding: 2px 8px;
          border-radius: 10px;
          backdrop-filter: blur(2px);
          width: fit-content;
          font-size: 10px;
          color: white;
        }
        .vender-card-desc {
          box-shadow: 0px 0px 10px 5px #00000088;
          width: 100%;
          padding: 8px;
          background-color: #00000099;
          backdrop-filter: blur(5px);
          border-radius: 5px;
        }
        .vender-card-title-row {
          font-size: 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: white;
          font-weight: 700;
        }
        .vender-card-footer-text {
          color: #ffffff88;
          margin-top: 4px;
          font-size: 9px;
        }
        .vender-card-img-bg {
          position: absolute;
          width: 100%;
          height: 100%;
        }
        .circle {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background-color: #ffbb66;
          position: relative;
          filter: blur(12px);
          animation: floating 2600ms infinite linear;
        }
        .circle-bottom {
          background-color: #ff8866;
          left: 40px;
          top: 0px;
          width: 110px;
          height: 110px;
          animation-delay: -800ms;
        }
        .circle-right {
          background-color: #ff2233;
          left: 120px;
          top: -60px;
          width: 24px;
          height: 24px;
          animation-delay: -1800ms;
        }
        @keyframes floating {
          0%   { transform: translateY(0px); }
          50%  { transform: translateY(8px); }
          100% { transform: translateY(0px); }
        }
        /* Lupa */
        .vender-card-lupa {
          position: absolute;
          top: 6px;
          right: 6px;
          background: rgba(255,255,255,0.9);
          border: none;
          border-radius: 8px;
          width: 26px;
          height: 26px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 13px;
          transition: background 0.2s, transform 0.15s;
          z-index: 10;
        }
        .vender-card-lupa:hover {
          background: #fff;
          transform: scale(1.12);
        }
        /* Carrito panel */
        .carrito-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.4);
          z-index: 100;
          display: flex;
          justify-content: flex-end;
        }
        .carrito-panel {
          width: 320px;
          height: 100%;
          background: #fff;
          display: flex;
          flex-direction: column;
          box-shadow: -4px 0 24px rgba(0,0,0,0.2);
          animation: slideIn 0.25s ease;
        }
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to   { transform: translateX(0); }
        }
        .carrito-header {
          padding: 16px 20px;
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .carrito-vacio {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          color: #64748b;
          padding: 24px;
          text-align: center;
        }
        .carrito-items {
          flex: 1;
          overflow-y: auto;
          padding: 12px 16px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .carrito-item {
          display: flex;
          align-items: center;
          padding: 10px 12px;
          background: #f8fafc;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
        }
        .carrito-footer {
          padding: 16px 20px;
          border-top: 1px solid #e2e8f0;
        }
        .btn-cobrar {
          width: 100%;
          padding: 12px;
          background: linear-gradient(135deg, #2563eb, #1e40af);
          color: #fff;
          border: none;
          border-radius: 10px;
          font-size: 0.9rem;
          font-weight: 700;
          cursor: pointer;
          transition: opacity 0.2s;
        }
        .btn-cobrar:hover { opacity: 0.9; }
        /* Modal detalle */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.5);
          z-index: 200;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .modal-box {
          background: #fff;
          border-radius: 14px;
          width: 100%;
          max-width: 560px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
          animation: modalIn 0.2s ease;
        }
        @keyframes modalIn {
          from { transform: scale(0.95); opacity: 0; }
          to   { transform: scale(1); opacity: 1; }
        }
        .modal-header {
          padding: 16px 20px;
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-weight: 600;
          font-size: 0.95rem;
          color: #1e293b;
        }
        .modal-body {
          padding: 20px;
          display: flex;
          gap: 20px;
        }
        .modal-img {
          width: 180px;
          min-width: 180px;
          aspect-ratio: 1/1;
          background: linear-gradient(135deg, #1e1e3a, #2d2d5e);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 3rem;
        }
        .modal-info { flex: 1; }
        .modal-nombre { font-size: 1rem; font-weight: 700; color: #1e293b; margin-bottom: 8px; }
        .modal-precio-box {
          background: #eff6ff;
          border-radius: 8px;
          padding: 10px 14px;
          margin-bottom: 12px;
          font-size: 0.85rem;
          color: #1e293b;
        }
        .modal-precio-box span { color: #2563eb; font-weight: 700; }
        .modal-desc { font-size: 0.82rem; color: #475569; line-height: 1.55; margin-bottom: 12px; }
        .modal-footer {
          padding: 16px 20px;
          border-top: 1px solid #e2e8f0;
          display: flex;
          gap: 10px;
        }
        .btn-agregar {
          flex: 1;
          padding: 11px;
          background: linear-gradient(135deg, #2563eb, #1e40af);
          color: #fff;
          border: none;
          border-radius: 10px;
          font-size: 0.85rem;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: opacity 0.2s;
        }
        .btn-agregar:hover { opacity: 0.9; }
        .btn-cerrar-modal {
          padding: 11px 20px;
          background: #f1f5f9;
          color: #475569;
          border: none;
          border-radius: 10px;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }
        .btn-cerrar-modal:hover { background: #e2e8f0; }
      `}</style>

      {/* Header */}
      <div style={{ background: "#888", padding: "10px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ margin: 0, fontSize: 18, fontWeight: 600, color: "#fff" }}>Vender</h2>
        <button style={{ padding: "6px 16px", borderRadius: 20, border: "1px solid #bbb", background: "#aaa", color: "#fff", fontSize: 13, cursor: "pointer" }}>
          Historial de ventas
        </button>
      </div>

      {/* Buscador */}
      <div style={{ background: "#d0d0d0", padding: "10px 20px", display: "flex", gap: 10, alignItems: "center" }}>
        <input
          type="text"
          placeholder="Buscar producto..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={{ flex: 1, padding: "7px 14px", borderRadius: 20, border: "1px solid #bbb", fontSize: 13, outline: "none" }}
        />
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setDropdownAbierto((v) => !v)}
            style={{
              padding: "7px 14px", borderRadius: 20, border: "1px solid #bbb",
              fontSize: 13, outline: "none", cursor: "pointer",
              background: "#fff", color: "#333", display: "flex", alignItems: "center", gap: 8, minWidth: 140,
              justifyContent: "space-between",
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
              {CAT_ICONS[categoriaFiltro]}
              {categoriaFiltro === "todas" ? "Categorías" : categoriaFiltro}
            </span>
            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="#666" strokeWidth="2.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>
          </button>
          {dropdownAbierto && (
            <div style={{
              position: "absolute", top: "calc(100% + 6px)", right: 0,
              background: "#fff", border: "1px solid #e2e8f0", borderRadius: 10,
              boxShadow: "0 8px 24px rgba(0,0,0,0.12)", zIndex: 50,
              minWidth: 200, overflow: "hidden",
            }}>
              {categorias.map((c) => (
                <button
                  key={c}
                  onClick={() => { setCategoriaFiltro(c); setDropdownAbierto(false); }}
                  style={{
                    width: "100%", display: "flex", alignItems: "center", gap: 10,
                    padding: "9px 14px", background: categoriaFiltro === c ? "#fff0f4" : "transparent",
                    border: "none", borderBottom: "1px solid #f1f5f9",
                    cursor: "pointer", fontSize: 13, color: "#1e293b", textAlign: "left",
                  }}
                >
                  {CAT_ICONS[c]}
                  <span style={{ fontWeight: categoriaFiltro === c ? 700 : 400 }}>
                    {c === "todas" ? "Todos los Productos" : c}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
        <button
          onClick={() => setCarritoAbierto(true)}
          style={{
            position: "relative", background: "#666", border: "1px solid #bbb",
            color: "#fff", borderRadius: 20, padding: "7px 18px",
            fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, whiteSpace: "nowrap",
          }}
        >
          Carrito
          {totalItems > 0 && (
            <span style={{
              position: "absolute", top: -6, right: -6,
              background: "#ef4444", color: "#fff",
              borderRadius: "50%", width: 18, height: 18,
              fontSize: 10, fontWeight: 700,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              {totalItems}
            </span>
          )}
        </button>
      </div>

      {/* Grid */}
      <div style={{ flex: 1, overflowY: "auto", padding: "14px 20px", background: "#e8e8e8" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {productosFiltrados.map((p) => (
            <div
              key={p.id}
              className="vender-card"
              onClick={() => agregarAlCarrito(p)}
              title="Click para agregar al carrito"
            >
              <div className="vender-card-inner">
                {/* FRENTE */}
                <div className="vender-card-front">
                  <div className="vender-card-img-bg">
                    <div className="circle" />
                    <div className="circle circle-bottom" />
                    <div className="circle circle-right" />
                  </div>
                  <div className="vender-card-front-content">
                    <span className="vender-card-badge">{p.categoria}</span>
                    <div className="vender-card-desc">
                      <div className="vender-card-title-row">
                        <span>{p.nombre}</span>
                      </div>
                      <p className="vender-card-footer-text">
                        Stock: {p.stock} &nbsp;|&nbsp; S/ {p.precio.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
                {/* DORSO */}
                <div className="vender-card-back">
                  <div className="vender-card-back-content">
                    <svg stroke="#ffffff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" height="40px" width="40px" fill="#ffffff">
                      <path d="M20.84375 0.03125C20.191406 0.0703125 19.652344 0.425781 19.21875 1.53125C18.988281 2.117188 18.5 3.558594 18.03125 4.9375C17.792969 5.636719 17.570313 6.273438 17.40625 6.75C17.390625 6.796875 17.414063 6.855469 17.40625 6.90625C17.398438 6.925781 17.351563 6.949219 17.34375 6.96875L17.25 7.25C18.566406 7.65625 19.539063 8.058594 19.625 8.09375C22.597656 9.21875 28.351563 11.847656 33.28125 16.78125C38.5 22 41.183594 28.265625 42.09375 30.71875C42.113281 30.761719 42.375 31.535156 42.75 32.84375C42.757813 32.839844 42.777344 32.847656 42.78125 32.84375C43.34375 32.664063 44.953125 32.09375 46.3125 31.625C47.109375 31.351563 47.808594 31.117188 48.15625 31C49.003906 30.714844 49.542969 30.292969 49.8125 29.6875C50.074219 29.109375 50.066406 28.429688 49.75 27.6875C49.605469 27.347656 49.441406 26.917969 49.25 26.4375C47.878906 23.007813 45.007813 15.882813 39.59375 10.46875C33.613281 4.484375 25.792969 1.210938 22.125 0.21875C21.648438 0.0898438 21.234375 0.0078125 20.84375 0.03125 Z M 16.46875 9.09375L0.0625 48.625C-0.09375 48.996094 -0.00390625 49.433594 0.28125 49.71875C0.472656 49.910156 0.738281 50 1 50C1.128906 50 1.253906 49.988281 1.375 49.9375L40.90625 33.59375C40.523438 32.242188 40.222656 31.449219 40.21875 31.4375C39.351563 29.089844 36.816406 23.128906 31.875 18.1875C27.035156 13.34375 21.167969 10.804688 18.875 9.9375C18.84375 9.925781 17.8125 9.5 16.46875 9.09375 Z M 17 16C19.761719 16 22 18.238281 22 21C22 23.761719 19.761719 26 17 26C15.140625 26 13.550781 24.972656 12.6875 23.46875L15.6875 16.1875C16.101563 16.074219 16.550781 16 17 16 Z M 31 22C32.65625 22 34 23.34375 34 25C34 25.917969 33.585938 26.730469 32.9375 27.28125L32.90625 27.28125C33.570313 27.996094 34 28.949219 34 30C34 32.210938 32.210938 34 30 34C27.789063 34 26 32.210938 26 30C26 28.359375 26.996094 26.960938 28.40625 26.34375L28.3125 26.3125C28.117188 25.917969 28 25.472656 28 25C28 23.34375 29.34375 22 31 22 Z M 21 32C23.210938 32 25 33.789063 25 36C25 36.855469 24.710938 37.660156 24.25 38.3125L20.3125 39.9375C18.429688 39.609375 17 37.976563 17 36C17 33.789063 18.789063 32 21 32 Z M 9 34C10.65625 34 12 35.34375 12 37C12 38.65625 10.65625 40 9 40C7.902344 40 6.960938 39.414063 6.4375 38.53125L8.25 34.09375C8.488281 34.03125 8.742188 34 9 34Z" />
                    </svg>
                    <strong>{p.nombre}</strong>
                    <span className="vender-card-back-precio">S/ {p.precio.toFixed(2)}</span>
                    <span className="vender-card-back-stock">{p.stock} disponibles</span>
                  </div>
                </div>
              </div>
              {/* Lupa fuera del flip para que siempre sea clickeable */}
              <button
                className="vender-card-lupa"
                onClick={(e) => { e.stopPropagation(); setProductoDetalle(p); }}
                title="Ver detalles"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="7" />
                  <line x1="16.5" y1="16.5" x2="22" y2="22" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                  <line x1="11" y1="8" x2="11" y2="14" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Panel carrito */}
      {carritoAbierto && (
        <Carrito
          items={carrito}
          onCerrar={() => setCarritoAbierto(false)}
          onCambiarCantidad={(id, cantidad) =>
            setCarrito((prev) => prev.map((i) =>
              i.producto.id === id ? { ...i, cantidad } : i
            ))
          }
          onEliminar={quitarDelCarrito}
        />
      )}

      {/* Modal detalle */}
      {productoDetalle && (
        <div className="modal-overlay" onClick={() => setProductoDetalle(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              Detalles del Producto
              <button onClick={() => setProductoDetalle(null)} style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer", color: "#64748b" }}>✕</button>
            </div>
            <div className="modal-body">
              <div className="modal-img">🍕</div>
              <div className="modal-info">
                <div className="modal-nombre">{productoDetalle.nombre}</div>
                <div className="modal-precio-box">
                  Precio: <span>S/ {productoDetalle.precio.toFixed(2)}</span><br />
                  Disponibilidad: <span style={{ color: "#16a34a" }}>{productoDetalle.stock} unidades en stock</span>
                </div>
                <div style={{ fontWeight: 700, fontSize: "0.85rem", color: "#1e293b", marginBottom: 6 }}>Descripción del Producto</div>
                <div className="modal-desc">{productoDetalle.descripcion}</div>
                <div style={{ fontSize: "0.78rem", color: "#64748b" }}>Categoría: {productoDetalle.categoria}</div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn-agregar"
                onClick={() => { agregarAlCarrito(productoDetalle); setProductoDetalle(null); }}
              >
                Agregar al Carrito
              </button>
              <button className="btn-cerrar-modal" onClick={() => setProductoDetalle(null)}>Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Vender;
