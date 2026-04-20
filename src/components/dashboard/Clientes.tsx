import { useState, useMemo } from "react";

// ── Tipos ──────────────────────────────────────────────────────────────────
interface Cliente {
  id: number;
  nombre: string;
  historial: string;
  ultimaActividad: string;
}

interface UbigeoEntry {
  distrito: string;
  provincia: string;
  departamento: string;
  codigo: string;
}

// ── Datos ubigeo ───────────────────────────────────────────────────────────
const RAW_UBIGEO = `Chachapoyas,Chachapoyas,Amazonas,010101
Asunción,Chachapoyas,Amazonas,010102
Balsas,Chachapoyas,Amazonas,010103
Cheto,Chachapoyas,Amazonas,010104
Chiliquin,Chachapoyas,Amazonas,010105
Chuquibamba,Chachapoyas,Amazonas,010106
Granada,Chachapoyas,Amazonas,010107
Huancas,Chachapoyas,Amazonas,010108
La Jalca,Chachapoyas,Amazonas,010109
Leimebamba,Chachapoyas,Amazonas,010110
Levanto,Chachapoyas,Amazonas,010111
Magdalena,Chachapoyas,Amazonas,010112
Mariscal Castilla,Chachapoyas,Amazonas,010113
Molinopampa,Chachapoyas,Amazonas,010114
Montevideo,Chachapoyas,Amazonas,010115
Olleros,Chachapoyas,Amazonas,010116
Quinjalca,Chachapoyas,Amazonas,010117
San Francisco de Daguas,Chachapoyas,Amazonas,010118
San Isidro de Maino,Chachapoyas,Amazonas,010119
Soloco,Chachapoyas,Amazonas,010120
Sonche,Chachapoyas,Amazonas,010121
Bagua,Bagua,Amazonas,010201
Aramango,Bagua,Amazonas,010202
Copallin,Bagua,Amazonas,010203
El Parco,Bagua,Amazonas,010204
Imaza,Bagua,Amazonas,010205
La Peca,Bagua,Amazonas,010206
Lima,Lima,Lima,150101
Ancón,Lima,Lima,150102
Ate,Lima,Lima,150103
Barranco,Lima,Lima,150104
Breña,Lima,Lima,150105
Carabayllo,Lima,Lima,150106
Miraflores,Lima,Lima,150122
San Borja,Lima,Lima,150130
San Isidro,Lima,Lima,150131
San Juan de Lurigancho,Lima,Lima,150132
San Martín de Porres,Lima,Lima,150135
Santiago de Surco,Lima,Lima,150140
Arequipa,Arequipa,Arequipa,040101
Cayma,Arequipa,Arequipa,040103
Cerro Colorado,Arequipa,Arequipa,040104
Yanahuara,Arequipa,Arequipa,040126
Cusco,Cusco,Cusco,080101
San Jerónimo,Cusco,Cusco,080104
Wanchaq,Cusco,Cusco,080108
Chiclayo,Chiclayo,Lambayeque,140101
Trujillo,Trujillo,La Libertad,130101
Piura,Piura,Piura,200101
Iquitos,Maynas,Loreto,160101
Tacna,Tacna,Tacna,230101
Puno,Puno,Puno,210101
Huancayo,Huancayo,Junín,120101
Ayacucho,Huamanga,Ayacucho,050101
Cajamarca,Cajamarca,Cajamarca,060101
Huaraz,Huaraz,Áncash,020101
Abancay,Abancay,Apurímac,030101
Huancavelica,Huancavelica,Huancavelica,090101
Huanuco,Huánuco,Huánuco,100101
Ica,Ica,Ica,110101
Callao,Prov. Const. del Callao,Callao,070101
Tarapoto,San Martín,San Martín,220901
Moyobamba,Moyobamba,San Martín,220101
Moquegua,Mariscal Nieto,Moquegua,180101
Pasco,Pasco,Pasco,190101`;

const ubigeoData: UbigeoEntry[] = RAW_UBIGEO.trim().split("\n").map((line) => {
  const parts = line.split(",");
  return {
    distrito: parts[0].trim(),
    provincia: parts[1].trim(),
    departamento: parts[2].trim(),
    codigo: parts[3].trim(),
  };
});

