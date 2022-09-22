import { render, screen } from "@testing-library/react";
import TodoList from "./index";
import { TODO_STATUS, TODO_MENU } from "../../constants";

test("renders TodoInput", () => {
  const todos = [
    { id: 0, status: TODO_STATUS.ACTIVE, content: "test1" },
    { id: 1, status: TODO_STATUS.COMPLETED, content: "test2" },
  ];

  const TodosByStatusOption = jest.fn().mockReturnValue(todos);
  const selectedTodoStatusOption = TODO_MENU.ALL;
  render(
    <TodoList
      todos={TodosByStatusOption}
      selectedTodoStatusOption={selectedTodoStatusOption}
    />
  );
  expect(screen.getAllByRole("listitem").length).toBe(todos.length);
});
