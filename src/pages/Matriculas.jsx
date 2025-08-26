import { useState, useEffect, useContext } from "react";
import { getMatriculas, createMatricula, deleteMatricula, getEstudiantes, getMaterias } from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Matriculas.css";

const Matriculas = () => {
  const { user } = useContext(AuthContext);
  const [matriculas, setMatriculas] = useState([]);
  const [estudiantes, setEstudiantes] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [formData, setFormData] = useState({ estudiante: "", materias: [] });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [resMatriculas, resEstudiantes, resMaterias] = await Promise.all([
        getMatriculas(),
        getEstudiantes(),
        getMaterias()
      ]);
      setMatriculas(resMatriculas.data);
      setEstudiantes(resEstudiantes.data);
      setMaterias(resMaterias.data);
    } catch (err) {
      setMessage("Error al obtener datos");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "materias") {
      const options = Array.from(e.target.selectedOptions, option => option.value);
      setFormData({ ...formData, materias: options });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createMatricula(formData);
      setMessage("Matrícula registrada correctamente");
      setFormData({ estudiante: "", materias: [] });
      fetchData();
    } catch (err) {
      setMessage("Error al registrar matrícula");
    }
    setTimeout(() => setMessage(""), 3000);
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Deseas eliminar esta matrícula?")) {
      try {
        await deleteMatricula(id);
        setMessage("Matrícula eliminada correctamente");
        fetchData();
      } catch (err) {
        setMessage("Error al eliminar matrícula");
      }
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <div className="matriculas-container">
      <div className="header-top">
        <h2>Bienvenido, {user.nombre}</h2>
        <button className="btn-back" onClick={() => navigate("/dashboard")}>← Dashboard</button>
      </div>

      {message && <p className="message">{message}</p>}

      <div className="matriculas-card">
        <h3>Registrar Matrícula</h3>
        <form onSubmit={handleSubmit} className="matriculas-form">
          <label>Estudiante:</label>
          <select name="estudiante" value={formData.estudiante} onChange={handleChange} required>
            <option value="">Selecciona un estudiante</option>
            {estudiantes.map(e => (
              <option key={e._id} value={e._id}>{e.nombre} {e.apellido}</option>
            ))}
          </select>

          <label>Materias:</label>
          <select name="materias" multiple value={formData.materias} onChange={handleChange} required>
            {materias.map(m => (
              <option key={m._id} value={m._id}>{m.nombre} ({m.codigo})</option>
            ))}
          </select>

          <button type="submit" className="btn-add">Registrar Matrícula</button>
        </form>
      </div>

      <div className="matriculas-list">
        <h3>Lista de Matrículas</h3>
        <table>
          <thead>
            <tr>
              <th>Estudiante</th>
              <th>Materias</th>
              <th>Fecha Matrícula</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {matriculas.map(m => (
              <tr key={m._id}>
                <td>{m.estudiante?.nombre} {m.estudiante?.apellido}</td>
                <td>
                  {m.materiasInfo?.map(mat => `${mat.nombre} (${mat.codigo})`).join(", ")}
                </td>
                <td>{new Date(m.fechaMatricula).toLocaleDateString()}</td>
                <td>
                  <button className="btn-delete" onClick={() => handleDelete(m._id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Matriculas;
