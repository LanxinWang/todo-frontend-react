import React from "react";
import TODO_STATUS from "../../constantValue";
import "./index.css";

const TODO_STATUS_OPTION_ALL = "all";
const CLASS_SELEVTED = "selected";
const todoStatusOptions = [
  TODO_STATUS_OPTION_ALL,
  TODO_STATUS.ACTIVE,
  TODO_STATUS.COMPLETED,
];

function TodoCount({
  todos,
  getTodoStatus,
  selectedTodoStatus,
  clearCompletedTodo,
}) {
  const handleClick = (event) => {
    event.target.className = CLASS_SELEVTED;
    getTodoStatus(event.target.id);
  };

  return (
    <div
      id="count-todo"
      style={{ display: todos.length > 0 ? "flex" : "none" }}
    >
      <span id="active-count">
        <strong>
          {todos.filter((todo) => todo.status === TODO_STATUS.ACTIVE).length}
        </strong>
        <span> items left</span>
      </span>

      <ul id="filters">
        {todoStatusOptions.map((statusOption) => (
          <li key={statusOption}>
            <button
              id={statusOption}
              onClick={handleClick}
              className={statusOption === selectedTodoStatus ? "selected" : ""}
            >
              {statusOption}
            </button>
          </li>
        ))}
      </ul>
      <button id="clear-completed" onClick={clearCompletedTodo}>
        Clear completed
      </button>
    </div>
  );
}

export default TodoCount;
