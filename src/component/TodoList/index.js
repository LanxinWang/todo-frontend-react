import React from "react";
import { Ul, ToggleInput, ToggleLabel, P, DestroyButton } from "./style";

function TodoList({ todos, deleteTodo, checkTodo }) {
  return (
    <div id="show-todo">
      <Ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <div className="todo-item">
              <ToggleInput
                id={todo.id}
                onChange={(e) => {
                  checkTodo(e.target.checked, e.target.id);
                }}
                todoStatus={todo.status}
              />
              <ToggleLabel htmlFor={todo.id}>
                <P className={todo.status}>{todo.name}</P>
              </ToggleLabel>
              <DestroyButton onClick={() => deleteTodo(todo.id)}>
                ×
              </DestroyButton>
            </div>
          </li>
        ))}
      </Ul>
    </div>
  );
}

export default TodoList;