// ── Tipos de documento ─────────────────────────────────────────────────────
const TIPOS_DOC = [
  { code: "RUC", label: "RUC - Registro único de contribuyente" },
  { code: "DNI", label: "DNI - Documento nacional de identidad" },
  { code: "PP", label: "PP - Pasaporte" },
  { code: "CE", label: "CE - Carnet de extranjería" },
  { code: "SIN_RUC", label: "SIN RUC - No domiciliado sin RUC" },
  { code: "CDI", label: "CDI - Cédula diplomática de identidad" },
  { code: "DIP", label: "DIP - Documento de identidad país residencia - No domiciliado" },
  { code: "TIN", label: "TIN - Tax Identification Number - Doc Trib PP.NN" },
  { code: "IN", label: "IN - Identification Number - Doc Trib PP.JJ" },
  { code: "PTP", label: "PTP - Permiso Temporal de permanencia" },
  { code: "SC", label: "SC - Salvoconducto" },
];

// ── Estilos reutilizables ──────────────────────────────────────────────────
const inputBase: React.CSSProperties = {
  width: "100%", padding: "8px 12px",
  border: "1px solid #d1d5db", borderRadius: 6,
  fontSize: 14, color: "#333", background: "#fff",
  outline: "none", boxSizing: "border-box",
};
const inputError: React.CSSProperties = { ...inputBase, border: "1.5px solid #e05a7a" };
const labelBase: React.CSSProperties = { fontSize: 13, fontWeight: 500, color: "#374151", marginBottom: 4, display: "block", textAlign: "left" };
const selectBase: React.CSSProperties = {
  ...inputBase, appearance: "none", cursor: "pointer", paddingRight: 32,
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23888' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
  backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center",
};

// ── Sección colapsable ─────────────────────────────────────────────────────
const Section = ({
  title, subtitle, open, onToggle, children,
}: {
  title: string; subtitle: string; open: boolean; onToggle: () => void; children: React.ReactNode;
}) => (
  <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, marginBottom: 12, overflow: "hidden" }}>
    <div
      onClick={onToggle}
      style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "16px 20px", cursor: "pointer", userSelect: "none" }}
    >
      <div style={{ textAlign: "left" }}>
        <p style={{ margin: 0, fontWeight: 500, fontSize: 15, color: "#111827", textAlign: "left" }}>{title}</p>
        <p style={{ margin: "2px 0 0", fontSize: 13, color: "#6b7280", textAlign: "left" }}>{subtitle}</p>
      </div>
      <span style={{ fontSize: 18, color: "#6b7280", marginTop: 2 }}>{open ? "∧" : "∨"}</span>
    </div>
    {open && <div style={{ padding: "0 20px 20px" }}>{children}</div>}
  </div>
);

