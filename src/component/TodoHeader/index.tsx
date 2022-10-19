import { ChangeEvent, KeyboardEvent } from "react";
import { ENTER_KEY } from "../../constants/constants";
import {
  ToggleAllLabel,
  TodoHeaderContainer,
  NewTodoInput,
  ToggleAllCheckbox,
} from "./styles";
import { createTodo} from "../../store/TodoSlice";
import { useDispatch } from 'react-redux'
export interface TodoHeaderProps {
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
}:TodoHeaderProps)=>
 {
  const dispatch = useDispatch();
  const handleChange = (checkFlag:boolean) => {
    onToggleAllTodos(checkFlag);
  };
  const handleKeyDown = (e:KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ENTER_KEY) {
      dispatch(createTodo({name: (e.target as HTMLInputElement).value}));
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
