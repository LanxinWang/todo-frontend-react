import "./component/TodoInput";
import TodoInput from "./component/TodoInput";
import TodoList from "./component/TodoList";
import TodoMenu from "./component/TodoMenu";
import { useState } from "react";
import TODO_STATUS, { TITLE, TODO_MENU } from "./constants";
import remove from "lodash.remove";
import { Div, Footer, H1 } from "./style";
import { useLocalStorage } from "./useLocalStorage";
function App() {
  const [todos, setTodos] = useLocalStorage("todos", []);
  const [selectedTodoStatusOption, setSelectedTodoStatusOption] = useState(
    TODO_MENU.ALL
  );

  const addTodo = (name) => {
    if (name.trim() === "") return;
    setTodos([
      {
        id: Date.now(),
        status: TODO_STATUS.ACTIVE,
        name,
      },
      ...todos,
    ]);
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
    let todoIndex = todos.findIndex((todo) => todo.id === parseInt(todoId));
    todos[todoIndex].status = isChecked
      ? TODO_STATUS.COMPLETED
      : TODO_STATUS.ACTIVE;
    setTodos([...todos]);
  };

  const clearCompletedTodo = () => {
    remove(todos, (todo) => todo.status === TODO_STATUS.COMPLETED);
    setTodos([...todos]);
  };

  const TodosByStatusOption =
    selectedTodoStatusOption === TODO_MENU.ALL
      ? todos
      : todos.filter((todo) => todo.status === selectedTodoStatusOption);

  return (
    <div>
      <header>
        <H1>{TITLE}</H1>
      </header>
      <Div id="todo-main">
        <TodoInput
          activeTodoLength={
            todos.filter((todo) => todo.status === TODO_STATUS.ACTIVE).length
          }
          addTodo={addTodo}
          toggleAll={toggleAll}
          todoLength={todos.length}
        />
        <TodoList
          todos={TodosByStatusOption}
          deleteTodo={deleteTodo}
          checkTodo={checkTodo}
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
