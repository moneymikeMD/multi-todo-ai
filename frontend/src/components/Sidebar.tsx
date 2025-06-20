import React, { useState, useEffect, useCallback, useRef } from 'react';
import { TodoList } from '../types/Todo';
import { todoListService } from '../services/todoListService';
import TodoListForm from './TodoListForm';
import './Sidebar.css';

interface SidebarProps {
  selectedListId: number | null;
  onListSelect: (listId: number | null) => void;
  onListCreated: (list: TodoList) => void;
  onListDeleted: (listId: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  selectedListId, 
  onListSelect, 
  onListCreated,
  onListDeleted 
}) => {
  const [todoLists, setTodoLists] = useState<TodoList[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingList, setEditingList] = useState<TodoList | null>(null);
  
  // Use refs to avoid infinite loops
  const onListSelectRef = useRef(onListSelect);
  const selectedListIdRef = useRef(selectedListId);
  
  // Update refs when props change
  onListSelectRef.current = onListSelect;
  selectedListIdRef.current = selectedListId;

  const fetchTodoLists = useCallback(async () => {
    try {
      setLoading(true);
      const data = await todoListService.getAllTodoLists();
      setTodoLists(data);
      setError(null);
      
      // Auto-select first list if none selected
      if (data.length > 0 && selectedListIdRef.current === null) {
        onListSelectRef.current(data[0].id!);
      }
    } catch (err) {
      setError('Failed to fetch todo lists');
      console.error('Error fetching todo lists:', err);
    } finally {
      setLoading(false);
    }
  }, []); // Empty dependency array since we use refs

  useEffect(() => {
    fetchTodoLists();
  }, [fetchTodoLists]);

  const handleCreateList = async (listData: { name: string; description: string }) => {
    try {
      const newList = await todoListService.createTodoList(listData);
      setTodoLists(prev => [...prev, newList]);
      setShowForm(false);
      setError(null);
      onListCreated(newList);
      
      // Auto-select the newly created list
      onListSelect(newList.id!);
    } catch (err) {
      setError('Failed to create todo list');
      console.error('Error creating todo list:', err);
    }
  };

  const handleUpdateList = async (id: number, listData: { name: string; description: string }) => {
    try {
      const updatedList = await todoListService.updateTodoList(id, listData);
      setTodoLists(prev => prev.map(list => list.id === id ? updatedList : list));
      setEditingList(null);
      setError(null);
    } catch (err) {
      setError('Failed to update todo list');
      console.error('Error updating todo list:', err);
    }
  };

  const handleDeleteList = async (id: number) => {
    try {
      await todoListService.deleteTodoList(id);
      setTodoLists(prev => prev.filter(list => list.id !== id));
      setError(null);
      onListDeleted(id);
      
      // Select another list if the deleted one was selected
      if (selectedListId === id) {
        const remainingLists = todoLists.filter(list => list.id !== id);
        if (remainingLists.length > 0) {
          onListSelect(remainingLists[0].id!);
        } else {
          onListSelect(null);
        }
      }
    } catch (err) {
      setError('Failed to delete todo list');
      console.error('Error deleting todo list:', err);
    }
  };

  const handleListClick = (listId: number) => {
    if (selectedListId !== listId) {
      onListSelect(listId);
    }
  };

  if (loading) {
    return (
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Todo Lists</h2>
        </div>
        <div className="loading">Loading lists...</div>
      </div>
    );
  }

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Todo Lists</h2>
        <button 
          className="add-list-btn"
          onClick={() => setShowForm(true)}
        >
          +
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {showForm && (
        <TodoListForm
          onSubmit={handleCreateList}
          onCancel={() => setShowForm(false)}
        />
      )}

      {editingList && (
        <TodoListForm
          todoList={editingList}
          onSubmit={(listData) => handleUpdateList(editingList.id!, listData)}
          onCancel={() => setEditingList(null)}
        />
      )}

      <div className="lists-container">
        {todoLists.length === 0 ? (
          <div className="no-lists">
            <p>No todo lists yet.</p>
            <p>Create your first list to get started!</p>
          </div>
        ) : (
          todoLists.map(list => (
            <div 
              key={list.id} 
              className={`list-item ${selectedListId === list.id ? 'selected' : ''}`}
              onClick={() => handleListClick(list.id!)}
            >
              <div className="list-content">
                <h3 className="list-name">{list.name}</h3>
                <p className="list-description">{list.description}</p>
              </div>
              <div className="list-actions">
                <button
                  className="edit-list-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditingList(list);
                  }}
                >
                  ✏️
                </button>
                <button
                  className="delete-list-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteList(list.id!);
                  }}
                >
                  🗑️
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Sidebar; 