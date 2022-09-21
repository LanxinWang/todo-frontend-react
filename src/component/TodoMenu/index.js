import React from "react";
import TODO_STATUS from "../../constants";
import { TODO_MENU } from "../../constants";
import { TodoMenuDiv, FilterUl, ClearButton, MenuButton } from "./style";

const todoMenu = [TODO_MENU.ALL, TODO_MENU.ACTIVE, TODO_MENU.COMPLETED];

function TodoMenu({
  todos,
  setSelectedTodoStatusOption,
  selectedTodoStatusOption,
  clearCompletedTodo,
}) {
  return (
    <TodoMenuDiv todoLength={todos.length}>
      <span>
        <strong>
          {todos.filter((todo) => todo.status === TODO_STATUS.ACTIVE).length}
        </strong>
        <span> items left</span>
      </span>

      <FilterUl>
        {todoMenu.map((statusOption) => (
          <li key={statusOption}>
            <MenuButton
              id={statusOption}
              selectedTodoStatusOption={selectedTodoStatusOption}
              onClick={(event) => {
                setSelectedTodoStatusOption(event.target.id);
              }}
            >
              {statusOption}
            </MenuButton>
          </li>
        ))}
      </FilterUl>
      <ClearButton onClick={clearCompletedTodo}>Clear completed</ClearButton>
    </TodoMenuDiv>
  );
}

export default TodoMenu;
