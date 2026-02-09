import React, { useEffect } from "react";
import { TaskProvider, useTasks } from "./context/TaskContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Column from "./components/Column";
import TaskForm from "./components/TaskForm";
import "./App.css";

const KanbanBoard = () => {
  const { darkMode, toggleTheme, searchQuery, setSearchQuery } = useTasks();

  const { user, logout, handleGoogleSuccess } = useAuth();

  useEffect(() => {
    if (window.google && !user) {
      google.accounts.id.initialize({
        client_id:
          "409586548058-s1s00u1uftsrikopg2okuv4uil3ha64s.apps.googleusercontent.com",
        callback: handleGoogleSuccess,
      });
      google.accounts.id.prompt();
      google.accounts.id.renderButton(document.getElementById("googleBtn"), {
        theme: "outline",
        size: "large",
      });
    }
  }, [user, handleGoogleSuccess]);

  if (!user) {
    return (
      <div
        className={`login-container ${darkMode ? "dark-mode" : ""}`}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "50px",
        }}
      >
        <h1>Bienvenido al Kanban</h1>
        <div id="googleBtn"></div>
      </div>
    );
  }

  return (
    <div className={`app-container ${darkMode ? "dark-mode" : ""}`}>
      <header className="header-flex">
        <h1>Gestor de Tareas Kanban</h1>

        <input
          type="text"
          placeholder="Buscar tarea..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginRight: "10px",
          }}
        >
          {user.picture && (
            <img
              src={user.picture}
              alt="user"
              referrerPolicy="no-referrer"
              style={{ width: 30, borderRadius: "50%" }}
            />
          )}
          <span>{user.name}</span>
          <button onClick={logout}>Salir</button>
        </div>
        {/* -------------------------------------------------- */}

        <button onClick={toggleTheme} className="theme-btn">
          {darkMode ? "☀️ Modo Claro" : "🌙 Modo Oscuro"}
        </button>
      </header>

      <TaskForm userName={user.name} />

      <div className="board">
        <Column title="Pendientes" status="pending" />
        <Column title="En Progreso" status="in-progress" />
        <Column title="Completadas" status="done" />
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <KanbanBoard />
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;
