import { Injectable } from '@angular/core';
import { Todo } from '../classes/todo';

@Injectable()
export class TodoService {
  private nextId: number;


  constructor() {
    const todos = this.getTodos();

    if (todos.length === 0) {

      this.nextId = 0;
    } else {
      const maxId = todos[todos.length - 1].id;
      this.nextId = maxId + 1;

    }

  }

  public addTodo(text: string): void {
    const todo = new Todo(this.nextId, text);
    const todos = this.getTodos();
    todos.push(todo);

    this.setlocalstorageTodos(todos);
    this.nextId++;
  }

  public getTodos(): Todo[] {
    const localstorageItem = JSON.parse(localStorage.getItem('todos'));
    return localstorageItem == null ? [] : localstorageItem.todos;
  }

  public removeTodo(id: number): void {
    // tslint:disable-next-line: triple-equals
    let todos = this.getTodos();
    // tslint:disable-next-line: triple-equals
    todos = todos.filter((todo) => todo.id != id);
    this.setlocalstorageTodos(todos);
  }

  private setlocalstorageTodos(todos: Todo[]): void {

    // tslint:disable-next-line: object-literal-shorthand
    localStorage.setItem('todos', JSON.stringify({ todos: todos }));
  }

}
