import type { ItemCarrito } from "../../types/carrito";

interface CarritoProps {
  items: ItemCarrito[];
  onCerrar: () => void;
  onCambiarCantidad: (id: number, cantidad: number) => void;
  onEliminar: (id: number) => void;
}

const Carrito = ({ items, onCerrar, onCambiarCantidad, onEliminar }: CarritoProps) => {
  const total = items.reduce((acc, i) => acc + i.producto.precio * i.cantidad, 0);

  return (
    <div className="carrito-overlay" onClick={onCerrar}>
      <div className="carrito-panel" onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="carrito-header">
          <span style={{ fontWeight: 700, fontSize: "0.95rem", color: "#1e293b" }}>Carrito</span>
          <button
            onClick={onCerrar}
            style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer", color: "#64748b" }}
          >✕</button>
        </div>

        {/* Vacío */}
        {items.length === 0 ? (
          <div className="carrito-vacio">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              <line x1="12" y1="10" x2="12" y2="14"/><line x1="10" y1="12" x2="14" y2="12"/>
            </svg>
            <strong style={{ color: "#1e293b" }}>Tu carrito está vacío.</strong>
            <p style={{ fontSize: "0.8rem" }}>Clica en los artículos para añadirlos a la venta</p>
          </div>
        ) : (
          <>
            {/* Items */}
            <div className="carrito-items">
              {items.map((item) => (
                <div key={item.producto.id} className="carrito-item">
                  {/* Imagen placeholder */}
                  <div style={{
                    width: 52, height: 52, minWidth: 52,
                    background: "linear-gradient(135deg, #1e1e3a, #2d2d5e)",
                    borderRadius: 8,
                  }} />

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0, padding: "0 10px" }}>
                    <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#1e293b", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {item.producto.nombre}
                    </div>
                    <div style={{ fontSize: "0.68rem", color: "#94a3b8", marginTop: 2 }}>
                      {item.producto.categoria}
                    </div>
                    <div style={{ fontSize: "0.72rem", color: "#2563eb", fontWeight: 600, marginTop: 2 }}>
                      S/ {(item.producto.precio * item.cantidad).toFixed(2)}
                    </div>
                  </div>

                  {/* Cantidad */}
                  <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <button
                      onClick={() => onCambiarCantidad(item.producto.id, Math.max(1, item.cantidad - 1))}
                      style={{ width: 22, height: 22, border: "1px solid #cbd5e1", borderRadius: 4, background: "#fff", color: "#1e293b", fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}
                    >−</button>
                    <span style={{ minWidth: 24, textAlign: "center", fontSize: "0.82rem", fontWeight: 600, color: "#1e293b" }}>
                      {item.cantidad}
                    </span>
                    <button
                      onClick={() => onCambiarCantidad(item.producto.id, item.cantidad + 1)}
                      style={{ width: 22, height: 22, border: "1px solid #cbd5e1", borderRadius: 4, background: "#fff", color: "#1e293b", fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}
                    >+</button>
                  </div>

                  {/* Eliminar */}
                  <button
                    onClick={() => onEliminar(item.producto.id)}
                    style={{ background: "none", border: "none", cursor: "pointer", marginLeft: 8, padding: 4, color: "#ef4444", display: "flex", alignItems: "center" }}
                    title="Eliminar"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6"/>
                      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                      <path d="M10 11v6M14 11v6"/>
                      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="carrito-footer">
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, fontSize: "0.9rem", fontWeight: 700, color: "#1e293b" }}>
                <span>Total</span>
                <span>S/ {total.toFixed(2)}</span>
              </div>
              <button className="btn-cobrar">Cobrar</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Carrito;
