import "./component/TodoHeader";
import TodoHeader from "./component/TodoHeader";
import TodoListBody from "./component/TodoListBody";
import TodoFooter from "./component/TodoFooter";
import { useState } from "react";
import TODO_STATUS, { TITLE, TODO_MENU } from "./constants/constants";
import {Todo} from "./types"
import { TodoApp, TodoList, Footer, H1 } from "./style";
import { useLocalStorage } from "./hooks/useLocalStorage";
import {useSelector} from "react-redux";
import {RootState} from "./store/store";

function App() {
  const [todos, setTodos] = useLocalStorage("todos", []);
  const [selectedTodoStatusOption, setSelectedTodoStatusOption] = useState(
    TODO_MENU.ALL
  );

  const TodosByStatusOption =
    selectedTodoStatusOption === TODO_MENU.ALL
      ? todos
      : todos.filter((todo) => todo.status === selectedTodoStatusOption);

  const selectedTodos:Todo[] = useSelector((state: RootState) => state.todo.todoList);

  return (
    <TodoApp>
      <header>
        <H1>{TITLE}</H1>
      </header>
      <TodoList>
        <TodoHeader
          activeTodosNumber={
            selectedTodos.filter((todo) => todo.status === TODO_STATUS.ACTIVE).length
          }
          todosNumber={selectedTodos.length}
        />
        <TodoListBody
          todos={selectedTodos}
        />
        <TodoFooter

          todos={selectedTodos}
          onSetSelectedTodoStatusOption={(selectedTodoStatusOption) => {
            setSelectedTodoStatusOption(selectedTodoStatusOption);
          }}
          selectedTodoStatusOption={selectedTodoStatusOption}
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
