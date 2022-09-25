import React from "react";
import { ENTER_KEY } from "../../constants";
import { Label, Div, NewTodoInput, ToggleAllInput } from "./styles";

const TodoAdd = ({ addTodo, toggleAll, todoLength, activeTodoLength }) => {
  return (
    <Div>
      <ToggleAllInput
        id="toggle-all"
        checked={activeTodoLength === 0 ? true : false}
        onChange={(e) => toggleAll(e.target.checked)}
      />
      <Label htmlFor="toggle-all" todoLength={todoLength}>
        ❯
      </Label>
      <NewTodoInput
        id="new-todo-input"
        onKeyDown={(e) => {
          if (e.key === ENTER_KEY) {
            addTodo(e.target.value);
            e.target.value = "";
          }
        }}
      ></NewTodoInput>
    </Div>
  );
};

export default TodoAdd;
