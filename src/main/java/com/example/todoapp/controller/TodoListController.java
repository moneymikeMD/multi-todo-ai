package com.example.todoapp.controller;

import com.example.todoapp.model.TodoList;
import com.example.todoapp.repository.TodoListRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/todo-lists")
public class TodoListController {
    private final TodoListRepository todoListRepository;

    public TodoListController(TodoListRepository todoListRepository) {
        this.todoListRepository = todoListRepository;
    }

    @GetMapping
    public List<TodoList> getAllTodoLists() {
        return todoListRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<TodoList> getTodoListById(@PathVariable Long id) {
        Optional<TodoList> todoList = todoListRepository.findById(id);
        return todoList.map(ResponseEntity::ok)
                       .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public TodoList createTodoList(@RequestBody TodoList todoList) {
        return todoListRepository.save(todoList);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TodoList> updateTodoList(@PathVariable Long id, @RequestBody TodoList todoListDetails) {
        return todoListRepository.findById(id)
                .map(todoList -> {
                    todoList.setName(todoListDetails.getName());
                    todoList.setDescription(todoListDetails.getDescription());
                    return ResponseEntity.ok(todoListRepository.save(todoList));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTodoList(@PathVariable Long id) {
        return todoListRepository.findById(id)
                .map(todoList -> {
                    todoListRepository.delete(todoList);
                    return ResponseEntity.noContent().<Void>build();
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
} 