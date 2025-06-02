import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NgForOf, NgIf, NgSwitch, NgSwitchCase} from '@angular/common';
import {FormsModule} from '@angular/forms';


interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

@Component({
  selector: 'app-root',
  imports: [NgSwitch, NgSwitchCase, NgIf, FormsModule, NgForOf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  todos: Todo[] = [];
  newTodo = '';
  filter: 'all' | 'completed' | 'pending' = 'all';
  view: 'list' | 'stats' = 'list';

  addTodo() {
    if (this.newTodo.trim()) {
      this.todos.push({
        id: Date.now(),
        text: this.newTodo,
        completed: false,
      });
      this.newTodo = '';
    }
  }

  deleteTodo(id: number) {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

  toggleComplete(id: number) {
    const todo = this.todos.find(t => t.id === id);
    if (todo) todo.completed = !todo.completed;
  }

  filteredTodos() {
    if (this.filter === 'completed') return this.todos.filter(t => t.completed);
    if (this.filter === 'pending') return this.todos.filter(t => !t.completed);
    return this.todos;
  }

  protected readonly length = length;

  ngOnInit() {
    this.generateSampleTodos(500);
  }

  generateSampleTodos(count: number) {
    for (let i = 1; i <= count; i++) {
      this.todos.push({
        id: i,
        text: `Todo item ${i}`,
        completed: Math.random() > 0.5, // Randomly mark some as completed
      });
    }
  }

  pendingFilteredCount() {
    return this.filteredTodos().filter(todo => !todo.completed).length;
  }

  completedFilteredCount() {
    return this.filteredTodos().filter(todo => todo.completed).length;
  }

  pendingCount() {
    return this.todos.filter(todo => !todo.completed).length;
  }

  completedCount() {
    return this.todos.filter(todo => todo.completed).length;
  }
}
