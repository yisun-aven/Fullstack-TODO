import React from "react";
import { ITodo } from "../interface";

type TodoFormProps = {
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    newTodo: ITodo;
}

function TodoForm( {handleSubmit, handleChange, newTodo }: TodoFormProps) {
  return (
    <form onSubmit={handleSubmit}>
      <input
        className="inputTitle"
        type="text"
        placeholder="add todo..."
        name="title"
        value={newTodo.title}
        onChange={handleChange}
      />
      <input
        className="inputDescription"
        type="text"
        placeholder="description..."
        name="description"
        value={newTodo.description}
        onChange={handleChange}
      />
      <input
        className="dueDate"
        type="date"
        placeholder="Due Date"
        name="dueDate"
        value={new Date(newTodo.dueDate).toISOString().slice(0, 10)}
        onChange={handleChange}
      />
      <label htmlFor="quantity"></label>
      <input
        className="priority"
        type="number"
        name="priority"
        placeholder="priority..."
        id="quantity"
        min="1"
        max="5"
        value={newTodo.priority}
        onChange={handleChange}
      />
      <button className="addButton">+</button>
    </form>
  );
}

export default TodoForm;