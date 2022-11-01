import "./component/TodoHeader";
import TodoHeader from "./component/TodoHeader";
import TodoListBody from "./component/TodoListBody";
import TodoFooter from "./component/TodoFooter";
import { useEffect, useState } from "react";
import TODO_STATUS, { TITLE, TODO_MENU } from "./constants/constants";
import {Todo} from "./types"
import { TodoApp, TodoList, Footer, H1 } from "./style";
import axios from "axios";
function App() {
  const BASE_URL = "http://localhost:5000/todos";

  const [todos, setTodos] = useState([] as Todo[]);
  const [selectedTodoStatusOption, setSelectedTodoStatusOption] = useState(
    TODO_MENU.ALL
  );  

  useEffect(()=>{
    axios.get(BASE_URL)
    .then((res) => {   
      setTodos(res.data)
    })
    .catch((e) => {console.log("error:",e);
    });
  },[]);

  const addTodo = async (name: string) => {
    if (name.trim() === "") return;
    let newTodo = {
      index: todos.length,
      status: TODO_STATUS.ACTIVE,
      name,
    };
    await axios.post(BASE_URL+'/create',{todo:newTodo}).then((res)=>{
      setTodos([newTodo,...todos])
      return res;
    }).catch((e)=>{
      console.log("Error:create a new todo:",e);
    });
  };

  const deleteTodo = async (index: number) => {
    await axios.post(BASE_URL+'/delete',{index}).then(()=>{
      setTodos(todos.map((todo) => {
        if(todo.index === index) {todo.status = TODO_STATUS.DELETED};
        return todo;
      }));
    }).catch((e)=>{
      console.log("Error:can not delete todo:",e);
    });
  };

  const toggleAllTodos = async (checkFlag: boolean) => {
    await axios.post(BASE_URL+'/updateAll',{checkFlag}).then(()=>{
      setTodos(
        todos.map((todo) => {
          if (todo.status !== TODO_STATUS.DELETED ) {
          todo.status = checkFlag ? TODO_STATUS.COMPLETED : TODO_STATUS.ACTIVE;
          }
          return todo;
        })
      );
    }).catch((e)=>{
      console.log("Error:can not toggle all todos:",e);
    });
  };

  const toggleTodo = async (isChecked: boolean, index: number) => {
    await axios.post(BASE_URL+'/update',{index, isChecked}).then(()=>{
      let todoIndex = todos.length - 1 - index;
      todos[todoIndex].status = isChecked
        ? TODO_STATUS.COMPLETED
        : TODO_STATUS.ACTIVE;
      setTodos([...todos]);
    }).catch((e)=>{
      console.log("Error:can not toggle todo:",e);
    });
  };

  const clearCompletedTodos = async () => {
    await axios.post(BASE_URL+'/deleteCompleted').then(()=>{
      setTodos(todos.map((todo) => {
        if (todo.status === TODO_STATUS.COMPLETED ) {
          todo.status = TODO_STATUS.DELETED;
        }
        return todo;
      }));
    }).catch((e)=>{
      console.log("Error:can not delete all completed todos:",e);
    });
  };

  const TodosByStatusOption =
    selectedTodoStatusOption === TODO_MENU.ALL
      ? todos.filter((todo) => todo.status !== TODO_STATUS.DELETED)
      : todos.filter((todo) => todo.status === selectedTodoStatusOption);

  return (
    <TodoApp>
      <header>
        <H1>{TITLE}</H1>
      </header>
      <TodoList>
        <TodoHeader
          activeTodosNumber={
            todos.filter((todo) => todo.status === TODO_STATUS.ACTIVE).length
          }
          onAddTodo={addTodo}
          onToggleAllTodos={toggleAllTodos}
          todosNumber={todos.length}
        />
        <TodoListBody
          todos={TodosByStatusOption}
          onDeleteTodo={deleteTodo}
          onToggleTodo={toggleTodo}
        />
        <TodoFooter
          todos={todos}
          onSetSelectedTodoStatusOption={(selectedTodoStatusOption) => {
            setSelectedTodoStatusOption(selectedTodoStatusOption);
          }}
          selectedTodoStatusOption={selectedTodoStatusOption}
          onClearCompletedTodos={clearCompletedTodos}
        />
      </TodoList>
      <Footer id="info">
        <p>Double-click to edit a todo</p>
        <p>
          Create by <a href="http://github.com/petehunt/">petehunt</a>
        </p>
        <p>
          Part of <a href="http://todomvc.com">TodoMVC</a>
        </p>
      </Footer>
    </TodoApp>
  );
}

export default App;
