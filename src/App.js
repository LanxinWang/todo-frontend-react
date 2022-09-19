import './App.css';
import './component/TodoAdd';
import TodoAdd from './component/TodoAdd';
import TodoList from './component/TodoList';
import TodoCount from './component/TodoCount';

function App() {
  return (
    <div className="TODO">
      <header id='title'><h1>todos</h1></header>
      <div id='todo-app'>
        <TodoAdd />
        <TodoList />
        <TodoCount />
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
