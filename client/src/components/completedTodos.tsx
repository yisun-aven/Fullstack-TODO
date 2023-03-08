import { ITodo } from '../interface';
import {BiTrash} from "react-icons/bi";
import {CgCheckR} from "react-icons/cg";
import moment from "moment";


export interface TodoProps {
    todo: ITodo;
    setPopupActive: (active: boolean) => void;
    editingText: ITodo;
    handleChangeEdit: (event: React.ChangeEvent<HTMLInputElement>) => void;
    editTodo: (id: string) => void;
    toggleComplete: (id: string) => void;
    handleDelete: (id: string) => void;
    setTodoEditing: (id: string) => void;
    todoEditing: string;
    todos: ITodo[]
    popupActive: boolean;
    handleEdit: (todo: ITodo, id:string) => void;
  }

  const TodoListCompleted: React.FC<{ todos: TodoProps[] }> = ({todos}) => {
  return(
    <div>
       {todos.map((todo) => (
            <div className={"todo" + (todo.todo.completed ? " completed" : "")} key={todo.todo._id} >
              <div className="secondContainer">
                  <div className="finish_todo" onClick={() => {
                    if (todo.todo._id) {
                      todo.toggleComplete(todo.todo._id)
                    }
                    }}>
                      <div className="check">
                        <CgCheckR/>
                      </div>
                  </div>

                    <div className="wrapper-completed">
                      <div className="collabsible-completed">
                          <input type = "checkbox" id = {todo.todo._id}/>
                        <label htmlFor= {todo.todo._id}>  
                          <div className="title-completed">
                            <div><h3>todo:</h3> {todo.todo.title}</div>
                            <div className="delete-todo-completed" onClick={() => {
                                if (todo.todo._id) {
                                  todo.handleDelete(todo.todo._id)
                                }
                              }}>
                              <BiTrash/>
                            </div>

                          </div>
                        </label>
                        <div className="collabsible-text">
        
                    <div className="priority">
                      <p><h4>Priority:</h4> <h5>{todo.todo.priority}</h5></p>
                    </div>


                    <div className="dueDate">
                      <p><h4>Due:</h4></p>
                      <p><h5>{moment(todo.todo.dueDate).format('YYYY.MM.DD')}</h5></p>
                    </div>

                    <div className="description">
                      <p><h4>Desciption:</h4><h5>{todo.todo.description}</h5></p>
                    </div>
                  </div>
                      </div>
                    </div>
              </div>
            </div>                
            ))}
    </div>
  );
};

export default TodoListCompleted;
