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
      {/* 1. Cabecera modernizada */}
      <header className="header-flex">
        <div className="header-title-search">
          <h1>🚀 Mi Workspace</h1>
          <input
            type="text"
            placeholder="Buscar tarea..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="header-actions">
          {user.picture && (
            <img
              src={user.picture}
              alt="user"
              referrerPolicy="no-referrer"
              className="user-avatar"
            />
          )}
          <span className="user-name">{user.name}</span>
          <button onClick={logout} className="logout-btn">Salir</button>
          <button onClick={toggleTheme} className="theme-btn">
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>
      </header>

      {/* 2. Nuevo Layout Asimétrico (Dashboard) */}
      <div className="dashboard-layout">
        
        {/* Lado Izquierdo: Tareas Activas */}
        <div className="active-zone">
          <div className="column-wrapper">
            <Column title="🔥 Pendientes" status="pending" />
          </div>
          <div className="column-wrapper">
            <Column title="⚡ En Progreso" status="in-progress" />
          </div>
        </div>

        {/* Lado Derecho: Panel de Acción y Completadas */}
        <div className="sidebar-zone">
          <div className="action-panel">
            <h2>Crear Tarea</h2>
            {/* Movimos el formulario aquí dentro */}
            <TaskForm userName={user.name} /> 
          </div>
          
          <div className="column-wrapper completed-wrapper">
            <Column title="✅ Completadas" status="done" />
          </div>
        </div>

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
