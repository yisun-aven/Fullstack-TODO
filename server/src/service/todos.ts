import Todo, { TodoModel } from "../models/todos";
import TodoRepository from "../repository/todos";
import { match } from 'ts-pattern';
import * as D from 'fp-ts/Date'
import { pipe } from 'fp-ts/function'
import { Ord, contramap, fromCompare } from 'fp-ts/Ord';

class TodoService {
  private repository: TodoRepository;

  constructor(repository: TodoRepository) {
    this.repository = repository;
  }

  async createToDo (data: TodoModel) {
    return this.repository.create(data);
  }

  async getToDo () {
    return this.repository.find();
  }

  async updateToDo (id: string, data: Partial<TodoModel>) {
    const todo = await this.repository.findById(id);
    if (!todo) throw new Error("Failed to find to-do!");
    return this.repository.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteToDo (id: string) {
    const todo = await this.repository.findById(id);
    if (!todo) throw new Error("Failed to find to-do!");
    const isDeleted = await this.repository.findByIdAndDelete(id);
    if (!isDeleted) throw new Error("Failed to delete to-do");
    return { message: "Todo deleted successfully!" };
  }

  async clearToDo () {
    const isEverythingDeleted = await this.repository.deleteMany();
    if (!isEverythingDeleted) throw new Error("Failed to delete every todos");
    return { message: "Every Todos deleted successfully!" };
  }

  async sortDateToDo () {
    const todos = await this.repository.find();

    type Todo = {
      dueDate: Date;
    };
    const todosWithDueDate = todos.filter(todo => todo.dueDate !== undefined)
    const todosWithNoDate = todos.filter(todo => todo.dueDate == undefined)
    const ordByDuedate: Ord<Todo> = pipe(
      D.Ord,
      contramap((Todo) => Todo.dueDate)
    )
    const sortedTodosWithDueDate = todosWithDueDate.sort(ordByDuedate.compare);
    const sortedTodos = sortedTodosWithDueDate.concat(todosWithNoDate);    
    return sortedTodos;
  }

  async prioritizeToDo (priority: number) {
    if (priority < 1 || priority > 5) {
      throw new Error('Invalid priority value. Priority must be between 1 and 5.');
    }
    const todos = await this.repository.find();
    const prioritizedTodos = todos.sort((a, b) => b.priority - a.priority);
    return prioritizedTodos;
  }

  async findToDo (title: string) {
    const todo = await this.repository.findWithTitle(title);
    if (todo.length == 0) throw new Error("Failed to find to-do!");
    return todo;
  }
}

export default TodoService;
