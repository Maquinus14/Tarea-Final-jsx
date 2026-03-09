import React from 'react';
import TaskCard from './TaskCard';
import { useTasks } from '../context/TaskContext';

const Column = ({ title, status }) => {
  const { tasks, searchQuery } = useTasks();

  const filteredTasks = tasks.filter(task => {
    return task.status === status && (
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

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