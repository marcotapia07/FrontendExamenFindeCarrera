import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Materias from "../pages/Materias";
import Estudiantes from "../pages/Estudiantes";
import Matriculas from "../pages/Matriculas"; // <-- nueva página

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/" />;
  return children;
};

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/materias" element={<ProtectedRoute><Materias /></ProtectedRoute>} />
      <Route path="/estudiantes" element={<ProtectedRoute><Estudiantes /></ProtectedRoute>} />
      <Route path="/matriculas" element={<ProtectedRoute><Matriculas /></ProtectedRoute>} /> {/* <-- ruta agregada */}
    </Routes>
  </Router>
);

export default AppRoutes;
