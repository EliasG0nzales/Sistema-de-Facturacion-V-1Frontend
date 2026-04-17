import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";

const BG_URL =
  "https://www.caseking.de/blog/wp-content/uploads/2025/08/AD_4nXd2eRvsZII7ieRqFrh7gm0zG9FdUyFye60kZNNvrEA8dmqkFQ8Ad_0Vo53dKuw9kcodhQMw1LXfEyvlTbiMjnv_0y9Gqac9t07f1z682I3d0afx9ydXKJ276w37rbnhypHs3OO2-Q.jpg";

interface RegisterForm {
  companyName: string;
  phone: string;
  email: string;
  address: string;
  province: string;
  district: string;
  password: string;
  confirmPassword: string;
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
    password: "",
    confirmPassword: "",
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

    if (
      !form.companyName ||
      !form.phone ||
      !form.email ||
      !form.address ||
      !form.password ||
      !form.confirmPassword
    ) {
      setError("Por favor completa todos los campos obligatorios.");
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

    if (!form.acceptTerms) {
      setError("Debes aceptar los términos y condiciones.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("eagle_users") || "[]");

    const exists = users.find(
      (u: { email: string }) => u.email.toLowerCase() === form.email.toLowerCase()
    );

    if (exists) {
      setError("Este correo ya está registrado.");
      return;
    }

    const newUser = {
      companyName: form.companyName,
      phone: form.phone,
      email: form.email,
      address: form.address,
      province: form.province,
      district: form.district,
      password: form.password,
      acceptTerms: form.acceptTerms,
    };

    users.push(newUser);
    localStorage.setItem("eagle_users", JSON.stringify(users));

    setSuccess(true);

    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100%",
        backgroundImage: `url('${BG_URL}')`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 60px",
          color: "#fff",
          background: "rgba(0,0,0,0.25)",
        }}
      >
        <h1
          style={{
            fontSize: 48,
            fontWeight: 700,
            marginBottom: 16,
            lineHeight: 1.2,
            textAlign: "left",
          }}
        >
          Bienvenido
          <br />
          a EAGLE GAMING
        </h1>

        <p
          style={{
            fontSize: 14,
            maxWidth: 380,
            opacity: 0.9,
            lineHeight: 1.6,
          }}
        >
          Crea tu cuenta para acceder a la plataforma y administrar tu panel de
          control.
        </p>
      </div>

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
              ¡Cuenta creada exitosamente! Redirigiendo al login...
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
                placeholder="987654321"
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
                placeholder="correo@empresa.com"
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

            <div>
              <label style={labelStyle}>Contraseña *</label>
              <input
                type="password"
                name="password"
                placeholder="Ingresa tu contraseña"
                value={form.password}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Confirmar contraseña *</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Repite tu contraseña"
                value={form.confirmPassword}
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