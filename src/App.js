import './App.css';
import './component/TodoAdd';
import TodoAdd from './component/TodoAdd';
import TodoList from './component/TodoList';
import TodoCount from './component/TodoCount';
import { useEffect,useState } from 'react';
import TODO_STATUS, { TITLE } from './constantValue';
function App() {
  const [todos, setTodos] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(()=>{
    console.log(todos);
  },[todos])

  const addTodoItem = (content) => {
    setTodos([{
      index,
      status:TODO_STATUS.ACTIVE,
      content
    },...todos]);
    setIndex(index + 1 );
  }

  const toggleAll = (toggleFlag) => {
    setTodos(todos.map(todo =>{
      todo.status = toggleFlag ? TODO_STATUS.COMPLETED : TODO_STATUS.ACTIVE
      return todo;
    }))
  }  

  return (
    <div className="TODO">
      <header id='title'><h1>{TITLE}</h1></header>
      <div id='todo-app'>
        <TodoAdd getNewItem = {addTodoItem} toggleAll={toggleAll} todoLength={todos.length}/>
        <TodoList {...todos}/>
        <TodoCount {...todos}/>
      </div>
      <footer id='info'>
        <p>Double-click to edit a todo</p>
          <p>Create by <a href="http://github.com/petehunt/">petehunt</a></p>
        <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
      </footer> 
    </div>
  );
}

export default App;
