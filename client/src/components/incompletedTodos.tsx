import { ITodo } from '../interface';
import { BiTrash, BiPencil } from "react-icons/bi";
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

  const TodoListIncompleted: React.FC<{ todos: TodoProps[] }> = ({todos}) => {
  return(
    <div>
        {
            todos.map((todo) => (
                <div className={"todo" + (todo.todo.completed ? " completed" : "")} key={todo.todo._id} >
                  {todo.popupActive ? (
                    <div className="popupActive">
                      <div className="popup">
                        <div className="closePopup" onClick={() => todo.setPopupActive(false)}>X</div>
                        <div className="content">
                          <h3>Edit Task</h3>
                            <input className="edit-inputTitle"
                              type = "text"
                              name = "title"
                              placeholder="Edit title..."
                              value = {todo.editingText.title}
                              onChange={todo.handleChangeEdit}
                            />
        
                            <input className = "edit-inputDescription"
                              type = "text"
                              name = "description"
                              placeholder="Edit description..."
                              value = {todo.editingText.description}
                              onChange={todo.handleChangeEdit}
                            />
        
                            <input className="edit-dueDate"
                              type = "date"
                              name = "dueDate"
                              value = {new Date(todo.editingText.dueDate).toISOString().slice(0, 10)}
                              onChange={todo.handleChangeEdit}
                            />
        
                            <input className="edit-priority"
                              type="number"
                              name="priority"
                              placeholder="Edit priority..."
                              id="quantity"
                              min = "1"
                              max = "5"
                              value = {todo.editingText.priority}
                              onChange={todo.handleChangeEdit}/>
                          
                            <button className="submitEditButton" onClick={() => {
                              if(todo.todo._id) {
                                todo.editTodo(todo.todoEditing)
                              }
                            }}>Submit</button>
                        </div>
                      </div>
        
                        <div className="wrapper-popupActive">
                          <div className="collabsible-popupActive">
                              <input type = "checkbox" id = {todo.todo._id}/>
                            <label htmlFor= {todo.todo._id}>  
                              <div className="title">
                                <div><h3>todo:</h3> {todo.todo.title}</div>
                                <div className="delete-todo">
                                  <BiTrash/>
                                </div>
        
                                <div className="edit-todo">
                                  <BiPencil/>
                                </div>
        
                              </div>
                            </label>
                            <div className="collabsible-text">
                              
                            </div>
        
                          </div>
                        </div>
                      </div>
                    
                  ) : (              
                  <div className="secondContainer">
              
        
                    <div className="wrapper">
                      <div className="finish_todo" onClick={() => {
                        if (todo.todo._id) {
                          todo.toggleComplete(todo.todo._id)
                        }
                        }}>
                          <div className="check">
                            <CgCheckR/>
                          </div>
                      </div>
                      <div className="collabsible">
                          <input type = "checkbox" id = {todo.todo._id}/>
                        <label htmlFor= {todo.todo._id}>  
                          <div className="title">
                            <div><h3>todo:</h3> {todo.todo.title}</div>
                            <div className="delete-todo" onClick={() => {
                                if (todo.todo._id) {
                                  todo.handleDelete(todo.todo._id)
                                }
                              }}>
                              <BiTrash/>
                            </div>
        
                            <div className="edit-todo" onClick={() => {
                                if (todo.todo._id) {
                                  todo.setTodoEditing(todo.todo._id)
                                  todo.handleEdit(todo.todo, todo.todo._id)
                                }
                                todo.setPopupActive(true)
                              }}>
                              <BiPencil/>
                            </div>
        
                          </div>
                        </label>
                        <div className="collabsible-text">
                          <div className="line-0"></div>
        
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
              
                  </div>)}
                </div>                
              ))
        }
    </div>
  );
};

export default TodoListIncompleted;
