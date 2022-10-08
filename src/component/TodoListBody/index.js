import React from "react";
import {
  TodoListBodyContainer,
  ToggleInput,
  ToggleLabel,
  P,
  DeleteButton,
} from "./style";

function TodoListBody({ todos, onDeleteTodo, onToggleTodo }) {
  const handleChange = (isToggled, todoId) => {
    onToggleTodo(isToggled, todoId);
  };
  const handleClick = (todoId) => {
    onDeleteTodo(todoId);
  };
  return (
    <TodoListBodyContainer>
      {todos.map((todo) => (
        <li key={todo.id} className="todo-item">
          <ToggleInput
            id={todo.id}
            todoStatus={todo.status}
            onChange={(e) => {
              handleChange(e.target.checked, e.target.id);
            }}
          />
          <ToggleLabel htmlFor={todo.id} />
          <P className={todo.status}>{todo.name}</P>
          <DeleteButton onClick={() => handleClick(todo.id)}>×</DeleteButton>
        </li>
      ))}
    </TodoListBodyContainer>
  );
}

export default TodoListBody;
