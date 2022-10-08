import React from "react";
import TODO_STATUS from "../../constants/constants";
import { TODO_MENU } from "../../constants/constants";
import {
  TodoFooterContainer,
  FilterMenu,
  ClearButton,
  MenuButton,
} from "./style";

const todoMenu = [TODO_MENU.ALL, TODO_MENU.ACTIVE, TODO_MENU.COMPLETED];

function TodoFooter({
  todos,
  selectedTodoStatusOption,
  onSetSelectedTodoStatusOption,
  onClearCompletedTodos,
}) {
  const handleMenuClick = (menuOption) => {
    onSetSelectedTodoStatusOption(menuOption);
  };

  const handleClearClick = () => {
    onClearCompletedTodos();
  };

  return (
    <TodoFooterContainer todoLength={todos.length}>
      <span>
        <strong>
          {todos.filter((todo) => todo.status === TODO_STATUS.ACTIVE).length}
        </strong>
        <span> items left</span>
      </span>

      <FilterMenu>
        {todoMenu.map((menuOption) => (
          <li key={menuOption}>
            <MenuButton
              id={menuOption}
              selectedTodoStatusOption={selectedTodoStatusOption}
              onClick={() => handleMenuClick(menuOption)}
            >
              {menuOption}
            </MenuButton>
          </li>
        ))}
      </FilterMenu>
      <ClearButton onClick={handleClearClick}>Clear completed</ClearButton>
    </TodoFooterContainer>
  );
}

export default TodoFooter;
