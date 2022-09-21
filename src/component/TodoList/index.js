import React from "react";
import { TODO_MENU } from "../../constants";
import { Ul, ToggleInput, ToggleLabel, P, DestroyButton } from "./style";

function TodoList({ todos, deleteTodo, checkTodo, selectedTodoStatusOption }) {
  const TodosByStatusOption = () => {
    if (selectedTodoStatusOption === TODO_MENU.ALL) {
      return todos;
    }
    return todos.filter((todo) => todo.status === selectedTodoStatusOption);
  };

  return (
    <div id="show-todo">
      <Ul>
        {TodosByStatusOption().map((todo) => (
          <li key={todo.id}>
            <div className="todo-item">
              <ToggleInput
                id={todo.id}
                onChange={(event) => {
                  checkTodo(event.target.checked, event.target.id);
                }}
                todoStatus={todo.status}
              />
              <ToggleLabel htmlFor={todo.id} />
              <P className={todo.status}>{todo.content}</P>
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
