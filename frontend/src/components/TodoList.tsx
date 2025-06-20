import React, { useState, useEffect, useCallback } from 'react';
import { Todo, TodoList as TodoListType } from '../types/Todo';
import { todoService } from '../services/todoService';
import TodoForm from './TodoForm';
import './TodoList.css';

interface TodoListProps {
  selectedListId: number | null;
  selectedList: TodoListType | null;
}

const TodoList: React.FC<TodoListProps> = ({ selectedListId, selectedList }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [showForm, setShowForm] = useState(false);

  const fetchTodos = useCallback(async (listId: number) => {
    try {
      setLoading(true);
      const data = await todoService.getAllTodos(listId);
      setTodos(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch todos');
      console.error('Error fetching todos:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (selectedListId) {
      fetchTodos(selectedListId);
    } else {
      setTodos([]);
      setLoading(false);
    }
  }, [selectedListId, fetchTodos]);

  const handleCreateTodo = async (todoData: Omit<Todo, 'id'>) => {
    if (!selectedListId) return;
    
    try {
      const newTodo = await todoService.createTodo(selectedListId, todoData);
      setTodos(prev => [...prev, newTodo]);
      setShowForm(false);
      setError(null);
    } catch (err) {
      setError('Failed to create todo');
      console.error('Error creating todo:', err);
    }
  };

  const handleUpdateTodo = async (id: number, todoData: Omit<Todo, 'id'>) => {
    if (!selectedListId) return;
    
    try {
      const updatedTodo = await todoService.updateTodo(selectedListId, id, todoData);
      setTodos(prev => prev.map(todo => todo.id === id ? updatedTodo : todo));
      setEditingTodo(null);
      setError(null);
    } catch (err) {
      setError('Failed to update todo');
      console.error('Error updating todo:', err);
    }
  };

  const handleDeleteTodo = async (id: number) => {
    if (!selectedListId) return;
    
    try {
      await todoService.deleteTodo(selectedListId, id);
      setTodos(prev => prev.filter(todo => todo.id !== id));
      setError(null);
    } catch (err) {
      setError('Failed to delete todo');
      console.error('Error deleting todo:', err);
    }
  };

  const handleToggleComplete = async (todo: Todo) => {
    if (!selectedListId) return;
    
    try {
      const updatedTodo = await todoService.updateTodo(selectedListId, todo.id!, {
        ...todo,
        completed: !todo.completed,
      });
      setTodos(prev => prev.map(t => t.id === todo.id ? updatedTodo : t));
      setError(null);
    } catch (err) {
      setError('Failed to update todo');
      console.error('Error updating todo:', err);
    }
  };

  if (!selectedListId) {
    return (
      <div className="todo-list-container">
        <div className="no-list-selected">
          <h2>Welcome to M Todo App</h2>
          <p>Select a todo list from the sidebar to get started, or create a new one!</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="todo-list-container">
        <div className="loading">Loading todos...</div>
      </div>
    );
  }

  return (
    <div className="todo-list-container">
      <div className="todo-header">
        <div className="todo-header-content">
          <h1>{selectedList?.name || 'Todo List'}</h1>
          {selectedList?.description && (
            <p className="list-description">{selectedList.description}</p>
          )}
        </div>
        <button 
          className="add-todo-btn"
          onClick={() => setShowForm(true)}
        >
          Add New Todo
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {showForm && (
        <TodoForm
          onSubmit={handleCreateTodo}
          onCancel={() => setShowForm(false)}
        />
      )}

      {editingTodo && (
        <TodoForm
          todo={editingTodo}
          onSubmit={(todoData) => handleUpdateTodo(editingTodo.id!, todoData)}
          onCancel={() => setEditingTodo(null)}
        />
      )}

      <div className="todos-container">
        {todos.length === 0 ? (
          <div className="no-todos">
            <h3>No todos yet</h3>
            <p>Create your first todo in "{selectedList?.name}" to get started!</p>
          </div>
        ) : (
          todos.map(todo => (
            <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
              <div className="todo-content">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleComplete(todo)}
                  className="todo-checkbox"
                />
                <div className="todo-text">
                  <h3 className="todo-title">{todo.title}</h3>
                  <p className="todo-description">{todo.description}</p>
                </div>
              </div>
              <div className="todo-actions">
                <button
                  className="edit-btn"
                  onClick={() => setEditingTodo(todo)}
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteTodo(todo.id!)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TodoList; 