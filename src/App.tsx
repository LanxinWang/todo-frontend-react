import "./component/TodoHeader";
import TodoHeader from "./component/TodoHeader";
import TodoListBody from "./component/TodoListBody";
import TodoFooter from "./component/TodoFooter";
import { useState } from "react";
import { TITLE, TODO_MENU } from "./constants/constants";
import {Todo} from "./types"
import { TodoApp, TodoList, Footer, H1 } from "./style";
import { useQuery } from "@apollo/client";
import { GET_TODOS } from "./graphqlApi";
function App() {
  const [selectedTodoStatusOption, setSelectedTodoStatusOption] = useState(TODO_MENU.ALL);  
  const { data } = useQuery(GET_TODOS);
  const todos: Todo[] = data?.todos || [];  
  return (
    <TodoApp>
      <header>
        <H1>{TITLE}</H1>
      </header>
      <TodoList>
        <TodoHeader
          todos={todos}
        />
        <TodoListBody
          todos={todos}
          selectedTodoStatusOption={selectedTodoStatusOption}
        />
        <TodoFooter
          todos={todos}
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
