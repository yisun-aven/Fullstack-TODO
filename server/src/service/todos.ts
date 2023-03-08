import { TodoModel } from "../models/todos";
import TodoRepository from "../repository/todos";
import { match } from 'ts-pattern';


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
        dueDate?: Date;
    }

    type SortedResult =
    | { type: 'no-date' }
    | { type: 'a-no-date' }
    | { type: 'b-no-date' }
    | { type: 'sorted', result: number }

    function compareTodos(a: Todo, b: Todo): SortedResult {
      switch (true) {
        case !a.dueDate && !b.dueDate:
          return { type: 'no-date' };
        case !a.dueDate:
          return { type: 'a-no-date' };
        case !b.dueDate:
          return { type: 'b-no-date' };
        default:
          const result = a.dueDate!.getTime() - b.dueDate!.getTime();
          return { type: 'sorted', result };
      }
    }

    const sortedTodos = todos.sort((a, b) => {
      const sortedResult = compareTodos(a, b);
      return match(sortedResult.type)
        .with('no-date', () => 0)
        .with('a-no-date', () => 1)
        .with('b-no-date', () => -1)
        .with('sorted', () => a.dueDate.getTime() - b.dueDate.getTime())
        .exhaustive();
    });
    
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
