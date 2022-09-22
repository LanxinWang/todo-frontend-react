import "./component/TodoInput";
import TodoInput from "./component/TodoInput";
import TodoList from "./component/TodoList";
import TodoMenu from "./component/TodoMenu";
import { useState } from "react";
import TODO_STATUS, { TITLE, TODO_MENU, ENTER_KEY } from "./constants";
import remove from "lodash.remove";
import { Div, Footer, H1 } from "./style";
let todoId = 0;
function App() {
  const [todos, setTodos] = useState([]);
  const [selectedTodoStatusOption, setSelectedTodoStatusOption] = useState(
    TODO_MENU.ALL
  );

  const addTodo = (content, keyCode) => {
    if (content.trim() === "" || keyCode !== ENTER_KEY) return;
    let newTodo = {
      id: todoId++,
      status: TODO_STATUS.ACTIVE,
      content,
    };
    setTodos([newTodo, ...todos]);
    document.getElementById("new-todo-input").value = "";
  };

  const deleteTodo = (todoId) => {
    setTodos(todos.filter((todo) => todo.id !== todoId));
  };

  const toggleAll = (toggleFlag) => {
    setTodos(
      todos.map((todo) => {
        todo.status = toggleFlag ? TODO_STATUS.COMPLETED : TODO_STATUS.ACTIVE;
        return todo;
      })
    );
  };

  const checkTodo = (isChecked, todoId) => {
    let todoPosition = todos.findIndex((todo) => todo.id === parseInt(todoId));
    todos[todoPosition].status = isChecked
      ? TODO_STATUS.COMPLETED
      : TODO_STATUS.ACTIVE;
    setTodos([...todos]);
  };

  const clearCompletedTodo = () => {
    remove(todos, (todo) => todo.status === TODO_STATUS.COMPLETED);
    setTodos([...todos]);
  };

  return (
    <div>
      <header>
        <H1>{TITLE}</H1>
      </header>
      <Div id="todo-main">
        <TodoInput
          addTodo={addTodo}
          toggleAll={toggleAll}
          todoLength={todos.length}
        />
        <TodoList
          todos={todos}
          deleteTodo={deleteTodo}
          checkTodo={checkTodo}
          selectedTodoStatusOption={selectedTodoStatusOption}
        />
        <TodoMenu
          todos={todos}
          setSelectedTodoStatusOption={(selectedTodoStatusOption) => {
            setSelectedTodoStatusOption(selectedTodoStatusOption);
          }}
          selectedTodoStatusOption={selectedTodoStatusOption}
          clearCompletedTodo={clearCompletedTodo}
        />
      </Div>
      <Footer id="info">
        <p>Double-click to edit a todo</p>
        <p>
          Create by <a href="http://github.com/petehunt/">petehunt</a>
        </p>
        <p>
          Part of <a href="http://todomvc.com">TodoMVC</a>
        </p>
      </Footer>
    </div>
  );
}

export default App;
