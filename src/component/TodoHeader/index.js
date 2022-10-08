import React from "react";
import { ENTER_KEY } from "../../constants/constants";
import {
  ToggleAllLabel,
  TodoHeaderContainer,
  NewTodoInput,
  ToggleAllCheckbox,
} from "./styles";

function TodoHeader({
  onAddTodo,
  onToggleAllTodos,
  todosNumber,
  activeTodosNumber,
}) {
  const onChange = (toggleAllFlag) => {
    onToggleAllTodos(toggleAllFlag);
  };
  const handleKeyDown = (e) => {
    if (e.key === ENTER_KEY) {
      onAddTodo(e.target.value);
      e.target.value = "";
    }
  };

  return (
    <TodoHeaderContainer>
      <ToggleAllCheckbox
        id="toggle-all"
        activeTodosNumber={activeTodosNumber}
        onChange={(e) => onChange(e.target.checked)}
      />
      <ToggleAllLabel htmlFor="toggle-all" todosNumber={todosNumber}>
        ❯
      </ToggleAllLabel>
      <NewTodoInput id="new-todo-input" onKeyDown={(e) => handleKeyDown(e)} />
    </TodoHeaderContainer>
  );
}

export default TodoHeader;
