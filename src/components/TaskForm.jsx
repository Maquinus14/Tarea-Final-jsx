import React from 'react';
import { useTasks } from '../context/TaskContext';
import { useForm } from '../hooks/useForm';

const TaskForm = () => {
  const { addTask } = useTasks();

  const { values, handleChange, resetForm } = useForm({
    title: '',
    description: '',
    priority: 'Media'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!values.title) return;

    addTask(values);
    resetForm();
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px', padding: '20px', border: '1px solid #ccc' }}>
      <h2>Nueva Tarea</h2>
      
      <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
        <input
          name="title"
          value={values.title}
          onChange={handleChange}
          placeholder="Título de la tarea"
          required
        />
        
        <select name="priority" value={values.priority} onChange={handleChange}>
          <option value="Alta">Alta</option>
          <option value="Media">Media</option>
          <option value="Baja">Baja</option>
        </select>
      </div>

      <textarea
        name="description"
        value={values.description}
        onChange={handleChange}
        placeholder="Descripción (opcional)"
        rows="3"
        style={{ width: '100%', marginBottom: '10px' }}
      />

      <button type="submit">Añadir Tarea</button>
    </form>
  );
};

export default TaskForm;