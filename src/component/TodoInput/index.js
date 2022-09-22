import React from "react";
import { Label, Div, NewTodoInput, ToggleAllInput } from "./styles";

const TodoAdd = ({ addTodo, toggleAll, todoLength }) => {
  return (
    <Div>
      <ToggleAllInput
        id="toggle-all"
        onChange={(e) => toggleAll(e.target.checked)}
      />
      <Label htmlFor="toggle-all" todoLength={todoLength}>
        ❯
      </Label>
      <NewTodoInput
        id="new-todo-input"
        onKeyDown={(e) => addTodo(e.target.value, e.key)}
      ></NewTodoInput>
    </Div>
  );
};

export default TodoAdd;
