import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";

const BG_URL =
  "https://meusetup.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBc1lCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--e3bd8690eec4098ef2cd9684d5a1f5733a92e47a/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDVG9MWm05eWJXRjBTU0lJYW5CbkJqb0dSVlE2RkhKbGMybDZaVjkwYjE5c2FXMXBkRnNIYVFLRUEya0NoQU02REdkeVlYWnBkSGxKSWc1VGIzVjBhRVZoYzNRR093WlVPZ2xrY21GM1NTSkRhVzFoWjJVZ1QzWmxjaUF3TERBZ01Dd3dJQ0l2WVhCd0wyeHBZaTloYzNObGRITXZhVzFoWjJWekwzQmhhV1F0ZDJGMFpYSnRZWEpyTG5CdVp5SUdPd1pVIiwiZXhwIjpudWxsLCJwdXIiOiJ2YXJpYXRpb24ifX0=--6fe9d9127ca19da894c96e3af1b288c8b1c292b6/0303.jpg";

const ForgotPassword = () => {
  const [contact, setContact] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!contact.trim()) {
      setError("Por favor ingresa tu correo o número de celular.");
      return;
    }

    // Simulación: verificar si el correo existe en localStorage
    const users = JSON.parse(localStorage.getItem("eagle_users") || "[]");
    const hardcoded = contact === "admin@gmail.com";
    const found = users.find(
      (u: { email: string; phone: string }) =>
        u.email === contact || u.phone === contact
    );

    if (!hardcoded && !found) {
      setError("No encontramos una cuenta con ese correo o teléfono.");
      return;
    }

    // En un proyecto real aquí llamarías a tu API para enviar el correo
    setSent(true);
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        backgroundImage: `url('${BG_URL}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: 480,
          padding: "48px 40px",
          background: "rgba(255,255,255,0.12)",
          backdropFilter: "blur(12px)",
          borderRadius: 12,
          color: "#fff",
          textAlign: "center",
        }}
      >
        {!sent ? (
          <>
            <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12 }}>
              Encuentra tu cuenta
            </h2>
            <p style={{ fontSize: 14, opacity: 0.85, marginBottom: 28 }}>
              Ingresa tu número de celular o correo electrónico.
            </p>

            {error && (
              <p
                style={{
                  color: "#ff6b6b",
                  fontSize: 13,
                  marginBottom: 16,
                }}
              >
                {error}
              </p>
            )}

            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: 16 }}
            >
              <input
                type="text"
                placeholder="Número de celular o correo electrónico"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: 6,
                  border: "none",
                  background: "rgba(255,255,255,0.9)",
                  fontSize: 14,
                  boxSizing: "border-box",
                  color: "#333",
                  textAlign: "left",
                }}
              />

              <button
                type="submit"
                style={{
                  padding: "12px",
                  borderRadius: 6,
                  border: "none",
                  background: "rgba(255,255,255,0.25)",
                  color: "#fff",
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Continuar
              </button>
            </form>

            <div style={{ marginTop: 20 }}>
              <Link
                to="/"
                style={{
                  color: "#fff",
                  fontSize: 13,
                  textDecoration: "none",
                  opacity: 0.85,
                }}
              >
                ← Volver al inicio de sesión
              </Link>
            </div>
          </>
        ) : (
          <>
            <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
            <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>
              Correo enviado
            </h2>
            <p style={{ fontSize: 14, opacity: 0.85, marginBottom: 28, lineHeight: 1.6 }}>
              Hemos enviado un enlace de recuperación a{" "}
              <strong>{contact}</strong>. Revisa tu bandeja de entrada y sigue
              las instrucciones para restablecer tu contraseña.
            </p>
            <Link
              to="/"
              style={{
                display: "inline-block",
                padding: "11px 28px",
                borderRadius: 6,
                background: "rgba(255,255,255,0.25)",
                color: "#fff",
                fontSize: 14,
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Volver al inicio de sesión
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;