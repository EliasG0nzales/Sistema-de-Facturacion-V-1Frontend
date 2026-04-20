import { useState } from "react";

interface Cliente {
  id: number;
  nombre: string;
  historial: string;
  ultimaActividad: string;
}

const clientesEjemplo: Cliente[] = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  nombre: "Nombre de usuario",
  historial: "Historial de compras",
  ultimaActividad: "Última fecha de actividad",
}));

const clientesMasActivos = clientesEjemplo.slice(0, 3);

const Clientes = () => {
  const [busqueda, setBusqueda] = useState("");

  const clientesFiltrados = clientesEjemplo.filter((c) =>
    c.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", fontFamily: "sans-serif" }}>

      {/* Header */}
      <div style={{
        background: "#888",
        padding: "12px 24px",
      }}>
        <h2 style={{ margin: 0, fontSize: 18, fontWeight: 500, color: "#fff" }}>Clientes</h2>
      </div>

      {/* Toolbar */}
      <div style={{ padding: "16px 24px 12px", background: "#f0f0f0" }}>
        <p style={{ margin: "0 0 10px", fontSize: 13, color: "#999", fontStyle: "italic" }}>
          Insertar texto cool y motivacional...
        </p>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <input
            type="text"
            placeholder="Buscar por nombre"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            style={{
              flex: 1,
              padding: "8px 16px",
              borderRadius: 20,
              border: "1px solid #ccc",
              fontSize: 13,
              background: "#fff",
              outline: "none",
              color: "#333",
            }}
          />
          <button style={{
            padding: "8px 18px",
            borderRadius: 20,
            border: "none",
            background: "#555",
            color: "#fff",
            fontSize: 13,
            fontWeight: 500,
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}>
            + Cliente
          </button>
        </div>
      </div>

      {/* Contenido principal */}
      <div style={{
        flex: 1,
        overflowY: "auto",
        padding: "16px 24px",
        background: "#f0f0f0",
        display: "flex",
        gap: 32,
        alignItems: "flex-start",
      }}>

        {/* Lista de clientes */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 14 }}>
          {clientesFiltrados.map((c) => (
            <div key={c.id} style={{
              background: "#fff",
              borderRadius: 10,
              padding: "12px 16px",
              display: "flex",
              gap: 16,
              alignItems: "flex-start",
              border: "1px solid #ddd",
            }}>
              {/* Avatar */}
              <div style={{
                width: 90,
                height: 90,
                background: "#ccc",
                borderRadius: 8,
                flexShrink: 0,
                border: "1px solid #bbb",
              }} />

              {/* Info */}
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 500, fontSize: 14, margin: "0 0 8px", color: "#333" }}>
                  {c.nombre}
                </p>
                <div style={{
                  border: "1px solid #ccc",
                  borderRadius: 20,
                  padding: "6px 14px",
                  fontSize: 13,
                  color: "#666",
                  marginBottom: 6,
                }}>
                  {c.historial}
                </div>
                <div style={{
                  border: "1px solid #ccc",
                  borderRadius: 20,
                  padding: "6px 14px",
                  fontSize: 13,
                  color: "#666",
                }}>
                  {c.ultimaActividad}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Panel: Clientes más activos */}
        <div style={{
          width: 300,
          background: "#e8e8e8",
          borderRadius: 12,
          padding: "18px 20px",
          display: "flex",
          flexDirection: "column",
          gap: 18,
          flexShrink: 0,
          border: "1px solid #d5d5d5",
        }}>
          <h3 style={{ margin: 0, fontSize: 15, fontWeight: 500, color: "#444" }}>
            Clientes más activos
          </h3>

          {clientesMasActivos.map((c) => (
            <div key={c.id} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
              <div style={{
                width: 72,
                height: 72,
                background: "#bbb",
                borderRadius: 8,
                flexShrink: 0,
                border: "1px solid #aaa",
              }} />
              <div>
                <p style={{ fontWeight: 500, fontSize: 14, margin: "0 0 5px", color: "#222" }}>
                  {c.nombre}
                </p>
                <p style={{ fontSize: 13, margin: "0 0 3px", color: "#3366cc", cursor: "pointer" }}>
                  Historial de compras
                </p>
                <p style={{ fontSize: 13, margin: 0, color: "#3366cc", cursor: "pointer" }}>
                  Ver actividad
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Clientes;