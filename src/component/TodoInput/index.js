import React from "react";
import TODO_STATUS, { ENTER_KEY } from "../../constants";
import { Label, Div, NewTodoInput, ToggleAllInput } from "./styles";
let todoId = 0;

const TodoAdd = ({ addTodo, toggleAll, todoLength }) => {
  const handleCheck = ({ target }) => {
    toggleAll(target.checked);
  };

  const handleOnKeyDown = (event) => {
    let content = event.target.value.trim();
    if (event.keyCode === ENTER_KEY && content !== "") {
      let newTodo = {
        id: todoId++,
        status: TODO_STATUS.ACTIVE,
        content,
      };
      addTodo(newTodo);
      event.target.value = "";
    }
  };

  return (
    <Div>
      <ToggleAllInput id="toggle-all" onChange={handleCheck} />
      <Label htmlFor="toggle-all" todoLength={todoLength}>
        ❯
      </Label>
      <NewTodoInput onKeyDown={handleOnKeyDown}></NewTodoInput>
    </Div>
  );
};

export default TodoAdd;
