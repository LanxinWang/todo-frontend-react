import React from "react";
import TODO_STATUS from "../../constants";
import { Ul, ToggleInput, ToggleLabel, P, DestroyButton } from "./style";

function TodoList({ todos, deleteTodo, checkTodo }) {
  return (
    <div id="show-todo">
      <Ul>
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            <ToggleInput
              id={todo.id}
              checked={todo.status === TODO_STATUS.COMPLETED ? true : false}
              onChange={(e) => {
                checkTodo(e.target.checked, e.target.id);
              }}
            />
            <ToggleLabel htmlFor={todo.id} />
            <P className={todo.status}>{todo.name}</P>
            <DestroyButton onClick={() => deleteTodo(todo.id)}>×</DestroyButton>
          </li>
        ))}
      </Ul>
    </div>
  );
}

export default TodoList;
