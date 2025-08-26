import { useState, useEffect, useContext } from "react";
import { getMaterias, createMateria, updateMateria, deleteMateria } from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Materias.css";

const Materias = () => {
  const { user } = useContext(AuthContext);
  const [materias, setMaterias] = useState([]);
  const [formData, setFormData] = useState({
    nombre: "",
    codigo: "",
    descripcion: "",
    creditos: ""
  });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchMaterias();
  }, []);

  const fetchMaterias = async () => {
    try {
      const res = await getMaterias();
      setMaterias(res.data);
    } catch {
      setMessage("Error al obtener materias");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validación de descripción: máximo 50 caracteres
    if (name === "descripcion" && value.length > 50) return;

    // Validación de créditos: entre 1 y 10
    if (name === "creditos") {
      if (value === "" || (Number(value) >= 1 && Number(value) <= 10)) {
        setFormData((prev) => ({ ...prev, creditos: value }));
      }
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateMateria(editingId, formData);
        setMessage("Materia actualizada correctamente");
        setEditingId(null);
      } else {
        await createMateria(formData);
        setMessage("Materia agregada correctamente");
      }
      setFormData({ nombre: "", codigo: "", descripcion: "", creditos: "" });
      fetchMaterias();
    } catch {
      setMessage("Error al guardar la materia");
    } finally {
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleEdit = (mat) => {
    setEditingId(mat._id);
    setFormData({
      nombre: mat.nombre || "",
      codigo: mat.codigo || "",
      descripcion: mat.descripcion || "",
      creditos: mat.creditos || ""
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Deseas eliminar esta materia?")) {
      try {
        await deleteMateria(id);
        setMessage("Materia eliminada correctamente");
        fetchMaterias();
      } catch {
        setMessage("Error al eliminar la materia");
      } finally {
        setTimeout(() => setMessage(""), 3000);
      }
    }
  };

  return (
    <div className="materias-container">
      <div className="header-top">
        <h2>Bienvenido, {user.nombre}</h2>
        <button className="btn-back" onClick={() => navigate("/dashboard")}>← Dashboard</button>
      </div>

      {message && <p className="message">{message}</p>}

      <div className="materias-card">
        <h3>{editingId ? "Editar Materia" : "Agregar Materia"}</h3>

        <form onSubmit={handleSubmit} className="materias-form">
          <label>Nombre</label>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />

          <label>Código</label>
          <input
            type="text"
            name="codigo"
            placeholder="Código"
            value={formData.codigo}
            onChange={handleChange}
            required
          />

          <label>Descripción</label>
          <input
            type="text"
            name="descripcion"
            placeholder="Máximo 50 caracteres"
            value={formData.descripcion}
            onChange={handleChange}
            maxLength={50} // Bloqueo adicional en el input
          />
          

          <label>Créditos</label>
          <input
            type="number"
            name="creditos"
            placeholder="1 - 10"
            value={formData.creditos}
            onChange={handleChange}
            min="1"
            max="10"
            required
          />

          <button type="submit" className="btn-add">
            {editingId ? "Actualizar" : "Agregar"}
          </button>
        </form>
      </div>

      <div className="materias-list">
        <h3>Lista de Materias</h3>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Código</th>
              <th>Descripción</th>
              <th>Créditos</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {materias.map((m) => (
              <tr key={m._id}>
                <td>{m.nombre}</td>
                <td>{m.codigo}</td>
                <td>{m.descripcion}</td>
                <td>{m.creditos}</td>
                <td>
                  <button className="btn-edit" onClick={() => handleEdit(m)}>Editar</button>
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

export default Materias;
