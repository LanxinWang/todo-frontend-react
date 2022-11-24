import "./component/TodoHeader";
import TodoHeader from "./component/TodoHeader";
import TodoListBody from "./component/TodoListBody";
import TodoFooter from "./component/TodoFooter";
import { useState } from "react";
import TODO_STATUS, { TITLE, TODO_MENU } from "./constants/constants";
import {Todo} from "./types"
import { TodoApp, TodoList, Footer, H1 } from "./style";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_A_TODO, DELETE_ALL_COMPLETED_TODOS, DELETE_A_TODO, GET_TODOS, UPDATE_ALL_TODOS, UPDATE_A_TODO } from "./graphqlApi";
function App() {
  const [selectedTodoStatusOption, setSelectedTodoStatusOption] = useState(TODO_MENU.ALL);  
 const { data } = useQuery(GET_TODOS);
 const [ addATodo ] = useMutation(ADD_A_TODO);
 const [ deleteATodo ] = useMutation(DELETE_A_TODO);
 const [ deleteAllCompletedTodos ] = useMutation(DELETE_ALL_COMPLETED_TODOS);
 const [ updateATodoStatus ] = useMutation(UPDATE_A_TODO);
 const [ updateAllTodoStatus ] = useMutation(UPDATE_ALL_TODOS);

 const todos: Todo[] = data?.todos || [];

  const addTodo = (name: string) => {
    if (name.trim() === "") return;
    addATodo({ variables: { id: `${todos.length}`, status: TODO_STATUS.ACTIVE, name } });
  };

  const deleteTodo = (_id: number) => {
    deleteATodo({ variables: { id: `${_id}`} })
  };

  const toggleAllTodos = (checkFlag: boolean) => {
    const updateIds = todos.filter(todo => todo.status !== TODO_STATUS.DELETED).map(todo => `${todo._id}`);
    updateAllTodoStatus( { variables: {updateIds: updateIds, isChecked: checkFlag }} )
  };

  const toggleTodo = (isChecked: boolean, _id: number) => {
    updateATodoStatus( {variables: {id: `${_id}`, isChecked}} )
  };

  const clearCompletedTodos = () => {
    const deletedIds = todos
    .filter(todo => todo.status === TODO_STATUS.COMPLETED)
    .map(todo => `${todo._id}`);
    deleteAllCompletedTodos( { variables: { deletedIds } } )
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
          onAddTodo={addTodo}
          onToggleAllTodos={toggleAllTodos}
          todos={todos}
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
