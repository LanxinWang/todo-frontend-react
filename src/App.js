import "./component/TodoHeader";
import TodoHeader from "./component/TodoHeader";
import TodoListBody from "./component/TodoListBody";
import TodoFooter from "./component/TodoFooter";
import { useState } from "react";
import TODO_STATUS, { TITLE, TODO_MENU } from "./constants/constants";
import remove from "lodash.remove";
import { TodoApp, TodoList, Footer, H1 } from "./style";
import { useLocalStorage } from "./hooks/useLocalStorage";
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

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleAllTodos = (checkFlag) => {
    setTodos(
      todos.map((todo) => {
        todo.status = checkFlag ? TODO_STATUS.COMPLETED : TODO_STATUS.ACTIVE;
        return todo;
      })
    );
  };

  const toggleTodo = (isChecked, id) => {
    let todoIndex = todos.findIndex((todo) => todo.id === Number(id));
    todos[todoIndex].status = isChecked
      ? TODO_STATUS.COMPLETED
      : TODO_STATUS.ACTIVE;
    setTodos([...todos]);
  };

  const clearCompletedTodos = () => {
    remove(todos, (todo) => todo.status === TODO_STATUS.COMPLETED);
    setTodos([...todos]);
  };

  const TodosByStatusOption =
    selectedTodoStatusOption === TODO_MENU.ALL
      ? todos
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
