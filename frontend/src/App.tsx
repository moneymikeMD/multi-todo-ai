import React, { useState, useCallback } from 'react';
import './App.css';
import TodoList from './components/TodoList';
import Sidebar from './components/Sidebar';
import { TodoList as TodoListType } from './types/Todo';

function App() {
  const [selectedListId, setSelectedListId] = useState<number | null>(null);
  const [selectedList, setSelectedList] = useState<TodoListType | null>(null);

  const handleListSelect = useCallback((listId: number | null) => {
    setSelectedListId(listId);
    setSelectedList(null); // Reset selected list, it will be fetched by TodoList component
  }, []);

  const handleListCreated = useCallback((list: TodoListType) => {
    setSelectedListId(list.id!);
    setSelectedList(list);
  }, []);

  const handleListDeleted = useCallback((listId: number) => {
    if (selectedListId === listId) {
      setSelectedListId(null);
      setSelectedList(null);
    }
  }, [selectedListId]);

  return (
    <div className="App">
      <Sidebar
        selectedListId={selectedListId}
        onListSelect={handleListSelect}
        onListCreated={handleListCreated}
        onListDeleted={handleListDeleted}
      />
      <main className="main-content">
        <TodoList
          selectedListId={selectedListId}
          selectedList={selectedList}
        />
      </main>
    </div>
  );
}

export default App;
