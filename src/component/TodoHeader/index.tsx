import { useState } from "react";
import { ENTER_KEY } from "../../constants/constants";
import {
  ToggleAllLabel,
  TodoHeaderContainer,
  NewTodoInput,
  ToggleAllCheckbox,
} from "./styles";
import { createTodo, selectCompletedTodos, selectDeletedTodos, selectTodos, updateAllTodosStatus} from "../../features/todos/TodoSlice";
import {useAppDispatch, useAppSelector} from "../../hooks"

const TodoHeader = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(selectTodos);
  const completedTodosNumber = useAppSelector(selectCompletedTodos).length;
  const deletedTodosNumber = useAppSelector(selectDeletedTodos).length;
  const [name, setName] = useState('')
  
  const handleChange = (checkFlag: boolean) => {
    dispatch(updateAllTodosStatus({checkFlag}));
  };

  const handleTodoInputChange = (name: string ) => {
    setName(name);
  }

  const handleKeyDown = (key: string, name: string) => {
    if (key === ENTER_KEY) {
      name.trim() !== "" && dispatch(createTodo({name}));
      setName('');
    }
  };
  console.log("todos:",todos);
  
  return (
    <TodoHeaderContainer>
      <ToggleAllCheckbox
        id="toggle-all"
        completedTodosNumber={completedTodosNumber}
        deletedTodosNumber={deletedTodosNumber}
        todosNumber={todos.length}
        onChange={(e) => handleChange(e.target.checked)}
      />
      <ToggleAllLabel htmlFor="toggle-all" todosNumber={todos.length} deletedTodosNumber={deletedTodosNumber}>
        ❯
      </ToggleAllLabel>
      <NewTodoInput 
      id="new-todo-input" 
      value = {name}
      onChange={(e) => handleTodoInputChange(e.target.value)}
      onKeyDown={(e) => handleKeyDown(e.key, name)} />
    </TodoHeaderContainer>
  );
}

export default TodoHeader;
