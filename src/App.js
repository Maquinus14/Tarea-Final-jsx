import React from 'react';
import { TaskProvider } from './context/TaskContext';
import Column from './components/Column';
import TaskForm from './components/TaskForm';
import './App.css';

function App() {
  return (
    <TaskProvider>
      <div className="app-container">
        <h1>Gestor de Tareas Kanban</h1>
        
        <TaskForm />
        
        <div className="board">
          <Column title="Pendientes" status="pending" />
          <Column title="En Progreso" status="in-progress" />
          <Column title="Completadas" status="done" />
        </div>
      </div>
    </TaskProvider>
  );
}

export default App;