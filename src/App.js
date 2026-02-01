import React from 'react';
import { TaskProvider, useTasks } from './context/TaskContext';
import Column from './components/Column';
import TaskForm from './components/TaskForm';
import './App.css';

const KanbanBoard = () => {
  const { darkMode, toggleTheme } = useTasks();

  return (
    <div className={`app-container ${darkMode ? 'dark-mode' : ''}`}>
      <div className={`app-container ${darkMode ? 'dark-mode' : ''}`}>
        <header className="header-flex">
          <h1>Gestor de Tareas Kanban</h1>
          <button onClick={toggleTheme} className="theme-btn">
            {darkMode ? '☀️ Modo Claro' : '🌙 Modo Oscuro'}
          </button>
        </header>
        
        <TaskForm />
        
        <div className="board">
          <Column title="Pendientes" status="pending" />
          <Column title="En Progreso" status="in-progress" />
          <Column title="Completadas" status="done" />
        </div>
      </div>
    </div>  
  );
};

function App() {
  return (
    <TaskProvider>
      <KanbanBoard />
    </TaskProvider>
  );
}

export default App;