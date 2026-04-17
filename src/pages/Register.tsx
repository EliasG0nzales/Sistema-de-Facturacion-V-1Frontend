import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";

const BG_URL =
  "https://meusetup.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBc1lCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--e3bd8690eec4098ef2cd9684d5a1f5733a92e47a/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDVG9MWm05eWJXRjBTU0lJYW5CbkJqb0dSVlE2RkhKbGMybDZaVjkwYjE5c2FXMXBkRnNIYVFLRUEya0NoQU02REdkeVlYWnBkSGxKSWc1VGIzVjBhRVZoYzNRR093WlVPZ2xrY21GM1NTSkRhVzFoWjJVZ1QzWmxjaUF3TERBZ01Dd3dJQ0l2WVhCd0wyeHBZaTloYzNObGRITXZhVzFoWjJWekwzQmhhV1F0ZDJGMFpYSnRZWEpyTG5CdVp5SUdPd1pVIiwiZXhwIjpudWxsLCJwdXIiOiJ2YXJpYXRpb24ifX0=--6fe9d9127ca19da894c96e3af1b288c8b1c292b6/0303.jpg";

interface RegisterForm {
  companyName: string;
  phone: string;
  email: string;
  address: string;
  province: string;
  district: string;
  acceptTerms: boolean;
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

const labelStyle: React.CSSProperties = {
  color: "#fff",
  fontSize: 14,
  display: "block",
  marginBottom: 6,
  fontWeight: 500,
};

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<RegisterForm>({
    companyName: "",
    phone: "",
    email: "",
    address: "",
    province: "",
    district: "",
    acceptTerms: false,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.companyName || !form.phone || !form.email || !form.address) {
      setError("Por favor completa todos los campos obligatorios.");
      return;
    }
    if (!form.acceptTerms) {
      setError("Debes aceptar los términos y condiciones.");
      return;
    }

    // Guardar usuario en localStorage (simulación)
    const users = JSON.parse(localStorage.getItem("eagle_users") || "[]");
    const exists = users.find((u: { email: string }) => u.email === form.email);
    if (exists) {
      setError("Este correo ya está registrado.");
      return;
    }
    users.push({ ...form, password: "1234" }); // contraseña por defecto o puedes agregar campo
    localStorage.setItem("eagle_users", JSON.stringify(users));

    setSuccess(true);
    setTimeout(() => navigate("/"), 2000);
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        backgroundImage: `url('${BG_URL}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Panel izquierdo */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 60px",
          color: "#fff",
        }}
      >
        <h1
          style={{
            fontSize: 48,
            fontWeight: 700,
            marginBottom: 16,
            lineHeight: 1.4,
            textAlign: "left", 
            textShadow: "none", 
          }}
    
        >
          Bienvenido
          <br />a EAGLE GAMING
        </h1>
        <p
          style={{
            fontSize: 14,
            maxWidth: 380,
            opacity: 0.85,
            lineHeight: 1.6,
          }}
        >
          Es un hecho bien establecido que un lector se distraerá con el
          contenido legible de una página al observar su diseño. El objetivo de
          usar esto es...
        </p>
      </div>

      {/* Panel derecho - formulario */}
      <div
        style={{
          width: 440,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px",
          background: "rgba(255,255,255,0.12)",
          backdropFilter: "blur(12px)",
          overflowY: "auto",
        }}
      >
        <div style={{ width: "100%" }}>
          <h2
            style={{
              color: "#fff",
              textAlign: "center",
              fontSize: 28,
              fontWeight: 600,
              marginBottom: 24,
            }}
          >
            Regístrate
          </h2>

          {error && (
            <p
              style={{
                color: "#ff6b6b",
                fontSize: 13,
                marginBottom: 12,
                textAlign: "center",
              }}
            >
              {error}
            </p>
          )}

          {success && (
            <p
              style={{
                color: "#6bffb8",
                fontSize: 13,
                marginBottom: 12,
                textAlign: "center",
              }}
            >
              ¡Cuenta creada exitosamente! Redirigiendo...
            </p>
          )}

          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: 14 }}
          >
            <div>
              <label style={labelStyle}>Nombre de la inmobiliaria *</label>
              <input
                type="text"
                name="companyName"
                placeholder="lauret"
                value={form.companyName}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Teléfono *</label>
              <input
                type="tel"
                name="phone"
                placeholder="lauret"
                value={form.phone}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Email *</label>
              <input
                type="email"
                name="email"
                placeholder="lauret"
                value={form.email}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Dirección *</label>
              <input
                type="text"
                name="address"
                placeholder="Av. 12 junio la miranda"
                value={form.address}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Provincia</label>
              <input
                type="text"
                name="province"
                value={form.province}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Distrito</label>
              <input
                type="text"
                name="district"
                value={form.district}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
              <input
                type="checkbox"
                id="acceptTerms"
                name="acceptTerms"
                checked={form.acceptTerms}
                onChange={handleChange}
                style={{ marginTop: 2 }}
              />
              <label
                htmlFor="acceptTerms"
                style={{ color: "#fff", fontSize: 13, lineHeight: 1.4 }}
              >
                Acepto mis datos personales para fines comerciales y/o
                publicitarios.
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
              Crear Cuenta
            </button>
          </form>

          <div style={{ marginTop: 16, textAlign: "center" }}>
            <Link
              to="/"
              style={{
                color: "#fff",
                fontSize: 13,
                textDecoration: "none",
                opacity: 0.85,
              }}
            >
              ¿Ya tienes cuenta? Inicia sesión
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;