package com.example.todoapp.controller;

import com.example.todoapp.model.Todo;
import com.example.todoapp.model.TodoList;
import com.example.todoapp.repository.TodoRepository;
import com.example.todoapp.repository.TodoListRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/todo-lists/{todoListId}/todos")
public class TodoController {
    private final TodoRepository todoRepository;
    private final TodoListRepository todoListRepository;

    public TodoController(TodoRepository todoRepository, TodoListRepository todoListRepository) {
        this.todoRepository = todoRepository;
        this.todoListRepository = todoListRepository;
    }

    @GetMapping
    public ResponseEntity<List<Todo>> getAllTodos(@PathVariable Long todoListId) {
        if (!todoListRepository.existsById(todoListId)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(todoRepository.findByTodoListId(todoListId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Todo> getTodoById(@PathVariable Long todoListId, @PathVariable Long id) {
        if (!todoListRepository.existsById(todoListId)) {
            return ResponseEntity.notFound().build();
        }
        Optional<Todo> todo = todoRepository.findById(id);
        return todo.map(ResponseEntity::ok)
                   .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Todo> createTodo(@PathVariable Long todoListId, @RequestBody Todo todo) {
        Optional<TodoList> todoList = todoListRepository.findById(todoListId);
        if (todoList.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        todo.setTodoList(todoList.get());
        return ResponseEntity.ok(todoRepository.save(todo));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Todo> updateTodo(@PathVariable Long todoListId, @PathVariable Long id, @RequestBody Todo todoDetails) {
        if (!todoListRepository.existsById(todoListId)) {
            return ResponseEntity.notFound().build();
        }
        return todoRepository.findById(id)
                .map(todo -> {
                    todo.setTitle(todoDetails.getTitle());
                    todo.setDescription(todoDetails.getDescription());
                    todo.setCompleted(todoDetails.isCompleted());
                    return ResponseEntity.ok(todoRepository.save(todo));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTodo(@PathVariable Long todoListId, @PathVariable Long id) {
        if (!todoListRepository.existsById(todoListId)) {
            return ResponseEntity.notFound().build();
        }
        return todoRepository.findById(id)
                .map(todo -> {
                    todoRepository.delete(todo);
                    return ResponseEntity.noContent().<Void>build();
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
} 