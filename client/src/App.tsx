import React, {useState, useEffect } from "react";
import { ITodo } from "./interface";
import axios, * as others from 'axios';
import TodoListIncompleted from "./components/incompletedTodos";
import {TodoProps} from "./components/incompletedTodos"
import TodoListCompleted from "./components/completedTodos";
import TodoForm from "./components/inputForm";
import FeatureBar from "./components/featureBar";



const api_base = 'http://localhost:3000';

function App () {
  const [popupActive, setPopupActive] = useState<boolean>(false);
  const [messagePupActive, setMessagePopupActive] = useState<boolean>(false);
  const [newTodo, setNewTodo] = useState<ITodo>({ 
    title: '',
    description: '',
    priority: 1,
    completed: false,
    dueDate: new Date()
  });
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [todoEditing, setTodoEditing] = useState<string>(""); //id
  const [editingText, setEditingText] = useState<ITodo>({
    title: '',
    description: '',
    priority: 1,
    completed: false,
    dueDate: new Date()
  });

  const [sortByDate, setSortByDate] = useState<boolean>(false);
  const [sortByPriority, setSortByPriority] = useState<boolean>(false);
  const [findTodoInput, setFindTodoInput] = useState<string>("");

  const completedTodos = todos.filter(todo => todo.completed);
  const inCompletedTodos = todos.filter(todo => !todo.completed);
  const reverseIncompletedTodos = inCompletedTodos.slice().reverse();

  const tl = (sortByDate || sortByPriority) && !messagePupActive
  ? inCompletedTodos
  : messagePupActive
    ? []
    : reverseIncompletedTodos;


  useEffect(() => {
    axios
      .get("http://localhost:3000/todos")
      .then((response) => setTodos(response.data))
      .catch((error) => console.error(error));
  }, []);

  const addTodo = () => {
    axios.post('http://localhost:3000/todos', newTodo).then((response) => {
      const newTodo = response.data;
      setTodos(todos => [...todos, newTodo]);
      setNewTodo({     
        title: '',
        description: '',
        priority: 1,
        completed: false,
        dueDate: new Date()
      });
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo({
      ...newTodo,
      [event.target.name]: event.target.value,
    });
  };


  const handleChangeEdit = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditingText({
      ...editingText,
      [event.target.name]: event.target.value,
    });
  };

  const handleEdit = (todo: ITodo, id: string) => {
    if (todo._id === id) {
      setEditingText(todo)
    }
  }

  const handleDelete = (id: string) => {
    axios
      .delete(`http://localhost:3000/todos/${id}`)
      .then(() => {
        setTodos(todos.filter((todo) => todo._id !== id));
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addTodo();
  };


  const toggleComplete = (id: string) => {
    const todo = todos.find(todo => todo._id === id);
    if (!todo) return;
  
    const updatedTodo = {
      ...todo,
      completed: !todo.completed
    };
  
    axios.put(`http://localhost:3000/todos/${id}`, updatedTodo)
      .then(response => {
        setTodos(prevState => {
          const updatedTodos = prevState.map(todo => {
            if (todo._id === id) {
              return response.data;
            }
            return todo;
          });
          return updatedTodos;
        });
      })
      .catch(error => console.error(error));
  };

  const editTodo = (id:string) => {
    axios
    .put(`http://localhost:3000/todos/${id}`, editingText)
    .then((response) => {
      setTodos(prevState => {
        const updatedTodos = prevState.map((todo) => {
          if (todo._id === id) {
            return {
              ...todo,
              title: editingText.title,
              description: editingText.description ?? todo.description,
              dueDate: editingText.dueDate ?? todo.dueDate,
              priority: editingText.priority ?? todo.priority,
              completed: editingText.completed ?? todo.completed
            };
          }
          return todo
        });
        console.log(updatedTodos)
        return updatedTodos;
      });
    });

    setTodoEditing("")

    setEditingText({
      title: '',
      description: '',
      priority: 1,
      completed: false,
      dueDate: new Date()
    });

    setPopupActive(false);
  };

  const sortTodosByDate = () => {
    axios
    .patch(`http://localhost:3000/todos/`)
    .then((response) => {setTodos(response.data)})
    .catch((error) => console.error(error));
    
    setSortByDate(true);
  };

  const handleSortDateClick = () => {
    sortTodosByDate();
  };

  const sortTodosByPriority = () => {
    axios
    .get(`http://localhost:3000/todos/prioritizeToDo`)
    .then((response) => {
      setSortByDate(false);
      setTodos(response.data)})
    .catch((error) => console.error(error));
    
    setSortByPriority(true);
  };

  const handleSortPriorityClick = () => {
    sortTodosByPriority();
  };

  const handleSortDefault = () => {
    axios
      .get("http://localhost:3000/todos")
      .then((response) => {
        setSortByDate(false);
        setSortByPriority(false);
        setTodos(response.data)})
      .catch((error) => console.error(error));
  };

  const findTodo = (title: string) => {
    axios
      .get(`http://localhost:3000/todos/findTodo/${title}`)
      .then((response) => {
        console.log(response)
        setTodos(response.data)
      }).catch((error:404) => 
      {
        setMessagePopupActive(true)
      })
      .catch((error) => error)

      setFindTodoInput('');
  }

  const handleFindTodoInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFindTodoInput(e.target.value);
  };

  const handleFindSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(findTodoInput)
    findTodo(findTodoInput);
  };

  const incompletedTodoProps: TodoProps[] = tl.map((todo: ITodo) => {
    return {
      todo,
      setPopupActive,
      editingText,
      handleChangeEdit,
      editTodo,
      toggleComplete,
      handleDelete,
      setTodoEditing,
      todoEditing,
      todos,
      popupActive,
      handleEdit
    };
  });


  const completedTodoProps: TodoProps[] = completedTodos.map((todo: ITodo) => {
    return {
      todo,
      setPopupActive,
      editingText,
      handleChangeEdit,
      editTodo,
      toggleComplete,
      handleDelete,
      setTodoEditing,
      todoEditing,
      todos,
      popupActive,
      handleEdit
    };
  });
  

  return(
    <div className = "App">
      {popupActive || messagePupActive? (      
        <div className="popupTitle">
          <div className="container">
          <h1>ToDos</h1>
            <div className="input-disable">
              <TodoForm handleSubmit={handleSubmit} handleChange={handleChange} newTodo={newTodo} />
              <FeatureBar
                sortByDate = {sortByDate}
                sortByPriority = {sortByPriority}
                handleSortDefault = {handleSortDefault}
                handleSortDateClick = {handleSortDateClick}
                handleSortPriorityClick = {handleSortPriorityClick}
                handleFindSubmit = {handleFindSubmit}
                handleFindTodoInputChange = {handleFindTodoInputChange}
                findTodoInput = {findTodoInput}
              />
            </div>
          </div>
        </div>
      ) : (     
        <div className="container">
          <h1>TODOS</h1>
          <div className="top">
            <TodoForm handleSubmit={handleSubmit} handleChange={handleChange} newTodo={newTodo} />
            <div className="note">5 is most important</div>
          </div>
          <FeatureBar
                sortByDate = {sortByDate}
                sortByPriority = {sortByPriority}
                handleSortDefault = {handleSortDefault}
                handleSortDateClick = {handleSortDateClick}
                handleSortPriorityClick = {handleSortPriorityClick}
                handleFindSubmit = {handleFindSubmit}
                handleFindTodoInputChange = {handleFindTodoInputChange}
                findTodoInput = {findTodoInput}
              />
      </div>
      )}
      
      <div className="container">
        <div className="todo">
          {messagePupActive ? (
            <div className="popupActive">
              <div className="popup">
              <div className="content">
                <h3>Sorry there are no todos matching!</h3>
              </div>
                <div className="closePopup" onClick={() => setMessagePopupActive(false)}>X</div>
              </div>
            </div>
          ) : ''}
          {tl.length > 0? (<TodoListIncompleted todos={incompletedTodoProps} />):(
            <div className="incompleted-todos">
              {!completedTodos.length && !messagePupActive? (<p className="noTask"><h2>You currently have no tasks</h2></p>) : ("")}
            </div>
          )}
        </div>

        {tl.length > 0 && completedTodos.length >0? (<div className="line-1"></div>) :("")}

        <div className="todo">
          <div className="completed-todos">
            {completedTodos.length > 0 && !messagePupActive?  (<TodoListCompleted todos={completedTodoProps} />):("")}
            {completedTodos.length > 0 && tl.length == 0 && !popupActive && !messagePupActive? (<div className="listedTodosFinished">The listed todos are finished!</div>) : ("")}
          </div>
        </div>
      </div>
    </div>
  )
};
  


export default App;