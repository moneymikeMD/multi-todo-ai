export interface Todo {
  id?: number;
  title: string;
  description: string;
  completed: boolean;
  todoListId?: number;
}

export interface TodoFormData {
  title: string;
  description: string;
  completed: boolean;
}

export interface TodoList {
  id?: number;
  name: string;
  description: string;
  todos?: Todo[];
}

export interface TodoListFormData {
  name: string;
  description: string;
} 