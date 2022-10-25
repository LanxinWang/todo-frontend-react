import React from "react";
import TODO_STATUS from "../../constants/constants";
import { TODO_MENU } from "../../constants/constants";
import {
  TodoFooterContainer,
  FilterMenu,
  ClearButton,
  MenuButton,
} from "./style";
import { deleteAllCompletedTodos, selectTodos } from "../../features/todos/TodoSlice";
import { selectTodoFilter, updateTodoFilter } from "../../features/filter/filterSlice";
import {useAppDispatch, useAppSelector} from "../../hooks"

const todoMenu = [TODO_MENU.ALL, TODO_MENU.ACTIVE, TODO_MENU.COMPLETED];

const TodoFooter = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(selectTodos);
  const todoMenuOption: string = useAppSelector(selectTodoFilter);

  const handleMenuClick = (menuOption: string) => {
    dispatch(updateTodoFilter({menuOption}));
  };

  const handleClearClick = () => {
    dispatch(deleteAllCompletedTodos());
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
              selectedTodoStatusOption={todoMenuOption}
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
