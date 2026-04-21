import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ProductosProvider } from "../context/ProductosContext";
import Tienda from "../components/dashboard/Tienda";
import Productos from "../components/dashboard/Productos";
import Clientes from "../components/dashboard/Clientes";

type Section = "vender" | "productos" | "clientes";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<Section>("vender");
  const [hoverItem, setHoverItem] = useState<string | null>(null);

  const isAdmin = user?.role === "admin";

  const handleLogout = () => { logout(); navigate("/login"); };

  const renderSection = () => {
    switch (activeSection) {
      case "vender":    return <Tienda onLogout={handleLogout} />;
      case "productos": return <Productos />;
      case "clientes":  return <Clientes />;
    }
  };

  return (
    <ProductosProvider>
      <style>{`
        /* ── Animaciones ── */
        @keyframes metalSlide {
          0%   { background-position: -300% center; }
          100% { background-position: 300% center; }
        }
        @keyframes metalPulse {
          0%, 100% { box-shadow: 0 2px 10px rgba(200,0,0,0.4), inset 0 1px 0 rgba(255,100,100,0.3); }
          50%       { box-shadow: 0 4px 20px rgba(255,50,50,0.7), inset 0 1px 0 rgba(255,150,150,0.5); }
        }
        @keyframes logoFloat {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-5px); }
        }
        @keyframes btnShine { 0% { left: -75%; } 100% { left: 150%; } }
        @keyframes sidebarCornerPulse {
          0%, 100% { opacity: 0.5; }
          50%       { opacity: 1; }
        }
        @keyframes dividerGlow {
          0%, 100% { box-shadow: 0 0 4px rgba(192,57,43,0.4); }
          50%       { box-shadow: 0 0 10px rgba(192,57,43,0.9); }
        }

        /* ── Sidebar ── */
        .sidebar-nav {
          position: relative;
          box-shadow: 4px 0 24px rgba(0,0,0,0.6), inset -1px 0 0 rgba(255,255,255,0.04);
        }

        /* Esquinas geométricas decorativas */
        .sidebar-nav::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          pointer-events: none;
          background:
            linear-gradient(135deg, rgba(192,57,43,0.15) 0%, transparent 30%),
            linear-gradient(225deg, rgba(192,57,43,0.08) 0%, transparent 25%);
          z-index: 0;
        }

        /* Línea lateral roja */
        .sidebar-nav::after {
          content: '';
          position: absolute;
          top: 0; right: 0;
          width: 2px; height: 100%;
          background: linear-gradient(180deg,
            transparent 0%,
            #c0392b 20%,
            #e74c3c 50%,
            #c0392b 80%,
            transparent 100%
          );
          animation: dividerGlow 2.5s ease-in-out infinite;
        }

        /* Divisor geométrico */
        .sidebar-divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, #c0392b, #e74c3c, #c0392b, transparent);
          margin: 12px 0;
          position: relative;
          animation: dividerGlow 2.5s ease-in-out infinite;
        }
        .sidebar-divider::before {
          content: '';
          position: absolute;
          left: 50%; top: 50%;
          transform: translate(-50%, -50%) rotate(45deg);
          width: 6px; height: 6px;
          background: #e74c3c;
          box-shadow: 0 0 6px rgba(231,76,60,0.8);
        }

        /* Logo wrap */
        .eagle-logo-wrap {
          position: relative;
          width: 120px; height: 120px;
          margin-bottom: 8px;
          display: flex; align-items: center; justify-content: center;
          cursor: default;
          transition: transform 0.3s ease;
          flex-shrink: 0;
          z-index: 1;
        }
        .eagle-logo-wrap::before {
          content: '';
          position: absolute;
          inset: -4px;
          background: conic-gradient(from 0deg, #c0392b, #e74c3c, #fff2, #c0392b, #e74c3c, #fff2, #c0392b);
          border-radius: 50%;
          animation: metalSlide 4s linear infinite;
          background-size: 300% auto;
          opacity: 0.6;
        }
        .eagle-logo-wrap::after {
          content: '';
          position: absolute;
          inset: 2px;
          background: #111;
          border-radius: 50%;
        }
        .eagle-logo-img {
          width: 72px; height: 72px;
          object-fit: contain;
          animation: logoFloat 3s ease-in-out infinite;
          position: relative; z-index: 2;
        }

        /* Botones nav */
        .metal-btn {
          width: 100%; padding: 10px 14px;
          border-radius: 0;
          border: none;
          border-left: 3px solid transparent;
          background: transparent;
          color: #aaa; font-weight: 600; font-size: 13px; cursor: pointer;
          letter-spacing: 0.04em;
          transition: all 0.2s;
          position: relative; overflow: hidden;
          text-align: left;
          display: flex; align-items: center; gap: 8px;
        }
        .metal-btn::before {
          content: '';
          position: absolute;
          left: 0; top: 0;
          width: 0; height: 100%;
          background: linear-gradient(90deg, rgba(192,57,43,0.15), transparent);
          transition: width 0.2s;
        }
        .metal-btn:hover::before { width: 100%; }
        .metal-btn:hover {
          color: #fff;
          border-left-color: #c0392b;
        }
        .metal-btn.active {
          color: #fff;
          border-left-color: #e74c3c;
          background: linear-gradient(90deg, rgba(192,57,43,0.25), transparent);
          box-shadow: inset 0 0 20px rgba(192,57,43,0.1);
        }
        .metal-btn.active::after {
          content: '';
          position: absolute;
          right: 12px; top: 50%;
          transform: translateY(-50%) rotate(45deg);
          width: 5px; height: 5px;
          background: #e74c3c;
          box-shadow: 0 0 6px rgba(231,76,60,0.8);
        }

        /* Badge admin */
        .badge-admin {
          font-size: 9px; font-weight: 700; padding: 2px 10px;
          border-radius: 2px;
          background: linear-gradient(90deg, #7f0000, #c0392b, #e74c3c, #c0392b, #7f0000);
          background-size: 300% auto;
          color: #fff; margin-bottom: 16px;
          text-transform: uppercase; letter-spacing: 0.15em;
          animation: metalSlide 3s linear infinite;
          border: 1px solid rgba(255,80,80,0.3);
          box-shadow: 0 0 8px rgba(192,57,43,0.5), inset 0 1px 0 rgba(255,255,255,0.1);
          clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%);
        }

        /* Link buttons */
        .link-btn {
          background: none; border: none; font-size: 12px; font-weight: 500;
          cursor: pointer; text-align: center; padding: 4px 0; width: 100%;
          transition: color 0.2s, letter-spacing 0.2s;
          letter-spacing: 0.03em;
        }
        .link-btn:hover { letter-spacing: 0.08em; }

        /* Decoración geométrica inferior */
        .sidebar-geo-bottom {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 60px;
          pointer-events: none;
          overflow: hidden;
        }
        .sidebar-geo-bottom::before {
          content: '';
          position: absolute;
          bottom: -20px; left: -20px;
          width: 80px; height: 80px;
          border: 1px solid rgba(192,57,43,0.3);
          transform: rotate(45deg);
        }
        .sidebar-geo-bottom::after {
          content: '';
          position: absolute;
          bottom: -30px; right: -10px;
          width: 60px; height: 60px;
          border: 1px solid rgba(192,57,43,0.2);
          transform: rotate(45deg);
        }
      `}</style>

      <div style={{ display: "flex", height: "100vh", background: "#e0e0e0" }}>

        {/* ── Sidebar ── */}
        <aside
            className="sidebar-nav"
            style={{
              width: 200,
              background: "linear-gradient(160deg, #0d0d0d 0%, #141414 40%, #1a1a1a 70%, #0d0d0d 100%)",
              display: "flex", flexDirection: "column", alignItems: "center",
              padding: "24px 0 28px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Forma geométrica superior */}
            <div style={{ position: "absolute", top: -30, left: -30, width: 100, height: 100, border: "1px solid rgba(192,57,43,0.2)", transform: "rotate(45deg)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", top: -20, left: -20, width: 70, height: 70, border: "1px solid rgba(192,57,43,0.15)", transform: "rotate(45deg)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", top: 0, right: 0, width: 40, height: 40, background: "linear-gradient(135deg, rgba(192,57,43,0.3), transparent)", clipPath: "polygon(100% 0, 0 0, 100% 100%)", pointerEvents: "none" }} />

            {/* ── Logo Eagle Gamer ── */}
            <div
              className="eagle-logo-wrap"
              onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.08)")}
              onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
              style={{ background: "none", border: "none", boxShadow: "none", animation: "none", width: 120, height: 120 }}
            >
              <img
                src="/eagle gamer logo.png"
                alt="Eagle Gamer"
                style={{ width: "100%", height: "100%", objectFit: "contain", filter: "drop-shadow(0 0 10px rgba(200,160,0,0.5))", animation: "logoFloat 3s ease-in-out infinite", position: "relative", zIndex: 2 }}
              />
            </div>

            <p style={{ fontSize: 12, fontWeight: 700, margin: "4px 0 2px", color: "#d4a800", textAlign: "center", letterSpacing: 1, textTransform: "uppercase", textShadow: "0 0 8px rgba(212,168,0,0.6)", zIndex: 1 }}>
              Eagle Gamer
            </p>
            <p style={{ fontSize: 11, color: "#666", margin: "0 0 6px", textAlign: "center", zIndex: 1 }}>
              {user?.username || "USER"}
            </p>

            {isAdmin ? <span className="badge-admin">Admin</span> : <div style={{ marginBottom: 16 }} />}

            {/* Divisor geométrico */}
            <div className="sidebar-divider" />

            <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 2, zIndex: 1 }}>
              {(["vender", "productos", "clientes"] as Section[]).map((sec) => (
                <button
                  key={sec}
                  onClick={() => setActiveSection(sec)}
                  className={`metal-btn${activeSection === sec ? " active" : ""}`}
                >
                  {/* Icono geométrico */}
                  <span style={{ width: 6, height: 6, background: activeSection === sec ? "#e74c3c" : "#444", transform: "rotate(45deg)", display: "inline-block", flexShrink: 0, boxShadow: activeSection === sec ? "0 0 6px rgba(231,76,60,0.8)" : "none", transition: "all 0.2s" }} />
                  {sec === "vender" ? "Tienda" : sec.charAt(0).toUpperCase() + sec.slice(1)}
                </button>
              ))}
            </div>

            {/* Divisor inferior */}
            <div className="sidebar-divider" style={{ marginTop: "auto" }} />

            <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 2, alignItems: "center", zIndex: 1 }}>
              {["help", "settings"].map((item) => (
                <button
                  key={item}
                  className="link-btn"
                  style={{ color: hoverItem === item ? "#e74c3c" : "#555" }}
                  onMouseEnter={() => setHoverItem(item)}
                  onMouseLeave={() => setHoverItem(null)}
                >
                  {item}
                </button>
              ))}
              <button
                onClick={handleLogout}
                className="link-btn"
                style={{ color: hoverItem === "logout" ? "#e74c3c" : "#555" }}
                onMouseEnter={() => setHoverItem("logout")}
                onMouseLeave={() => setHoverItem(null)}
              >
                log out
              </button>
            </div>

            {/* Decoración geométrica inferior */}
            <div className="sidebar-geo-bottom" />
          </aside>

        <main style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
          {renderSection()}
        </main>
      </div>
    </ProductosProvider>
  );
};

export default Dashboard;