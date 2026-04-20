import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";

interface RegisterForm {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 14px",
  borderRadius: 6,
  border: "none",
  background: "rgba(255,255,255,0.9)",
  fontSize: 14,
  boxSizing: "border-box",
  color: "#333",
};

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState<RegisterForm>({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.nombre || !form.apellido || !form.email || !form.password || !form.confirmPassword) {
      setError("Por favor completa todos los campos.");
      return;
    }

    if (form.password.length < 4) {
      setError("La contraseña debe tener al menos 4 caracteres.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("eagle_users") || "[]");
    const exists = users.find((u: { email: string }) =>
      u.email.toLowerCase() === form.email.toLowerCase()
    );

    if (exists) {
      setError("Este correo ya está registrado.");
      return;
    }

    users.push({
      nombre: form.nombre,
      apellido: form.apellido,
      email: form.email,
      password: form.password,
    });
    localStorage.setItem("eagle_users", JSON.stringify(users));

    setSuccess(true);
    setTimeout(() => navigate("/login"), 1500);
  };

  return (
    <div style={{
      display: "flex",
      height: "100vh",
      width: "100%",
      position: "relative",
      overflow: "hidden",
    }}>
      <style>{`
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .metallic-text {
          background: linear-gradient(90deg, #6e6e6e 0%, #c0c0c0 20%, #ffffff 40%, #c0c0c0 60%, #6e6e6e 80%, #c0c0c0 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 8s linear infinite;
        }
        .metallic-soft {
          background: linear-gradient(90deg, #888 0%, #d0d0d0 25%, #f0f0f0 50%, #d0d0d0 75%, #888 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 10s linear infinite;
        }
        @keyframes slideInLeft { from { opacity: 0; transform: translateX(-60px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes slideInRight { from { opacity: 0; transform: translateX(60px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes fadeInDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
        .panel-left  { animation: slideInLeft 0.6s ease forwards; }
        .panel-right { animation: slideInRight 0.6s ease forwards; }
        .form-title  { opacity: 0; animation: fadeInDown 0.6s ease 0.3s forwards; }
        .form-field  { opacity: 0; animation: fadeInDown 0.5s ease forwards; }
        .form-field:nth-child(1) { animation-delay: 0.2s; }
        .form-field:nth-child(2) { animation-delay: 0.3s; }
        .form-field:nth-child(3) { animation-delay: 0.4s; }
        .form-field:nth-child(4) { animation-delay: 0.5s; }
        .form-field:nth-child(5) { animation-delay: 0.6s; }
        .form-btn  { opacity: 0; animation: fadeInDown 0.5s ease 0.7s forwards; }
        .form-link { opacity: 0; animation: fadeInDown 0.5s ease 0.8s forwards; }
      `}</style>

      {/* Video de fondo */}
      <video autoPlay loop muted playsInline style={{
        position: "absolute", top: 0, left: 0,
        width: "100%", height: "100%",
        objectFit: "cover", zIndex: 0,
      }}>
        <source src="/12220492_1920_1080_25fps.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div style={{
        position: "absolute", top: 0, left: 0,
        width: "100%", height: "100%",
        background: "rgba(0,0,0,0.50)", zIndex: 1,
      }} />

      {/* Panel izquierdo */}
      <div className="panel-left" style={{
        flex: 1, display: "flex", flexDirection: "column",
        justifyContent: "center", padding: "0 60px",
        position: "relative", zIndex: 2,
      }}>
        <h1 className="metallic-text" style={{
          fontSize: 52, fontWeight: 800,
          fontFamily: "'Orbitron', sans-serif",
          lineHeight: 1.4, textAlign: "left", margin: "0 0 20px",
        }}>
          Bienvenido<br />a EAGLE GAMING
        </h1>

        <p className="metallic-soft" style={{
          fontSize: 18, fontFamily: "'Roboto', sans-serif",
          fontWeight: 600, maxWidth: 480,
          lineHeight: 1.8, textAlign: "left", margin: 0,
        }}>
          Únete a Eagle Gaming y lleva tu negocio al siguiente nivel.
          Registra tu cuenta y accede a herramientas diseñadas para gestionar
          tu tienda de gaming de forma profesional y eficiente.
        </p>
      </div>

      {/* Panel derecho */}
      <div className="panel-right" style={{
        width: 420, display: "flex",
        alignItems: "center", justifyContent: "center",
        padding: "40px", background: "rgba(255,255,255,0.12)",
        backdropFilter: "blur(12px)", position: "relative", zIndex: 2,
      }}>
        <div style={{ width: "100%" }}>
          <h2 className="metallic-text form-title" style={{
            textAlign: "center", fontSize: 28,
            fontWeight: 600, marginBottom: 24,
            fontFamily: "'Orbitron', sans-serif",
          }}>
            Regístrate
          </h2>

          {error && (
            <p style={{ color: "#ff6b6b", fontSize: 13, marginBottom: 12, textAlign: "center" }}>
              {error}
            </p>
          )}

          {success && (
            <p style={{ color: "#6bffb8", fontSize: 13, marginBottom: 12, textAlign: "center" }}>
              ¡Cuenta creada! Redirigiendo al login...
            </p>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div className="form-field">
              <label className="metallic-soft" style={{ fontSize: 14, display: "block", marginBottom: 6, fontWeight: 600 }}>
                Nombre
              </label>
              <input type="text" name="nombre" placeholder="Juan"
                value={form.nombre} onChange={handleChange} style={inputStyle} />
            </div>

            <div className="form-field">
              <label className="metallic-soft" style={{ fontSize: 14, display: "block", marginBottom: 6, fontWeight: 600 }}>
                Apellido
              </label>
              <input type="text" name="apellido" placeholder="Pérez"
                value={form.apellido} onChange={handleChange} style={inputStyle} />
            </div>

            <div className="form-field">
              <label className="metallic-soft" style={{ fontSize: 14, display: "block", marginBottom: 6, fontWeight: 600 }}>
                Email
              </label>
              <input type="email" name="email" placeholder="correo@ejemplo.com"
                value={form.email} onChange={handleChange} style={inputStyle} />
            </div>

            <div className="form-field">
              <label className="metallic-soft" style={{ fontSize: 14, display: "block", marginBottom: 6, fontWeight: 600 }}>
                Contraseña
              </label>
              <input type="password" name="password" placeholder="••••••••"
                value={form.password} onChange={handleChange} style={inputStyle} />
            </div>

            <div className="form-field">
              <label className="metallic-soft" style={{ fontSize: 14, display: "block", marginBottom: 6, fontWeight: 600 }}>
                Confirmar contraseña
              </label>
              <input type="password" name="confirmPassword" placeholder="••••••••"
                value={form.confirmPassword} onChange={handleChange} style={inputStyle} />
            </div>

            <button className="form-btn" type="submit" style={{
              padding: "11px", borderRadius: 6, border: "none",
              background: "rgba(255,255,255,0.25)", color: "#fff",
              fontSize: 15, fontWeight: 600, cursor: "pointer", marginTop: 4,
            }}>
              Crear Cuenta
            </button>
          </form>

          <div className="form-link" style={{ marginTop: 16, textAlign: "center" }}>
            <Link to="/login" style={{ color: "#fff", fontSize: 13, textDecoration: "none", opacity: 0.85 }}>
              ¿Ya tienes cuenta? Inicia sesión
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;