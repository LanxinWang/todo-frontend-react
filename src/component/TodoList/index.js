import React from "react";
import TODO_STATUS, { TODO_MENU } from "../../constants";
import "./index.css";

function TodoList({ todos, deleteTodo, checkTodo, todoStatus }) {
  const renderTodoItems = () => {
    if (todoStatus === TODO_MENU.ALL) {
      return todos;
    }
    return todos.filter((todo) => todo.status === todoStatus);
  };

  const handleCheck = (event) => {
    checkTodo(event.target.checked, event.target.id);
  };

  return (
    <div id="show-todo">
      <ul id="todo-list">
        {renderTodoItems().map((todo) => (
          <li key={todo.id}>
            <div className="todo-item">
              <input
                className="toggle"
                type="checkbox"
                id={todo.id}
                onChange={handleCheck}
                checked={todo.status === TODO_STATUS.ACTIVE ? false : true}
              />
              <label htmlFor={todo.id} />
              <p className={todo.status}>{todo.content}</p>
              <button className="destroy" onClick={() => deleteTodo(todo.id)}>
                ×
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
