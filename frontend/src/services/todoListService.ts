import { TodoList, TodoListFormData } from '../types/Todo';

const API_BASE_URL = 'http://localhost:8080/api/todo-lists';

export const todoListService = {
  async getAllTodoLists(): Promise<TodoList[]> {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch todo lists');
    }
    return response.json();
  },

  async getTodoListById(id: number): Promise<TodoList> {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch todo list');
    }
    return response.json();
  },

  async createTodoList(todoList: TodoListFormData): Promise<TodoList> {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todoList),
    });
    if (!response.ok) {
      throw new Error('Failed to create todo list');
    }
    return response.json();
  },

  async updateTodoList(id: number, todoList: TodoListFormData): Promise<TodoList> {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todoList),
    });
    if (!response.ok) {
      throw new Error('Failed to update todo list');
    }
    return response.json();
  },

  async deleteTodoList(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete todo list');
    }
  },
}; 