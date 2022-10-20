import { ChangeEvent, KeyboardEvent } from "react";
import TODO_STATUS, { ENTER_KEY } from "../../constants/constants";
import {
  ToggleAllLabel,
  TodoHeaderContainer,
  NewTodoInput,
  ToggleAllCheckbox,
} from "./styles";
import { createTodo, updateAllTodosStatus} from "../../store/TodoSlice";
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from "../../store/store";

const TodoHeader = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todo.todoList);
  const completedTodosNumber = todos.filter((todo) => 
  todo.status === TODO_STATUS.COMPLETED).length;
  const deletedTodosNumber = todos.filter((todo) => 
  todo.status === TODO_STATUS.DELETED).length;
  
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
