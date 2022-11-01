import { ChangeEvent, KeyboardEvent } from "react";
import TODO_STATUS, { ENTER_KEY } from "../../constants/constants";
import { Todo } from "../../types";
import {
  ToggleAllLabel,
  TodoHeaderContainer,
  NewTodoInput,
  ToggleAllCheckbox,
} from "./styles";

export interface TodoHeaderProps {
  onAddTodo:(name:string) => void,
  onToggleAllTodos:(checkFlag:boolean) => void,
  todos:Todo[],
}

const TodoHeader =({
  onAddTodo,
  onToggleAllTodos,
  todos,
}:TodoHeaderProps)=>
 {
  const todoNumber = todos.length;
  const completedTodosNumber = todos.filter((todo) => todo.status === TODO_STATUS.COMPLETED).length;
  const deletedTodosNumber = todos.filter((todo) => todo.status === TODO_STATUS.DELETED).length;

  const handleChange = (checkFlag:boolean) => {
    onToggleAllTodos(checkFlag);
  };
  const handleKeyDown = (e:KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ENTER_KEY) {
      onAddTodo((e.target as HTMLInputElement).value);
      (e.target as HTMLInputElement).value = "";
    }
  };

  return (
    <TodoHeaderContainer>
      <ToggleAllCheckbox
        id="toggle-all"
        todosNumber={todoNumber}
        deletedTodosNumber={deletedTodosNumber}
        completedTodosNumber={completedTodosNumber}
        onChange={(e:ChangeEvent<HTMLInputElement>) => handleChange(e.target.checked)}
      />
      <ToggleAllLabel htmlFor="toggle-all"
      todosNumber={todos.length}
      deletedTodosNumber={deletedTodosNumber}
       >
        ❯
      </ToggleAllLabel>
      <NewTodoInput 
      id="new-todo-input" 
      onKeyDown={(e:KeyboardEvent<HTMLInputElement>) => handleKeyDown(e)} />
    </TodoHeaderContainer>
  );
}

export default TodoHeader;
