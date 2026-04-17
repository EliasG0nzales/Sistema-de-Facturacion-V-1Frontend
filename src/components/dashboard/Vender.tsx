import { useState } from "react";

interface Producto {
  id: number;
  nombre: string;
  stock: number;
  vendidos: number;
  categoria: string;
}

const productosEjemplo: Producto[] = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  nombre: "NOMBRE DEL PRODUCTO",
  stock: 100,
  vendidos: 20,
  categoria: "CATEGORÍA",
}));

const Vender = () => {
  const [busqueda, setBusqueda] = useState("");
  const [categoriaFiltro, setCategoriaFiltro] = useState("todas");

  const productosFiltrados = productosEjemplo.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <style>{`
        .card {
          overflow: visible;
          width: 100%;
          aspect-ratio: 1 / 1;
          perspective: 1000px;
        }
        .card-content {
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform 300ms;
          box-shadow: 0px 0px 10px 1px #000000aa;
          border-radius: 10px;
          position: relative;
        }
        .card:hover .card-content {
          transform: rotateY(180deg);
        }
        .card-front, .card-back {
          background-color: #151515;
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          border-radius: 10px;
          overflow: hidden;
        }
        .card-back {
          justify-content: center;
          display: flex;
          align-items: center;
        }
        .card-back::before {
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
        .card-back-content {
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
          gap: 16px;
        }
        .card-front {
          transform: rotateY(180deg);
          color: white;
        }
        .card-front-content {
          position: absolute;
          width: 100%;
          height: 100%;
          padding: 10px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .card-badge {
          background-color: #00000055;
          padding: 2px 10px;
          border-radius: 10px;
          backdrop-filter: blur(2px);
          width: fit-content;
          font-size: 11px;
          color: white;
        }
        .card-description {
          box-shadow: 0px 0px 10px 5px #00000088;
          width: 100%;
          padding: 10px;
          background-color: #00000099;
          backdrop-filter: blur(5px);
          border-radius: 5px;
        }
        .card-title-row {
          font-size: 11px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: white;
          font-weight: 700;
        }
        .card-footer-text {
          color: #ffffff88;
          margin-top: 5px;
          font-size: 9px;
        }
        .card-img-bg {
          position: absolute;
          width: 100%;
          height: 100%;
        }
        .circle {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          background-color: #ffbb66;
          position: relative;
          filter: blur(15px);
          animation: floating 2600ms infinite linear;
        }
        .circle-bottom {
          background-color: #ff8866;
          left: 50px;
          top: 0px;
          width: 150px;
          height: 150px;
          animation-delay: -800ms;
        }
        .circle-right {
          background-color: #ff2233;
          left: 160px;
          top: -80px;
          width: 30px;
          height: 30px;
          animation-delay: -1800ms;
        }
        @keyframes floating {
          0%   { transform: translateY(0px); }
          50%  { transform: translateY(10px); }
          100% { transform: translateY(0px); }
        }
      `}</style>

      {/* Header */}
      <div style={{
        background: "#888",
        padding: "12px 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <h2 style={{ margin: 0, fontSize: 20, fontWeight: 600, color: "#fff" }}>Vender</h2>
        <button style={{
          padding: "8px 20px",
          borderRadius: 20,
          border: "1px solid #bbb",
          background: "#aaa",
          color: "#fff",
          fontSize: 13,
          cursor: "pointer",
        }}>
          Historial de ventas
        </button>
      </div>

      {/* Buscador */}
      <div style={{
        background: "#d0d0d0",
        padding: "14px 24px",
        display: "flex",
        gap: 10,
        alignItems: "center",
      }}>
        <input
          type="text"
          placeholder="Producto"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={{
            flex: 1, padding: "9px 16px",
            borderRadius: 20, border: "1px solid #bbb",
            fontSize: 14, background: "#fff",
            outline: "none", color: "#333",
          }}
        />
        <div style={{ display: "flex", alignItems: "center" }}>
          <select
            value={categoriaFiltro}
            onChange={(e) => setCategoriaFiltro(e.target.value)}
            style={{
              padding: "9px 16px",
              borderRadius: "20px 0 0 20px",
              border: "1px solid #bbb",
              borderRight: "none",
              fontSize: 14, background: "#fff",
              outline: "none", cursor: "pointer", color: "#333",
            }}
          >
            <option value="todas">Categorías</option>
            <option value="cat1">Categoría 1</option>
            <option value="cat2">Categoría 2</option>
          </select>
          <button style={{
            padding: "9px 14px",
            borderRadius: "0 20px 20px 0",
            border: "1px solid #bbb",
            background: "#fff", fontSize: 18,
            cursor: "pointer", lineHeight: 1, color: "#333",
          }}>
            +
          </button>
        </div>
      </div>

      {/* Grid productos */}
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 24px", background: "#e8e8e8" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 16,
        }}>
          {productosFiltrados.map((p) => (
            <div key={p.id} className="card">
              <div className="card-content">

                {/* FRENTE */}
                <div className="card-front">
                  <div className="card-img-bg">
                    <div className="circle" />
                    <div className="circle circle-bottom" />
                    <div className="circle circle-right" />
                  </div>
                  <div className="card-front-content">
                    <span className="card-badge">{p.categoria}</span>
                    <div className="card-description">
                      <div className="card-title-row">
                        <span>{p.nombre}</span>
                      </div>
                      <p className="card-footer-text">
                        Stock: {p.stock} &nbsp;|&nbsp; Vendidos: {p.vendidos}
                      </p>
                    </div>
                  </div>
                </div>

                {/* DORSO */}
                <div className="card-back">
                  <div className="card-back-content">
                    <svg stroke="#ffffff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" height="50px" width="50px" fill="#ffffff">
                      <path d="M20.84375 0.03125C20.191406 0.0703125 19.652344 0.425781 19.21875 1.53125C18.988281 2.117188 18.5 3.558594 18.03125 4.9375C17.792969 5.636719 17.570313 6.273438 17.40625 6.75C17.390625 6.796875 17.414063 6.855469 17.40625 6.90625C17.398438 6.925781 17.351563 6.949219 17.34375 6.96875L17.25 7.25C18.566406 7.65625 19.539063 8.058594 19.625 8.09375C22.597656 9.21875 28.351563 11.847656 33.28125 16.78125C38.5 22 41.183594 28.265625 42.09375 30.71875C42.113281 30.761719 42.375 31.535156 42.75 32.84375C42.757813 32.839844 42.777344 32.847656 42.78125 32.84375C43.34375 32.664063 44.953125 32.09375 46.3125 31.625C47.109375 31.351563 47.808594 31.117188 48.15625 31C49.003906 30.714844 49.542969 30.292969 49.8125 29.6875C50.074219 29.109375 50.066406 28.429688 49.75 27.6875C49.605469 27.347656 49.441406 26.917969 49.25 26.4375C47.878906 23.007813 45.007813 15.882813 39.59375 10.46875C33.613281 4.484375 25.792969 1.210938 22.125 0.21875C21.648438 0.0898438 21.234375 0.0078125 20.84375 0.03125 Z M 16.46875 9.09375L0.0625 48.625C-0.09375 48.996094 -0.00390625 49.433594 0.28125 49.71875C0.472656 49.910156 0.738281 50 1 50C1.128906 50 1.253906 49.988281 1.375 49.9375L40.90625 33.59375C40.523438 32.242188 40.222656 31.449219 40.21875 31.4375C39.351563 29.089844 36.816406 23.128906 31.875 18.1875C27.035156 13.34375 21.167969 10.804688 18.875 9.9375C18.84375 9.925781 17.8125 9.5 16.46875 9.09375 Z M 17 16C19.761719 16 22 18.238281 22 21C22 23.761719 19.761719 26 17 26C15.140625 26 13.550781 24.972656 12.6875 23.46875L15.6875 16.1875C16.101563 16.074219 16.550781 16 17 16 Z M 31 22C32.65625 22 34 23.34375 34 25C34 25.917969 33.585938 26.730469 32.9375 27.28125L32.90625 27.28125C33.570313 27.996094 34 28.949219 34 30C34 32.210938 32.210938 34 30 34C27.789063 34 26 32.210938 26 30C26 28.359375 26.996094 26.960938 28.40625 26.34375L28.3125 26.3125C28.117188 25.917969 28 25.472656 28 25C28 23.34375 29.34375 22 31 22 Z M 21 32C23.210938 32 25 33.789063 25 36C25 36.855469 24.710938 37.660156 24.25 38.3125L20.3125 39.9375C18.429688 39.609375 17 37.976563 17 36C17 33.789063 18.789063 32 21 32 Z M 9 34C10.65625 34 12 35.34375 12 37C12 38.65625 10.65625 40 9 40C7.902344 40 6.960938 39.414063 6.4375 38.53125L8.25 34.09375C8.488281 34.03125 8.742188 34 9 34Z" />
                    </svg>
                    <strong>Hover Me</strong>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Vender;