import React from 'react';
import { useTasks } from '../context/TaskContext';
import './TaskCard.css';

const TaskCard = ({ task }) => {
  const { deleteTask, updateTaskStatus } = useTasks();

  const cardStyle = task.priority === 'Alta' ? 'task-card high-priority' : 'task-card';

  return (
    <div className={cardStyle}>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <span className="priority-tag">Prioridad: {task.priority}</span>
      
      <div className="task-actions">
        <button onClick={() => deleteTask(task.id)}>Borrar</button>
        
        {task.status === 'pending' && (
           <button onClick={() => updateTaskStatus(task.id, 'in-progress')}>Empezar</button>
        )}
        {task.status === 'in-progress' && (
           <button onClick={() => updateTaskStatus(task.id, 'done')}>Terminar</button>
        )}
      </div>
    </div>
  );
};

export default TaskCard;