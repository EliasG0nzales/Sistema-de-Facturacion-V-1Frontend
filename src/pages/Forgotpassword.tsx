import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

type Step = "find" | "method" | "verify" | "newPassword" | "done";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("find");
  const [contact, setContact] = useState("");
  const [method, setMethod] = useState<"email" | "phone">("email");
  const [codeInput, setCodeInput] = useState("");
  const [generatedCode] = useState(() => Math.floor(100000 + Math.random() * 900000).toString());
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [foundUser, setFoundUser] = useState<{ email: string; phone?: string } | null>(null);

  // Paso 1 — encontrar cuenta
  const handleFind = (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!contact.trim()) {
      setError("Por favor ingresa tu correo o número de celular.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("eagle_users") || "[]");
    const found = users.find(
      (u: { email: string; phone?: string }) =>
        u.email === contact || u.phone === contact
    );
    const isAdmin = contact === "admin@gmail.com";

    if (!found && !isAdmin) {
      setError("No encontramos una cuenta con ese dato.");
      return;
    }

    setFoundUser(found || { email: "admin@gmail.com" });
    setStep("method");
  };

  // Paso 2 — elegir método
  const handleMethod = () => {
    setError("");
    console.log(`Código de verificación generado: ${generatedCode}`);
    // En producción aquí llamarías a tu API para enviar el código
    setStep("verify");
  };

  // Paso 3 — verificar código
  const handleVerify = (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (codeInput !== generatedCode) {
      setError("Código incorrecto. Inténtalo de nuevo.");
      return;
    }

    setStep("newPassword");
  };

  // Paso 4 — nueva contraseña
  const handleNewPassword = (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (newPassword.length < 4) {
      setError("La contraseña debe tener al menos 4 caracteres.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    // Actualizar contraseña en localStorage
    const users = JSON.parse(localStorage.getItem("eagle_users") || "[]");
    const updated = users.map((u: { email: string; password: string }) =>
      u.email === foundUser?.email ? { ...u, password: newPassword } : u
    );
    localStorage.setItem("eagle_users", JSON.stringify(updated));

    setStep("done");
    setTimeout(() => navigate("/login"), 2500);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 16px",
    borderRadius: 6,
    border: "none",
    background: "rgba(255,255,255,0.9)",
    fontSize: 14,
    boxSizing: "border-box",
    color: "#333",
  };

  const btnStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px",
    borderRadius: 6,
    border: "none",
    background: "rgba(255,255,255,0.25)",
    color: "#fff",
    fontSize: 15,
    fontWeight: 600,
    cursor: "pointer",
  };

  return (
    <div style={{
      display: "flex",
      height: "100vh",
      width: "100vw",
      position: "relative",
      overflow: "hidden",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .forgot-card { animation: fadeInUp 0.5s ease forwards; }
        .method-btn {
          width: 100%;
          padding: 14px;
          border-radius: 8px;
          border: 2px solid rgba(255,255,255,0.3);
          background: rgba(255,255,255,0.1);
          color: #fff;
          fontSize: 14px;
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: left;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .method-btn:hover { background: rgba(255,255,255,0.2); }
        .method-btn.active { border-color: #fff; background: rgba(255,255,255,0.25); }
        .code-input {
          letter-spacing: 8px;
          font-size: 24px;
          text-align: center;
          font-weight: 700;
        }
      `}</style>

      {/* Video de fondo */}
      <video
        autoPlay loop muted playsInline
        style={{
          position: "absolute", top: 0, left: 0,
          width: "100%", height: "100%",
          objectFit: "cover", zIndex: 0,
        }}
      >
        <source src="/gamer.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div style={{
        position: "absolute", top: 0, left: 0,
        width: "100%", height: "100%",
        background: "rgba(0,0,0,0.55)", zIndex: 1,
      }} />

      {/* Card */}
      <div className="forgot-card" style={{
        width: 480,
        padding: "48px 40px",
        background: "rgba(255,255,255,0.12)",
        backdropFilter: "blur(12px)",
        borderRadius: 12,
        color: "#fff",
        textAlign: "center",
        position: "relative",
        zIndex: 2,
      }}>

        {/* PASO 1 — Encontrar cuenta */}
        {step === "find" && (
          <>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
            <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 8 }}>
              Encuentra tu cuenta
            </h2>
            <p style={{ fontSize: 14, opacity: 0.85, marginBottom: 28 }}>
              Ingresa tu correo electrónico o número de celular.
            </p>
            {error && <p style={{ color: "#ff6b6b", fontSize: 13, marginBottom: 12 }}>{error}</p>}
            <form onSubmit={handleFind} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <input
                type="text"
                placeholder="Correo o número de celular"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                style={inputStyle}
              />
              <button type="submit" style={btnStyle}>Buscar cuenta</button>
            </form>
            <div style={{ marginTop: 20 }}>
              <Link to="/login" style={{ color: "#fff", fontSize: 13, textDecoration: "none", opacity: 0.85 }}>
                ← Volver al inicio de sesión
              </Link>
            </div>
          </>
        )}

        {/* PASO 2 — Elegir método */}
        {step === "method" && (
          <>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🔐</div>
            <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 8 }}>
              Verificación de seguridad
            </h2>
            <p style={{ fontSize: 13, opacity: 0.85, marginBottom: 8 }}>
              Se está solicitando el restablecimiento de contraseña.
            </p>
            <p style={{ fontSize: 13, opacity: 0.7, marginBottom: 24 }}>
              Elige cómo recibir tu código de verificación:
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
              <button
                className={`method-btn ${method === "email" ? "active" : ""}`}
                onClick={() => setMethod("email")}
                style={{
                  width: "100%", padding: "14px", borderRadius: 8,
                  border: method === "email" ? "2px solid #fff" : "2px solid rgba(255,255,255,0.3)",
                  background: method === "email" ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.1)",
                  color: "#fff", fontSize: 14, cursor: "pointer",
                  textAlign: "left", display: "flex", alignItems: "center", gap: 12,
                }}
              >
                <span style={{ fontSize: 24 }}>📧</span>
                <div>
                  <p style={{ margin: 0, fontWeight: 600 }}>Correo electrónico</p>
                  <p style={{ margin: 0, fontSize: 12, opacity: 0.7 }}>{foundUser?.email}</p>
                </div>
              </button>

              <button
                onClick={() => setMethod("phone")}
                style={{
                  width: "100%", padding: "14px", borderRadius: 8,
                  border: method === "phone" ? "2px solid #fff" : "2px solid rgba(255,255,255,0.3)",
                  background: method === "phone" ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.1)",
                  color: "#fff", fontSize: 14, cursor: "pointer",
                  textAlign: "left", display: "flex", alignItems: "center", gap: 12,
                }}
              >
                <span style={{ fontSize: 24 }}>📱</span>
                <div>
                  <p style={{ margin: 0, fontWeight: 600 }}>Número de celular</p>
                  <p style={{ margin: 0, fontSize: 12, opacity: 0.7 }}>
                    {(foundUser as { phone?: string })?.phone || "No registrado"}
                  </p>
                </div>
              </button>
            </div>

            <button onClick={handleMethod} style={btnStyle}>
              Enviar código
            </button>

            {/* Mostrar código en consola para pruebas */}
            <p style={{ marginTop: 16, fontSize: 11, opacity: 0.5 }}>
              (Modo prueba: revisa la consola del navegador para ver el código)
            </p>
          </>
        )}

        {/* PASO 3 — Ingresar código */}
        {step === "verify" && (
          <>
            <div style={{ fontSize: 40, marginBottom: 12 }}>📨</div>
            <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 8 }}>
              Ingresa el código
            </h2>
            <p style={{ fontSize: 14, opacity: 0.85, marginBottom: 28 }}>
              Hemos enviado un código de 6 dígitos a tu{" "}
              {method === "email" ? "correo electrónico" : "número de celular"}.
            </p>
            {error && <p style={{ color: "#ff6b6b", fontSize: 13, marginBottom: 12 }}>{error}</p>}

            {/* Mostrar código para pruebas */}
            <div style={{
              background: "rgba(255,255,255,0.1)",
              borderRadius: 8, padding: "10px 16px",
              marginBottom: 20, fontSize: 13, opacity: 0.8,
            }}>
              Código de prueba: <strong style={{ letterSpacing: 4 }}>{generatedCode}</strong>
            </div>

            <form onSubmit={handleVerify} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <input
                type="text"
                placeholder="000000"
                value={codeInput}
                onChange={(e) => setCodeInput(e.target.value.replace(/\D/, "").slice(0, 6))}
                maxLength={6}
                style={{ ...inputStyle, letterSpacing: 8, fontSize: 24, textAlign: "center", fontWeight: 700 }}
              />
              <button type="submit" style={btnStyle}>Verificar código</button>
            </form>

            <button
              onClick={() => setStep("method")}
              style={{ marginTop: 14, background: "none", border: "none", color: "#fff", fontSize: 13, cursor: "pointer", opacity: 0.7 }}
            >
              ← Cambiar método
            </button>
          </>
        )}

        {/* PASO 4 — Nueva contraseña */}
        {step === "newPassword" && (
          <>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🔑</div>
            <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 8 }}>
              Nueva contraseña
            </h2>
            <p style={{ fontSize: 14, opacity: 0.85, marginBottom: 28 }}>
              Crea una nueva contraseña segura para tu cuenta.
            </p>
            {error && <p style={{ color: "#ff6b6b", fontSize: 13, marginBottom: 12 }}>{error}</p>}

            <form onSubmit={handleNewPassword} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ position: "relative" }}>
                <input
                  type={showNew ? "text" : "password"}
                  placeholder="Nueva contraseña"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  style={{ ...inputStyle, paddingRight: 44 }}
                />
                <button type="button" onClick={() => setShowNew(!showNew)} style={{
                  position: "absolute", right: 12, top: "50%",
                  transform: "translateY(-50%)", background: "none",
                  border: "none", cursor: "pointer", padding: 0,
                }}>
                  {showNew ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
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

              <div style={{ position: "relative" }}>
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirmar contraseña"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  style={{ ...inputStyle, paddingRight: 44 }}
                />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)} style={{
                  position: "absolute", right: 12, top: "50%",
                  transform: "translateY(-50%)", background: "none",
                  border: "none", cursor: "pointer", padding: 0,
                }}>
                  {showConfirm ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
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

              <button type="submit" style={btnStyle}>Cambiar contraseña</button>
            </form>
          </>
        )}

        {/* PASO 5 — Éxito */}
        {step === "done" && (
          <>
            <div style={{ fontSize: 56, marginBottom: 16 }}>✅</div>
            <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 12 }}>
              ¡Contraseña actualizada!
            </h2>
            <p style={{ fontSize: 14, opacity: 0.85, marginBottom: 28, lineHeight: 1.6 }}>
              Tu contraseña fue cambiada exitosamente.
              Serás redirigido al inicio de sesión en unos segundos.
            </p>
            <Link to="/login" style={{
              display: "inline-block", padding: "11px 28px",
              borderRadius: 6, background: "rgba(255,255,255,0.25)",
              color: "#fff", fontSize: 14, fontWeight: 600, textDecoration: "none",
            }}>
              Ir al login ahora
            </Link>
          </>
        )}

      </div>
    </div>
  );
};

export default ForgotPassword;