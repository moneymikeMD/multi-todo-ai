import React, { useState, useEffect } from 'react';
import { TodoList } from '../types/Todo';
import './TodoListForm.css';

interface TodoListFormProps {
  todoList?: TodoList;
  onSubmit: (listData: { name: string; description: string }) => void;
  onCancel: () => void;
}

const TodoListForm: React.FC<TodoListFormProps> = ({ todoList, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  useEffect(() => {
    if (todoList) {
      setFormData({
        name: todoList.name,
        description: todoList.description,
      });
    }
  }, [todoList]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name.trim()) {
      onSubmit(formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="todo-list-form-overlay">
      <div className="todo-list-form-container">
        <h2>{todoList ? 'Edit List' : 'Create New List'}</h2>
        <form onSubmit={handleSubmit} className="todo-list-form">
          <div className="form-group">
            <label htmlFor="name">List Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter list name"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter list description"
              rows={3}
            />
          </div>
          
          <div className="form-actions">
            <button type="button" onClick={onCancel} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              {todoList ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TodoListForm; 