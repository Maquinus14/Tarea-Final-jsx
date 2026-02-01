import React from 'react';
import TaskCard from './TaskCard';
import { useTasks } from '../context/TaskContext';

const Column = ({ title, status }) => {
  const { tasks } = useTasks();

  const filteredTasks = tasks.filter(task => task.status === status);

  return (
    <div className="column">
      <h2>{title}</h2>
      <div className="task-list">
        {filteredTasks.map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default Column;