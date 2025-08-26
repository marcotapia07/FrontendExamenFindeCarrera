import axios from "axios";

const API_URL = "http://localhost:4000";

// Login
export const loginUser = async (email, password) => {
  try {
    const res = await axios.post(`${API_URL}/login`, { email, password });
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.error || "Error de login");
  }
};

// Registro
export const registerUser = async (nombre, apellido, email, password) => {
  try {
    const res = await axios.post(`${API_URL}/register`, { nombre, apellido, email, password });
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.error || "Error de registro");
  }
};


const getAuthHeaders = () => {
  const auth = JSON.parse(localStorage.getItem("auth")); // 👈 aquí
  if (auth?.token) {
    return { headers: { Authorization: `Bearer ${auth.token}` } };
  }
  return {};
};

// CRUD Materias
export const getMaterias = async () => axios.get(`${API_URL}/materias`, getAuthHeaders());
export const createMateria = async (materia) =>
  axios.post(`${API_URL}/materias`, materia, getAuthHeaders());
export const updateMateria = async (id, materia) =>
  axios.put(`${API_URL}/materias/${id}`, materia, getAuthHeaders());
export const deleteMateria = async (id) =>
  axios.delete(`${API_URL}/materias/${id}`, getAuthHeaders());

// Estudiantes
export const getEstudiantes = async () => axios.get(`${API_URL}/estudiantes`, getAuthHeaders());
export const createEstudiante = async (estudiante) =>
  axios.post(`${API_URL}/estudiantes`, estudiante, getAuthHeaders());
export const updateEstudiante = async (id, estudiante) =>
  axios.put(`${API_URL}/estudiantes/${id}`, estudiante, getAuthHeaders());
export const deleteEstudiante = async (id) =>
  axios.delete(`${API_URL}/estudiantes/${id}`, getAuthHeaders());

// CRUD Matriculas
export const getMatriculas = async () => axios.get(`${API_URL}/matriculas`, getAuthHeaders());
//export const getMatriculas = async () => axios.get(`${API_URL}/api/matriculas`, getAuthHeaders());

export const createMatricula = async (matricula) =>
  axios.post(`${API_URL}/matriculas`, matricula, getAuthHeaders());
export const deleteMatricula = async (id) =>
  axios.delete(`${API_URL}/matriculas/${id}`, getAuthHeaders());