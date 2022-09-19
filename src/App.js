import './App.css';

function App() {
  return (
    <div className="TODO">
      <header id='title'><h1>todos</h1></header>
      <div id='todo-app'>
        <todo-add />
        <todo-list />
        <todo-count />
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
