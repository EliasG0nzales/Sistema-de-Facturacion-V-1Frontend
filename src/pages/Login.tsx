import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("eagle_users") || "[]");
    const found = users.find(
      (u: { email: string; password: string }) =>
        u.email.toLowerCase() === email.toLowerCase() &&
        u.password === password
    );

    const isAdmin = email === "admin@gmail.com" && password === "1234";

    if (found || isAdmin) {
      login({
        username: found ? `${found.nombre} ${found.apellido}` : "Admin",
        role: isAdmin ? "admin" : "user",
      });
      navigate("/dashboard");
    } else {
      setError("Correo o contraseña incorrectos");
    }
  };

  return (
    <div style={{
      display: "flex",
      height: "100vh",
      width: "100vw",
      position: "relative",
      overflow: "hidden",
    }}>

      ```typescriptreact
{/* Video de fondo */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "absolute",
          top: 0, left: 0,
          width: "100%", height: "100%",
          objectFit: "cover",
          zIndex: 0,
        }}
      >
        <source src="/gamer.mp4" type="video/mp4" />
      </video>
```

      {/* Overlay oscuro */}
      <div style={{
        position: "absolute",
        top: 0, left: 0,
        width: "100%", height: "100%",
        background: "rgba(0,0,0,0.55)",
        zIndex: 1,
      }} />

      {/* Panel izquierdo */}
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "0 60px",
        color: "#fff",
        position: "relative",
        zIndex: 2,
      }}>
        <h1 style={{
          fontSize: 36,
          fontWeight: 800,
          fontFamily: "'Orbitron', sans-serif",
          lineHeight: 1.6,
          color: "#fff",
          textAlign: "left",
          textShadow: "none",
        }}>
          Bienvenido<br />a EAGLE GAMING
        </h1>

        <p style={{
          fontSize: 15,
          fontFamily: "'Roboto', sans-serif",
          fontWeight: 600,
          maxWidth: 380,
          opacity: 0.9,
          lineHeight: 1.6,
          textAlign: "left",
        }}>
          Eagle Gaming es tu plataforma de gestión para negocios de videojuegos y tecnología.
          Administra ventas, productos y clientes desde un solo lugar, rápido y sin complicaciones.
        </p>
      </div>

      {/* Panel derecho */}
      <div style={{
        width: 420,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px",
        background: "rgba(255,255,255,0.12)",
        backdropFilter: "blur(12px)",
        position: "relative",
        zIndex: 2,
      }}>
        <div style={{ width: "100%" }}>
          <h2 style={{
            color: "#fff", textAlign: "center",
            fontSize: 28, fontWeight: 600, marginBottom: 28,
          }}>
            Iniciar sesión
          </h2>

          {error && (
            <p style={{ color: "#ff6b6b", fontSize: 13, marginBottom: 12, textAlign: "center" }}>
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Email */}
            <div>
              <label style={{ color: "#fff", fontSize: 14, display: "block", marginBottom: 6 }}>
                Correo electrónico
              </label>
              <input
                type="email"
                placeholder="Ejemplo@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: 6,
                  border: "none",
                  background: "rgba(255,255,255,0.9)",
                  fontSize: 14,
                  boxSizing: "border-box",
                  color: "#333",
                }}
              />
            </div>

            {/* Contraseña con ojito */}
            <div>
              <label style={{ color: "#fff", fontSize: 14, display: "block", marginBottom: 6 }}>
                Contraseña
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 44px 10px 14px",
                    borderRadius: 6,
                    border: "none",
                    background: "rgba(255,255,255,0.9)",
                    fontSize: 14,
                    boxSizing: "border-box",
                    color: "#333",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    lineHeight: 1,
                  }}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Recuérdame */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <input
                type="checkbox"
                id="remember"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <label htmlFor="remember" style={{ color: "#fff", fontSize: 13 }}>
                Recuérdame
              </label>
            </div>

            <button
              type="submit"
              style={{
                padding: "11px",
                borderRadius: 6,
                border: "none",
                background: "rgba(255,255,255,0.25)",
                color: "#fff",
                fontSize: 15,
                fontWeight: 600,
                cursor: "pointer",
                marginTop: 4,
              }}
            >
              Iniciar sesión ahora
            </button>
          </form>

          <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 6 }}>
            <Link to="/forgot-password" style={{ color: "#fff", fontSize: 13, textDecoration: "none", opacity: 0.85 }}>
              ¿Olvidaste tu contraseña?
            </Link>
            <div>
              <span style={{ color: "#fff", fontSize: 13, fontWeight: 700 }}>Regístrate</span>
              <br />
              <Link to="/register" style={{ color: "#fff", fontSize: 13, textDecoration: "none", opacity: 0.85 }}>
                Crear cuenta nueva
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;