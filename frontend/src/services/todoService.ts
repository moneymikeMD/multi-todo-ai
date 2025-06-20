import { Todo, TodoFormData } from '../types/Todo';

const API_BASE_URL = 'http://localhost:8080/api';

export const todoService = {
  async getAllTodos(todoListId: number): Promise<Todo[]> {
    const response = await fetch(`${API_BASE_URL}/todo-lists/${todoListId}/todos`);
    if (!response.ok) {
      throw new Error('Failed to fetch todos');
    }
    return response.json();
  },

  async getTodoById(todoListId: number, id: number): Promise<Todo> {
    const response = await fetch(`${API_BASE_URL}/todo-lists/${todoListId}/todos/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch todo');
    }
    return response.json();
  },

  async createTodo(todoListId: number, todo: TodoFormData): Promise<Todo> {
    const response = await fetch(`${API_BASE_URL}/todo-lists/${todoListId}/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    });
    if (!response.ok) {
      throw new Error('Failed to create todo');
    }
    return response.json();
  },

  async updateTodo(todoListId: number, id: number, todo: TodoFormData): Promise<Todo> {
    const response = await fetch(`${API_BASE_URL}/todo-lists/${todoListId}/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    });
    if (!response.ok) {
      throw new Error('Failed to update todo');
    }
    return response.json();
  },

  async deleteTodo(todoListId: number, id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/todo-lists/${todoListId}/todos/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete todo');
    }
  },
}; 