import Todo, { TodoModel } from "../models/todos";

class TodoRepository {
  async create(data: TodoModel) {
    const todos = await Todo.create(data);
    return todos;
  }

  async find() {
    const todos = await Todo.find({});
    return todos;
  }

  async findWithTitle(title: string) {
    const regex = new RegExp(title, 'i');
    const todo = await Todo.find({ title: { $regex: regex } });
    return todo;
  }

  async findById(id: string) {
    const todo = await Todo.findById(id);
    return todo;
  }

  async findByIdAndUpdate(id: string, data: Partial<TodoModel>, options: any) {
    const updatedTodo = await Todo.findByIdAndUpdate(id, data, options);
    return updatedTodo;
  }

  async findByIdAndDelete(id: string) {
    const isDeleted = await Todo.findByIdAndDelete(id);
    return isDeleted;
  }

  async deleteMany() {
    const isEverythingDeleted = await Todo.deleteMany();
    return isEverythingDeleted;
  }
}

export default TodoRepository;