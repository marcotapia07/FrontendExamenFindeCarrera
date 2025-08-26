import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Bienvenido, {user.nombre}!</h1>
        <button className="btn-logout" onClick={logout}>Salir</button>
      </header>

      <div className="dashboard-cards">
        <div className="card" onClick={() => navigate("/estudiantes")}>
          <h2>Estudiantes</h2>
          <p>Gestiona los estudiantes del sistema</p>
        </div>

        <div className="card" onClick={() => navigate("/materias")}>
          <h2>Materias</h2>
          <p>Gestiona las materias disponibles</p>
        </div>

        <div className="card" onClick={() => navigate("/matriculas")}>
          <h2>Matriculas</h2>
          <p>Gestiona las matrículas de estudiantes</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
