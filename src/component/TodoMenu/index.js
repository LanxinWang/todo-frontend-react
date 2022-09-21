import React from "react";
import TODO_STATUS from "../../constants";
import "./index.css";
import { TODO_MENU } from "../../constants";

const todoMenu = [TODO_MENU.ALL, TODO_MENU.ACTIVE, TODO_MENU.COMPLETED];

function TodoCount({
  todos,
  setSelectedTodoStatusOption,
  selectedTodoStatusOption,
  clearCompletedTodo,
}) {
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
        {todoMenu.map((statusOption) => (
          <li key={statusOption}>
            <button
              id={statusOption}
              onClick={(event) => {
                setSelectedTodoStatusOption(event.target.id);
              }}
              className={
                statusOption === selectedTodoStatusOption ? "selected" : ""
              }
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
