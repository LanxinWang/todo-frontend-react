import React from "react";
import TODO_STATUS from "../../constants/constants";
import { Todo } from "../../types/index"
import { TODO_MENU } from "../../constants/constants";
import {
  TodoFooterContainer,
  FilterMenu,
  ClearButton,
  MenuButton,
} from "./style";
import { useDispatch, useSelector } from "react-redux";
import { deleteAllCompletedTodos } from "../../store/TodoSlice";
import { RootState } from "../../store/store";
import { updateTodoFilter } from "../../store/TodoSlice";

const todoMenu = [TODO_MENU.ALL, TODO_MENU.ACTIVE, TODO_MENU.COMPLETED];

interface TodoFooterProps {
  todos: Todo[],
}

const TodoFooter = ({
  todos,
}: TodoFooterProps) => {
  const dispatch = useDispatch();
  const todoMenuOption: string = useSelector((state: RootState) => state.todo.todoFilter);
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
