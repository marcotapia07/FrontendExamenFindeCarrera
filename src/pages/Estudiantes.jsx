import { useState, useEffect, useContext } from "react";
import { getEstudiantes, createEstudiante, updateEstudiante, deleteEstudiante } from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Estudiantes.css";

const Estudiantes = () => {
  const { user } = useContext(AuthContext);
  const [estudiantes, setEstudiantes] = useState([]);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    cedula: "",
    telefono: "",
    email: ""
  });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchEstudiantes();
  }, []);

  const fetchEstudiantes = async () => {
    try {
      const res = await getEstudiantes();
      setEstudiantes(res.data);
    } catch {
      setMessage("Error al obtener estudiantes");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "cedula") {
      const soloDigitos = value.replace(/\D/g, "").slice(0, 10);
      setFormData((prev) => ({ ...prev, cedula: soloDigitos }));
      return;
    }

    if (name === "telefono") {
      const soloDigitos = value.replace(/\D/g, "");
      setFormData((prev) => ({ ...prev, telefono: soloDigitos }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateEstudiante(editingId, formData);
        setMessage("Estudiante actualizado correctamente");
        setEditingId(null);
      } else {
        await createEstudiante(formData);
        setMessage("Estudiante agregado correctamente");
      }
      setFormData({ nombre: "", apellido: "", cedula: "", telefono: "", email: "" });
      fetchEstudiantes();
    } catch {
      setMessage("Error al guardar el estudiante");
    } finally {
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleEdit = (est) => {
    setEditingId(est._id);
    setFormData({
      nombre: est.nombre || "",
      apellido: est.apellido || "",
      cedula: est.cedula || "",
      telefono: est.telefono || "",
      email: est.email || ""
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Deseas eliminar este estudiante?")) {
      try {
        await deleteEstudiante(id);
        setMessage("Estudiante eliminado correctamente");
        fetchEstudiantes();
      } catch {
        setMessage("Error al eliminar el estudiante");
      } finally {
        setTimeout(() => setMessage(""), 3000);
      }
    }
  };

  return (
    <div className="estudiantes-container">
      <div className="header-top">
        <h2>Bienvenido, {user.nombre}</h2>
        <button className="btn-back" onClick={() => navigate("/dashboard")}>← Dashboard</button>
      </div>

      {message && <p className="message">{message}</p>}

      <div className="estudiantes-card">
        <h3>{editingId ? "Editar Estudiante" : "Agregar Estudiante"}</h3>

        <form onSubmit={handleSubmit} className="estudiantes-form">
          <label>Nombre</label>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />

          <label>Apellido</label>
          <input
            type="text"
            name="apellido"
            placeholder="Apellido"
            value={formData.apellido}
            onChange={handleChange}
            required
          />

          <label>Cédula</label>
          <input
            type="text"
            name="cedula"
            placeholder="Cédula (10 dígitos)"
            value={formData.cedula}
            onChange={handleChange}
            maxLength={10}
            inputMode="numeric"
            pattern="\d{10}"
            title="Debe contener exactamente 10 dígitos"
            required
          />

          <label>Teléfono</label>
          <input
            type="text"
            name="telefono"
            placeholder="Teléfono"
            value={formData.telefono}
            onChange={handleChange}
            inputMode="numeric"
            required
          />

          <label>Correo</label>
          <input
            type="email"           
            name="email"
            placeholder="correo@dominio.com"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <button type="submit" className="btn-add">
            {editingId ? "Actualizar" : "Agregar"}
          </button>
        </form>
      </div>

      <div className="estudiantes-list">
        <h3>Lista de Estudiantes</h3>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Cédula</th>
              <th>Teléfono</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {estudiantes.map((e) => (
              <tr key={e._id}>
                <td>{e.nombre}</td>
                <td>{e.apellido}</td>
                <td>{e.cedula}</td>
                <td>{e.telefono}</td>
                <td>
                  <button className="btn-edit" onClick={() => handleEdit(e)}>Editar</button>
                  <button className="btn-delete" onClick={() => handleDelete(e._id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Estudiantes;
