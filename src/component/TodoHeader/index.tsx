import { ChangeEvent, KeyboardEvent } from "react";
import { ENTER_KEY } from "../../constants/constants";
import {
  ToggleAllLabel,
  TodoHeaderContainer,
  NewTodoInput,
  ToggleAllCheckbox,
} from "./styles";

interface Props {
  onAddTodo:(name:string) => void,
  onToggleAllTodos:(checkFlag:boolean) => void,
  todosNumber:number,
  activeTodosNumber:number,
}

const TodoHeader =({
  onAddTodo,
  onToggleAllTodos,
  todosNumber,
  activeTodosNumber,
}:Props)=>
 {
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
        activeTodosNumber={activeTodosNumber}
        onChange={(e:ChangeEvent<HTMLInputElement>) => handleChange(e.target.checked)}
      />
      <ToggleAllLabel htmlFor="toggle-all"
      todosNumber={todosNumber}
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
