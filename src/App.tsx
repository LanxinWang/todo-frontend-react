import "./component/TodoHeader";
import TodoHeader from "./component/TodoHeader";
import TodoListBody from "./component/TodoListBody";
import TodoFooter from "./component/TodoFooter";
import TODO_STATUS, { TITLE} from "./constants/constants";
import {Todo} from "./types"
import { TodoApp, TodoList, Footer, H1 } from "./style";
import {useSelector} from "react-redux";
import {RootState} from "./store/store";

function App() {
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
        <TodoListBody/>
        <TodoFooter
          todos={selectedTodos} />
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
