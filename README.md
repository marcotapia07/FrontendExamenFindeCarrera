# 📝 Sistema de Gestión de Matrículas – Frontend

## 🌟 Descripción del proyecto

Este proyecto es el **frontend de un sistema de gestión de matrículas** desarrollado con **React**, **React Router**, **Tailwind CSS** y **Axios**.
Permite a los usuarios autenticados (administradores) **gestionar estudiantes, materias y matrículas** de forma sencilla y eficiente, con validaciones y mensajes claros para mejorar la experiencia de usuario.

---

## 🎯 Funcionalidades principales

1. **Gestión de Estudiantes**

   * Crear, editar y eliminar estudiantes.
   * Campos: `nombre`, `apellido`, `cedula`, `telefono` y `correo`.
   * Validaciones:

     * Cédula máxima 10 caracteres.
     * Correo debe incluir `@`.
     * Teléfono, cédula y correo deben ser únicos; si se repite alguno, se muestra un mensaje claro de error.

2. **Gestión de Materias**

   * Crear, editar y eliminar materias.
   * Campos: `nombre`, `codigo`, `descripcion` y `creditos`.
   * Validaciones:

     * Descripción con máximo 50 caracteres.
     * Créditos: máximo 10.
     * Código de materia único.

3. **Gestión de Matrículas**

   * Registrar matrículas asignando materias a estudiantes existentes.
   * Ver la lista de matrículas con información del estudiante y materias.
   * Eliminar matrículas si es necesario.
   * Validación: solo se puede matricular a estudiantes y materias existentes.

4. **Autenticación**

   * Login y registro de usuarios (administradores).
   * Control de rutas protegidas con `React Router` y `AuthContext`.

---

## ⚙️ Tecnologías usadas

* **React**: construcción de la interfaz de usuario.
* **React Router**: navegación entre páginas y rutas protegidas.
* **Axios**: comunicación con el backend para CRUD de estudiantes, materias y matrículas.
* **Context API**: manejo de la sesión de usuario y autenticación.

---

## 🗂 Estructura del proyecto

```
frontend/
│
├─ src/
│  ├─ pages/            # Componentes de páginas (Estudiantes, Materias, Matrículas, Dashboard)
│  ├─ services/         # Funciones para comunicarse con el backend (API)
│  ├─ context/          # AuthContext para manejo de sesión
│  ├─ components/       # Componentes reutilizables
│  ├─ AppRoutes.jsx     # Configuración de rutas
│  └─ index.jsx         # Punto de entrada
│
├─ public/
│  └─ index.html
│
└─ package.json
```

---

## 💻 Componentes clave

### 1️⃣ `Matriculas.jsx`

* Permite **registrar matrículas** asignando estudiantes y materias.
* Usa un formulario con `select` múltiple para materias.
* Muestra un **listado de matrículas** con estudiante, materias y fecha de matrícula.
* Permite **eliminar matrículas** con confirmación.

### 2️⃣ `api.js`

* Contiene todas las llamadas al backend usando Axios.
* Funciones principales:

  * `getEstudiantes()`, `createEstudiante()`
  * `getMaterias()`, `createMateria()`
  * `getMatriculas()`, `createMatricula()`, `deleteMatricula()`
* Incluye manejo de **tokens de autenticación** desde localStorage.

### 3️⃣ `AuthContext.jsx`

* Contexto global para **manejar sesión del usuario**.
* Provee `user` y métodos de login/logout para proteger rutas con `ProtectedRoute`.

---

## ✨ Validaciones importantes

* **Estudiantes**: cédula ≤ 10, correo válido con `@`, teléfono/correo/cédula únicos.
* **Materias**: descripción ≤ 50 caracteres, créditos ≤ 10.
* **Matrículas**: solo se pueden registrar materias y estudiantes existentes.

---

## 🚀 Uso

1. Clonar el repositorio:

```bash
git clone <tu-repositorio>
```

2. Instalar dependencias:

```bash
npm install
```

3. Ejecutar proyecto:

```bash
npm run dev
```

4. Acceder en el navegador a:

```
http://localhost:5173
```

---


## 📌 Notas finales

Este frontend es parte de un **sistema completo de gestión de matrículas**, preparado para integrarse con un backend basado en **Node.js, Express y MongoDB**.
El código incluye **manejo de errores**, **mensajes claros**, y **validaciones importantes**, asegurando que los datos ingresados sean correctos y consistentes.


