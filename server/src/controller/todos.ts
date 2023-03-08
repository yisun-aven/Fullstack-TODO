// // comment out github 

import { Request, Response } from "express";
import TodoService from "../service/todos";
import TodoRepository from "../repository/todos";

const todoRepository = new TodoRepository();
const todoService = new TodoService(todoRepository);

export const createToDo = async (req: Request, res: Response) => {
    try {
      const todo = await todoService.createToDo(req.body);
      return res.status(200).json(todo);
    } catch (error:any) {
      return res.status(500).json({ message: error.message });
    }
  };
  
export const getToDo = async (req: Request, res: Response) => {
  try {
    const todos = await todoService.getToDo();
    return res.status(200).json(todos);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateToDo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateTodo = await todoService.updateToDo(id, req.body);
    return res.status(200).json(updateTodo);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteToDo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const isDeleted = await todoService.deleteToDo(id);
    if (!isDeleted) {
      throw new Error("Failed to delete to-do");
    }
    return res.status(200).json({ message: "Todo deleted successfully!" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const clearToDo = async (req: Request, res: Response) => {
  try {
    const isEverythingDeleted = await todoService.clearToDo();
    if (!isEverythingDeleted) {
      throw new Error("Failed to delete every todos");
    }
    return res.status(200).json({ message: "Every Todos deleted successfully!" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const sortDateToDo = async (req: Request, res: Response) => {
  try {
    const sortedTodos = await todoService.sortDateToDo();
    return res.status(200).json(sortedTodos);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const prioritizeToDo = async (req: Request, res: Response) => {
  const { priority } = req.body;
  if (priority < 1 || priority > 5) {
    res.status(400).json({ message: 'Invalid priority value. Priority must be between 1 and 5.' });
    return;
  }
  try {
    const prioritizedTodos = await todoService.prioritizeToDo(priority);
    return res.status(200).json(prioritizedTodos);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const findToDo = async (req: Request, res: Response) => {
  const { title } = req.params;
  try {
    const todos = await todoService.findToDo(title);
    if (todos.length === 0) {
      return res.status(404).json({ message: "Failed to find to-do!" });
    }
    return res.status(200).json(todos);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
