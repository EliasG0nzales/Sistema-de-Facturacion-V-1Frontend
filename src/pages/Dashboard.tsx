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
  const [modoAdmin, setModoAdmin] = useState(false);

  const isAdmin = user?.role === "admin";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const renderSection = () => {
    // Si es admin y está en modo admin, mostrar panel de administración
    if (isAdmin && modoAdmin) return <AdminPanel />;

    switch (activeSection) {
      case "vender":    return <Vender />;
      case "productos": return <Productos />;
      case "clientes":  return <Clientes />;
    }
  };

  return (
    <ProductosProvider>
      <div style={{ display: "flex", height: "100vh", background: "#e0e0e0" }}>

        {/* ── Sidebar ──────────────────────────────────────────────── */}
        <aside style={{
          width: 200,
          background: "#d0d0d0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "32px 20px 28px",
          boxShadow: "2px 0 8px rgba(0,0,0,0.12)",
        }}>

          {/* Avatar */}
          <div
            style={{ width: 72, height: 72, borderRadius: "50%", background: "#aaa", marginBottom: 12, transition: "transform 0.3s ease, box-shadow 0.3s ease", boxShadow: "0 2px 8px rgba(0,0,0,0.15)", cursor: "default" }}
            onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.08)")}
            onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
          />

          <p style={{ fontSize: 13, fontWeight: 700, margin: "0 0 2px", color: "#222", textAlign: "center" }}>
            {user?.username || "USER"}
          </p>
          <p style={{ fontSize: 12, color: "#555", margin: "0 0 4px", textAlign: "center" }}>Welcome back</p>

          {/* Badge de rol */}
          {isAdmin && (
            <span style={{
              fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20,
              background: modoAdmin ? "#dc2626" : "#2563eb",
              color: "#fff", marginBottom: 20, textTransform: "uppercase", letterSpacing: "0.05em",
            }}>
              {modoAdmin ? "Modo Admin" : "Admin"}
            </span>
          )}
          {!isAdmin && <div style={{ marginBottom: 20 }} />}

          {/* Nav buttons — solo visible en modo usuario */}
          {!modoAdmin && (
            <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 10 }}>
              {(["vender", "productos", "clientes"] as Section[]).map((sec) => (
                <button
                  key={sec}
                  onClick={() => setActiveSection(sec)}
                  style={{
                    width: "100%", padding: "11px 0", borderRadius: 8, border: "none",
                    background: activeSection === sec ? "#555" : "#bbb",
                    color: activeSection === sec ? "#fff" : "#333",
                    fontWeight: 600, fontSize: 14, cursor: "pointer",
                    transition: "background 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease",
                    boxShadow: activeSection === sec ? "0 3px 8px rgba(0,0,0,0.2)" : "none",
                    transform: activeSection === sec ? "scale(1.03)" : "scale(1)",
                  }}
                  onMouseEnter={e => { if (activeSection !== sec) { e.currentTarget.style.background = "#999"; e.currentTarget.style.transform = "scale(1.03)"; } }}
                  onMouseLeave={e => { if (activeSection !== sec) { e.currentTarget.style.background = "#bbb"; e.currentTarget.style.transform = "scale(1)"; } }}
                >
                  {sec.charAt(0).toUpperCase() + sec.slice(1)}
                </button>
              ))}
            </div>
          )}

          {/* Botón alternar modo admin/usuario — solo para admins */}
          {isAdmin && (
            <button
              onClick={() => setModoAdmin(!modoAdmin)}
              style={{
                width: "100%", padding: "10px 0", borderRadius: 8, border: "none",
                background: modoAdmin ? "#2563eb" : "#dc2626",
                color: "#fff", fontWeight: 600, fontSize: 13, cursor: "pointer",
                marginTop: modoAdmin ? 0 : 16,
                transition: "background 0.2s",
              }}
            >
              {modoAdmin ? "← Ver tienda" : "Panel Admin →"}
            </button>
          )}

          {/* Bottom links */}
          <div style={{ marginTop: "auto", width: "100%", display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
            {["help", "settings"].map((item) => (
              <button
                key={item}
                style={{
                  background: "none", border: "none",
                  color: hoverItem === item ? "#1144aa" : "#3366cc",
                  fontSize: 13, cursor: "pointer", textAlign: "center",
                  padding: "4px 0", width: "100%",
                  transition: "color 0.2s ease, transform 0.15s ease",
                  transform: hoverItem === item ? "scale(1.05)" : "scale(1)",
                }}
                onMouseEnter={() => setHoverItem(item)}
                onMouseLeave={() => setHoverItem(null)}
              >
                {item}
              </button>
            ))}
            <button
              onClick={handleLogout}
              style={{
                background: "none", border: "none",
                color: hoverItem === "logout" ? "#1144aa" : "#3366cc",
                fontSize: 13, cursor: "pointer", textAlign: "center",
                padding: "4px 0", width: "100%",
                transition: "color 0.2s ease, transform 0.15s ease",
                transform: hoverItem === "logout" ? "scale(1.05)" : "scale(1)",
              }}
              onMouseEnter={() => setHoverItem("logout")}
              onMouseLeave={() => setHoverItem(null)}
            >
              log out
            </button>
          </div>
        </aside>

        {/* ── Main ─────────────────────────────────────────────────── */}
        <main style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
          {renderSection()}
        </main>
      </div>
    </ProductosProvider>
  );
};

export default Dashboard;