// ── NuevoCliente ───────────────────────────────────────────────────────────
const NuevoCliente = ({ onVolver }: { onVolver: () => void }) => {
  const [secDatos, setSecDatos] = useState(true);
  const [secVenta, setSecVenta] = useState(false);
  const [secContable, setSecContable] = useState(false);

  const [identificacion, setIdentificacion] = useState("");
  const [tipoDoc, setTipoDoc] = useState("");
  const [nombre, setNombre] = useState("");
  const [ubigeo, setUbigeo] = useState("");
  const [ubigeoSearch, setUbigeoSearch] = useState("");
  const [ubigeoOpen, setUbigeoOpen] = useState(false);
  const [urbanizacion, setUrbanizacion] = useState("");
  const [direccion, setDireccion] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [celulares, setCelulares] = useState([""]);
  const [listaPrecio, setListaPrecio] = useState("");
  const [plazoPago, setPlazoPago] = useState("De contado");
  const [vendedor, setVendedor] = useState("");
  const [incluirEstado, setIncluirEstado] = useState(false);
  const [cuentaCobrar, setCuentaCobrar] = useState("Cuentas por cobrar clientes");
  const [submitted, setSubmitted] = useState(false);

  const ubigeoFiltrado = useMemo(() => {
    const q = ubigeoSearch.toLowerCase();
    if (!q) return ubigeoData.slice(0, 50);
    return ubigeoData.filter(
      (u) =>
        u.distrito.toLowerCase().includes(q) ||
        u.provincia.toLowerCase().includes(q) ||
        u.departamento.toLowerCase().includes(q) ||
        u.codigo.includes(q)
    );
  }, [ubigeoSearch]);

  const avatarLetra = nombre ? nombre[0].toUpperCase() : "A";

  const handleGuardar = () => {
    setSubmitted(true);
    if (!identificacion || !nombre) return;
    alert("Cliente guardado correctamente");
  };

  return (
    <div style={{ height: "100vh", overflowY: "auto", background: "#f3f4f6", padding: "24px 32px", fontFamily: "sans-serif", boxSizing: "border-box", textAlign: "left" }}>
      <div style={{ fontSize: 13, color: "#14b8a6", marginBottom: 6, cursor: "pointer", textAlign: "left" }} onClick={onVolver}>
        ‹ CLiente
      </div>
      <h1 style={{ margin: "0 0 20px", fontSize: 22, fontWeight: 600, color: "#111827", textAlign: "left" }}>Nuevo cliente</h1>

      <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
        {/* Formulario */}
        <div style={{ flex: 1, minWidth: 0 }}>

          <Section title="Datos generales" subtitle="Ingresa la información principal de tu cliente" open={secDatos} onToggle={() => setSecDatos(!secDatos)}>
            {/* Identificación + Tipo */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
              <div>
                <label style={labelBase}>Identificación <span style={{ color: "#e05a7a" }}>*</span></label>
                <input style={submitted && !identificacion ? inputError : inputBase} value={identificacion} onChange={(e) => setIdentificacion(e.target.value)} />
                {submitted && !identificacion && <p style={{ fontSize: 12, color: "#e05a7a", margin: "4px 0 0" }}>Ingresa una identificación</p>}
              </div>
              <div>
                <label style={labelBase}>Tipo de identificación <span style={{ color: "#e05a7a" }}>*</span></label>
                <select style={selectBase} value={tipoDoc} onChange={(e) => setTipoDoc(e.target.value)}>
                  <option value="">Seleccionar</option>
                  {TIPOS_DOC.map((t) => <option key={t.code} value={t.code}>{t.label}</option>)}
                </select>
              </div>
            </div>

            {/* Nombre */}
            <div style={{ marginBottom: 16 }}>
              <label style={labelBase}>Nombre <span style={{ color: "#e05a7a" }}>*</span></label>
              <input style={submitted && !nombre ? inputError : inputBase} placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
              {submitted && !nombre && <p style={{ fontSize: 12, color: "#e05a7a", margin: "4px 0 0" }}>Debes indicar el nombre de tu cliente</p>}
            </div>

            {/* Ubigeo */}
            <div style={{ marginBottom: 16, position: "relative" }}>
              <label style={labelBase}>Distrito / Provincia / Departamento / Código ubigeo</label>
              <div
                onClick={() => setUbigeoOpen(!ubigeoOpen)}
                style={{ ...inputBase, display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", color: ubigeo ? "#333" : "#9ca3af" }}
              >
                <span style={{ fontSize: 14 }}>{ubigeo || "Seleccionar"}</span>
                <span style={{ fontSize: 12, color: "#888" }}>{ubigeoOpen ? "∧" : "∨"}</span>
              </div>
              {ubigeoOpen && (
                <div style={{ position: "absolute", top: "100%", left: 0, right: 0, background: "#fff", border: "1px solid #d1d5db", borderRadius: 6, zIndex: 100, maxHeight: 220, overflowY: "auto", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
                  <div style={{ padding: "8px 10px", borderBottom: "1px solid #f0f0f0" }}>
                    <input
                      autoFocus
                      style={{ ...inputBase, padding: "6px 10px" }}
                      placeholder="Buscar distrito, provincia..."
                      value={ubigeoSearch}
                      onChange={(e) => setUbigeoSearch(e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                  {ubigeoFiltrado.map((u) => (
                    <div
                      key={u.codigo}
                      style={{ padding: "8px 14px", cursor: "pointer", fontSize: 13, color: "#374151", borderBottom: "1px solid #f9f9f9" }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#f0fdf4")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "")}
                      onClick={() => { setUbigeo(`${u.distrito} / ${u.provincia} / ${u.departamento} / ${u.codigo}`); setUbigeoOpen(false); setUbigeoSearch(""); }}
                    >
                      {u.distrito} / {u.provincia} / {u.departamento} <span style={{ color: "#9ca3af" }}>— {u.codigo}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Urbanización + Dirección */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
              <div>
                <label style={labelBase}>Urbanización</label>
                <input style={inputBase} value={urbanizacion} onChange={(e) => setUrbanizacion(e.target.value)} />
              </div>
              <div>
                <label style={labelBase}>Dirección</label>
                <input style={inputBase} value={direccion} onChange={(e) => setDireccion(e.target.value)} />
              </div>
            </div>

            {/* Correo + Teléfono */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
              <div>
                <label style={labelBase}>Correo</label>
                <input style={inputBase} type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} />
              </div>
              <div>
                <label style={labelBase}>Teléfono</label>
                <input style={inputBase} value={telefono} onChange={(e) => setTelefono(e.target.value)} />
              </div>
            </div>

            {/* Celulares */}
            <div>
              <label style={labelBase}>Celular</label>
              {celulares.map((cel, i) => (
                <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8, alignItems: "center" }}>
                  <input style={{ ...inputBase, flex: 1 }} value={cel} onChange={(e) => { const a = [...celulares]; a[i] = e.target.value; setCelulares(a); }} />
                  {celulares.length > 1 && (
                    <button onClick={() => setCelulares(celulares.filter((_, idx) => idx !== i))} style={{ background: "none", border: "none", fontSize: 20, color: "#9ca3af", cursor: "pointer", padding: "0 4px" }}>−</button>
                  )}
                  {i === celulares.length - 1 && (
                    <button onClick={() => setCelulares([...celulares, ""])} style={{ background: "none", border: "none", fontSize: 20, color: "#14b8a6", cursor: "pointer", padding: "0 4px" }}>+</button>
                  )}
                </div>
              ))}
            </div>
          </Section>

          <Section title="Información de venta" subtitle="Configura las condiciones de venta para tu cliente, como vendedor y plazo de pago" open={secVenta} onToggle={() => setSecVenta(!secVenta)}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
              <div>
                <label style={labelBase}>Lista de precio</label>
                <select style={selectBase} value={listaPrecio} onChange={(e) => setListaPrecio(e.target.value)}>
                  <option value="">Seleccionar</option>
                  <option value="lista1">Lista 1</option>
                  <option value="lista2">Lista 2</option>
                </select>
              </div>
              <div>
                <label style={labelBase}>Plazo de pago</label>
                <select style={selectBase} value={plazoPago} onChange={(e) => setPlazoPago(e.target.value)}>
                  <option value="De contado">De contado</option>
                  <option value="15 días">15 días</option>
                  <option value="30 días">30 días</option>
                  <option value="45 días">45 días</option>
                  <option value="60 días">60 días</option>
                </select>
              </div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={labelBase}>Vendedor</label>
              <select style={{ ...selectBase, maxWidth: "50%" }} value={vendedor} onChange={(e) => setVendedor(e.target.value)}>
                <option value="">Seleccionar</option>
                <option value="vendedor1">Vendedor 1</option>
                <option value="vendedor2">Vendedor 2</option>
              </select>
            </div>
            <label style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13, color: "#374151", cursor: "pointer", padding: "12px 14px", border: "1px solid #e5e7eb", borderRadius: 8 }}>
              <input type="checkbox" checked={incluirEstado} onChange={(e) => setIncluirEstado(e.target.checked)} style={{ marginTop: 2 }} />
              <div>
                <p style={{ margin: 0, fontWeight: 500 }}>Incluir estado de cuenta</p>
                <p style={{ margin: "2px 0 0", color: "#6b7280", fontSize: 12 }}>Al enviar una factura al correo, esta irá acompañada del resumen de todas sus facturas</p>
              </div>
            </label>
          </Section>

          <Section title="Configuración contable" subtitle="Elige la cuenta contable en la que se registrarán las cuentas por cobrar de tus ventas a crédito" open={secContable} onToggle={() => setSecContable(!secContable)}>
            <div>
              <label style={labelBase}>Cuenta por cobrar</label>
              <select style={{ ...selectBase, borderColor: "#14b8a6" }} value={cuentaCobrar} onChange={(e) => setCuentaCobrar(e.target.value)}>
                <option value="Cuentas por cobrar clientes">Cuentas por cobrar clientes</option>
                <option value="Cuentas por cobrar exportación">Cuentas por cobrar exportación</option>
              </select>
            </div>
          </Section>
        </div>

        {/* Panel lateral */}
        <div style={{ width: 280, background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "32px 24px 24px", flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          <div style={{ width: 96, height: 96, borderRadius: "50%", background: "#e5e7eb", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40, fontWeight: 500, color: "#6b7280" }}>
            {avatarLetra}
          </div>
          <p style={{ margin: 0, fontSize: 15, color: "#374151", fontWeight: 500, textAlign: "center" }}>
            {nombre || "Nombre del cliente"}
          </p>
          <div style={{ display: "flex", gap: 10, width: "100%", marginTop: 8 }}>
            <button onClick={onVolver} style={{ flex: 1, padding: "9px 0", border: "1px solid #d1d5db", borderRadius: 6, background: "#fff", color: "#374151", fontSize: 14, cursor: "pointer", fontWeight: 500 }}>
              Cancelar
            </button>
            <button onClick={handleGuardar} style={{ flex: 2, padding: "9px 0", border: "none", borderRadius: 6, background: "#99d6cf", color: "#fff", fontSize: 14, cursor: "pointer", fontWeight: 500 }}>
              Guardar contacto →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Datos de ejemplo ───────────────────────────────────────────────────────
const clientesEjemplo: Cliente[] = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  nombre: "Nombre de usuario",
  historial: "Historial de compras",
  ultimaActividad: "Última fecha de actividad",
}));

const clientesMasActivos = clientesEjemplo.slice(0, 3);

// ── Clientes (componente principal) ───────────────────────────────────────
const Clientes = () => {
  const [busqueda, setBusqueda] = useState("");
  const [mostrarNuevo, setMostrarNuevo] = useState(false);

  if (mostrarNuevo) {
    return <NuevoCliente onVolver={() => setMostrarNuevo(false)} />;
  }

  const clientesFiltrados = clientesEjemplo.filter((c) =>
    c.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", fontFamily: "sans-serif" }}>
      <div style={{ background: "#888", padding: "12px 24px" }}>
        <h2 style={{ margin: 0, fontSize: 18, fontWeight: 500, color: "#fff" }}>Clientes</h2>
      </div>

      <div style={{ padding: "16px 24px 12px", background: "#f0f0f0" }}>
        <p style={{ margin: "0 0 10px", fontSize: 13, color: "#999", fontStyle: "italic" }}>
          Insertar texto cool y motivacional...
        </p>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <input
            type="text"
            placeholder="Buscar por nombre"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            style={{ flex: 1, padding: "8px 16px", borderRadius: 20, border: "1px solid #ccc", fontSize: 13, background: "#fff", outline: "none", color: "#333" }}
          />
          <button
            onClick={() => setMostrarNuevo(true)}
            style={{ padding: "8px 18px", borderRadius: 20, border: "none", background: "#555", color: "#fff", fontSize: 13, fontWeight: 500, cursor: "pointer", whiteSpace: "nowrap" }}
          >
            + Cliente
          </button>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "16px 24px", background: "#f0f0f0", display: "flex", gap: 32, alignItems: "flex-start" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 14 }}>
          {clientesFiltrados.map((c) => (
            <div key={c.id} style={{ background: "#fff", borderRadius: 10, padding: "12px 16px", display: "flex", gap: 16, alignItems: "flex-start", border: "1px solid #ddd" }}>
              <div style={{ width: 90, height: 90, background: "#ccc", borderRadius: 8, flexShrink: 0, border: "1px solid #bbb" }} />
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 500, fontSize: 14, margin: "0 0 8px", color: "#333" }}>{c.nombre}</p>
                <div style={{ border: "1px solid #ccc", borderRadius: 20, padding: "6px 14px", fontSize: 13, color: "#666", marginBottom: 6 }}>{c.historial}</div>
                <div style={{ border: "1px solid #ccc", borderRadius: 20, padding: "6px 14px", fontSize: 13, color: "#666" }}>{c.ultimaActividad}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ width: 300, background: "#e8e8e8", borderRadius: 12, padding: "18px 20px", display: "flex", flexDirection: "column", gap: 18, flexShrink: 0, border: "1px solid #d5d5d5" }}>
          <h3 style={{ margin: 0, fontSize: 15, fontWeight: 500, color: "#444" }}>Clientes más activos</h3>
          {clientesMasActivos.map((c) => (
            <div key={c.id} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
              <div style={{ width: 72, height: 72, background: "#bbb", borderRadius: 8, flexShrink: 0, border: "1px solid #aaa" }} />
              <div>
                <p style={{ fontWeight: 500, fontSize: 14, margin: "0 0 5px", color: "#222" }}>{c.nombre}</p>
                <p style={{ fontSize: 13, margin: "0 0 3px", color: "#3366cc", cursor: "pointer" }}>Historial de compras</p>
                <p style={{ fontSize: 13, margin: 0, color: "#3366cc", cursor: "pointer" }}>Ver actividad</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Clientes;