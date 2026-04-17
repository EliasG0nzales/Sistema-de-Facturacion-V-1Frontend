import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");

    // Usuario hardcodeado (admin)
    if (email === "admin@gmail.com" && password === "1234") {
      login({ username: email, role: "admin" });
      navigate("/dashboard");
      return;
    }

    // Usuarios registrados en localStorage
    const users = JSON.parse(localStorage.getItem("eagle_users") || "[]");
    const found = users.find(
      (u: { email: string; password: string }) =>
        u.email === email && u.password === password
    );

    if (found) {
      login({ username: found.email, role: "user" });
      if (remember) {
        localStorage.setItem("eagle_remember", email);
      }
      navigate("/dashboard");
    } else {
      setError("Correo o contraseña incorrectos");
    }
  };

  return (
    <div
    style={{ 
        display: "flex",
        height: "100vh",
        width: "100vw",              // 👈 importante
        backgroundImage: "url('https://www.caseking.de/blog/wp-content/uploads/2025/08/AD_4nXd2eRvsZII7ieRqFrh7gm0zG9FdUyFye60kZNNvrEA8dmqkFQ8Ad_0Vo53dKuw9kcodhQMw1LXfEyvlTbiMjnv_0y9Gqac9t07f1z682I3d0afx9ydXKJ276w37rbnhypHs3OO2-Q.jpg')",
        backgroundSize: "cover",     // 👈 llena toda la pantalla
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
    }}
        >
      {/* Panel izquierdo */}
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "0 60px",
        color: "#fff",
      }}>
        <h1 style={{ fontSize: 48, fontWeight: 500, lineHeight: 1.4, color: "#fff", textAlign: "left", textShadow: "none", }}>
          Bienvenido<br />
          a EAGLE GAMING
        </h1>
        <p style={{ fontSize: 14, maxWidth: 380, opacity: 0.85, lineHeight: 1.6 }}>
          Es un hecho bien establecido que un lector se distraerá con el
          contenido legible de una página al observar su diseño. El objetivo
          de usar esto es...
        </p>
      </div>

      {/* Panel derecho - formulario */}
      <div style={{
        width: 420,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px",
        background: "rgba(255,255,255,0.12)",
        backdropFilter: "blur(12px)",
      }}>
        <div style={{ width: "100%" }}>
          <h2 style={{ color: "#fff", textAlign: "center", fontSize: 28, fontWeight: 600, marginBottom: 28 }}>
            Iniciar sesión
          </h2>

          {error && (
            <p style={{ color: "#ff6b6b", fontSize: 13, marginBottom: 12, textAlign: "center" }}>
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
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
                }}
              />
            </div>

            <div>
              <label style={{ color: "#fff", fontSize: 14, display: "block", marginBottom: 6 }}>
                Contraseña
              </label>
              <input
                type="password"
                placeholder="••••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: 6,
                  border: "none",
                  background: "rgba(255,255,255,0.9)",
                  fontSize: 14,
                  boxSizing: "border-box",
                }}
              />
            </div>

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