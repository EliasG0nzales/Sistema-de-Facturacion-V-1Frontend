import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <header>
        <h1>POS - Sistema de Facturación</h1>
        <span>Bienvenido, {user?.username}</span>
        <button onClick={handleLogout}>Cerrar sesión</button>
      </header>
      <main>
        <p>Contenido del dashboard aquí</p>
      </main>
    </div>
  );
};

export default Dashboard;