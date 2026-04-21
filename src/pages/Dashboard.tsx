import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ProductosProvider } from "../context/ProductosContext";
import Vender from "../components/dashboard/Vender";
import Productos from "../components/dashboard/Productos";
import Clientes from "../components/dashboard/Clientes";
import AdminPanel from "../components/dashboard/AdminPanel";

type Section = "vender" | "productos" | "clientes";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<Section>("vender");
  const [hoverItem, setHoverItem] = useState<string | null>(null);

  const isAdmin = user?.role === "admin";
  const [modoAdmin, setModoAdmin] = useState(isAdmin);

  const handleLogout = () => { logout(); navigate("/login"); };

  const renderSection = () => {
    if (isAdmin && modoAdmin)
      return <AdminPanel onVolverTienda={() => setModoAdmin(false)} />;
    switch (activeSection) {
      case "vender":    return <Vender />;
      case "productos": return <Productos />;
      case "clientes":  return <Clientes />;
    }
  };

  return (
    <ProductosProvider>
      <style>{`
        @keyframes metalSlide {
          0%   { background-position: -300% center; }
          100% { background-position: 300% center; }
        }
        @keyframes metalPulse {
          0%, 100% { box-shadow: 0 2px 10px rgba(200,0,0,0.4), inset 0 1px 0 rgba(255,100,100,0.3); }
          50%       { box-shadow: 0 4px 20px rgba(255,50,50,0.7), inset 0 1px 0 rgba(255,150,150,0.5); }
        }
        @keyframes sidebarGlow {
          0%, 100% { box-shadow: 2px 0 12px rgba(180,0,0,0.3); }
          50%       { box-shadow: 2px 0 24px rgba(255,50,50,0.5); }
        }
        @keyframes avatarSpin {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .sidebar-nav {
          animation: sidebarGlow 3s ease-in-out infinite;
        }

        .metal-btn {
          width: 100%;
          padding: 11px 0;
          border-radius: 8px;
          border: 1px solid rgba(255,80,80,0.4);
          background: linear-gradient(
            90deg,
            #1a0000 0%,
            #5a0000 15%,
            #cc0000 30%,
            #ff6666 45%,
            #ffffff55 50%,
            #ff6666 55%,
            #cc0000 70%,
            #5a0000 85%,
            #1a0000 100%
          );
          background-size: 300% auto;
          color: #fff;
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          letter-spacing: 0.05em;
          text-shadow: 0 1px 4px rgba(0,0,0,0.8);
          animation: metalSlide 3s linear infinite, metalPulse 2s ease-in-out infinite;
          transition: transform 0.15s, filter 0.2s;
          position: relative;
          overflow: hidden;
        }
        .metal-btn::after {
          content: '';
          position: absolute;
          top: 0; left: -75%;
          width: 50%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          transform: skewX(-20deg);
          animation: btnShine 2.5s ease-in-out infinite;
        }
        @keyframes btnShine {
          0%   { left: -75%; }
          100% { left: 150%; }
        }
        .metal-btn:hover {
          transform: scale(1.05);
          filter: brightness(1.2);
          animation: metalSlide 1.5s linear infinite, metalPulse 1s ease-in-out infinite;
        }
        .metal-btn.active {
          background: linear-gradient(
            90deg,
            #000000 0%,
            #3a0000 15%,
            #990000 30%,
            #ee3333 45%,
            #ffffff44 50%,
            #ee3333 55%,
            #990000 70%,
            #3a0000 85%,
            #000000 100%
          );
          background-size: 300% auto;
          border-color: rgba(255,50,50,0.7);
          box-shadow: 0 0 16px rgba(255,0,0,0.5), inset 0 2px 4px rgba(0,0,0,0.5);
          transform: scale(1.0);
        }

        .metal-btn-admin {
          width: 100%;
          padding: 10px 0;
          border-radius: 8px;
          border: 1px solid rgba(255,50,50,0.5);
          background: linear-gradient(
            90deg,
            #000000 0%,
            #2a0000 10%,
            #6b0000 25%,
            #cc0000 40%,
            #ff2200 50%,
            #cc0000 60%,
            #6b0000 75%,
            #2a0000 90%,
            #000000 100%
          );
          background-size: 300% auto;
          color: #fff;
          font-weight: 700;
          font-size: 13px;
          cursor: pointer;
          letter-spacing: 0.06em;
          text-shadow: 0 1px 4px rgba(0,0,0,0.9);
          animation: metalSlide 2s linear infinite, metalPulse 1.5s ease-in-out infinite;
          transition: transform 0.15s, filter 0.2s;
          margin-top: 16px;
          position: relative;
          overflow: hidden;
        }
        .metal-btn-admin::after {
          content: '';
          position: absolute;
          top: 0; left: -75%;
          width: 50%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transform: skewX(-20deg);
          animation: btnShine 2s ease-in-out infinite;
        }
        .metal-btn-admin:hover {
          transform: scale(1.05);
          filter: brightness(1.25);
        }

        .avatar-metal {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          margin-bottom: 12px;
          background: linear-gradient(
            135deg,
            #000000, #4a0000, #cc0000,
            #ff6666, #ffffff, #ff6666,
            #cc0000, #4a0000, #000000
          );
          background-size: 400% 400%;
          animation: avatarSpin 4s ease infinite;
          box-shadow: 0 0 16px rgba(200,0,0,0.6), 0 0 32px rgba(255,0,0,0.2);
          border: 2px solid rgba(255,80,80,0.5);
          cursor: default;
          transition: transform 0.3s ease;
        }
        .avatar-metal:hover {
          transform: scale(1.1);
          box-shadow: 0 0 24px rgba(255,0,0,0.8), 0 0 48px rgba(255,50,50,0.3);
        }

        .badge-admin {
          font-size: 10px;
          font-weight: 700;
          padding: 3px 12px;
          border-radius: 20px;
          background: linear-gradient(
            90deg,
            #1a0000, #cc0000, #ff4444, #ffffff55, #ff4444, #cc0000, #1a0000
          );
          background-size: 300% auto;
          color: #fff;
          margin-bottom: 20px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          text-shadow: 0 1px 3px rgba(0,0,0,0.7);
          animation: metalSlide 2.5s linear infinite;
          border: 1px solid rgba(255,80,80,0.4);
          box-shadow: 0 0 10px rgba(200,0,0,0.4);
        }

        .link-btn {
          background: none;
          border: none;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          text-align: center;
          padding: 4px 0;
          width: 100%;
          transition: color 0.2s, transform 0.15s, text-shadow 0.2s;
        }
        .link-btn:hover {
          transform: scale(1.05);
          text-shadow: 0 0 8px rgba(255,80,80,0.8);
        }
      `}</style>

      <div style={{ display: "flex", height: "100vh", background: "#e0e0e0" }}>

        {/* ── Sidebar ───────────────────────────────────────────────── */}
        {!modoAdmin && (
          <aside
            className="sidebar-nav"
            style={{
              width: 200,
              background: "linear-gradient(180deg, #0a0000 0%, #1a0000 30%, #220000 60%, #0a0000 100%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "32px 20px 28px",
            }}
          >
            {/* Avatar animado */}
            <div
              className="avatar-metal"
              onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.1)")}
              onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
            />

            <p style={{ fontSize: 13, fontWeight: 700, margin: "0 0 2px", color: "#fff", textAlign: "center", textShadow: "0 1px 6px rgba(200,0,0,0.8)" }}>
              {user?.username || "USER"}
            </p>
            <p style={{ fontSize: 12, color: "#cc6666", margin: "0 0 4px", textAlign: "center" }}>
              Welcome back
            </p>

            {/* Badge */}
            {isAdmin ? (
              <span className="badge-admin">Admin</span>
            ) : (
              <div style={{ marginBottom: 20 }} />
            )}

            {/* Nav buttons */}
            <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 10 }}>
              {(["vender", "productos", "clientes"] as Section[]).map((sec) => (
                <button
                  key={sec}
                  onClick={() => setActiveSection(sec)}
                  className={`metal-btn${activeSection === sec ? " active" : ""}`}
                >
                  {sec.charAt(0).toUpperCase() + sec.slice(1)}
                </button>
              ))}
            </div>

            {/* Botón Panel Admin */}
            {isAdmin && (
              <button
                onClick={() => setModoAdmin(true)}
                className="metal-btn-admin"
              >
                Panel Admin →
              </button>
            )}

            {/* Bottom links */}
            <div style={{ marginTop: "auto", width: "100%", display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
              {["help", "settings"].map((item) => (
                <button
                  key={item}
                  className="link-btn"
                  style={{ color: hoverItem === item ? "#ff6666" : "#cc3333" }}
                  onMouseEnter={() => setHoverItem(item)}
                  onMouseLeave={() => setHoverItem(null)}
                >
                  {item}
                </button>
              ))}
              <button
                onClick={handleLogout}
                className="link-btn"
                style={{ color: hoverItem === "logout" ? "#ff6666" : "#cc3333" }}
                onMouseEnter={() => setHoverItem("logout")}
                onMouseLeave={() => setHoverItem(null)}
              >
                log out
              </button>
            </div>
          </aside>
        )}

        {/* ── Main ─────────────────────────────────────────────────── */}
        <main style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
          {renderSection()}
        </main>

      </div>
    </ProductosProvider>
  );
};

export default Dashboard;