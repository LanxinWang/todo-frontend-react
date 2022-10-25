import { ChangeEvent, KeyboardEvent } from "react";
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
  
  const handleChange = (checkFlag:boolean) => {
    dispatch(updateAllTodosStatus({checkFlag}));
  };
  const handleKeyDown = (e:KeyboardEvent<HTMLInputElement>) => {
    let name = (e.target as HTMLInputElement).value.trim();
    if (e.key === ENTER_KEY) {
      name !== "" && dispatch(createTodo({name}));
      (e.target as HTMLInputElement).value = "";
    }
  };

  return (
    <TodoHeaderContainer>
      <ToggleAllCheckbox
        id="toggle-all"
        completedTodosNumber={completedTodosNumber}
        deletedTodosNumber={deletedTodosNumber}
        todosNumber={todos.length}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e.target.checked)}
      />
      <ToggleAllLabel htmlFor="toggle-all"
      todosNumber={todos.length}
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
