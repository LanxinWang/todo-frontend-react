import { render, screen } from "@testing-library/react";
import TodoMenu from "./index";
import { TODO_STATUS, TODO_MENU } from "../../constants";

test("renders TodoMenu", () => {
  const todos = [
    { id: 0, status: TODO_STATUS.ACTIVE, content: "test1" },
    { id: 1, status: TODO_STATUS.COMPLETED, content: "test2" },
  ];

  render(<TodoMenu todos={todos} />);
  expect(screen.getAllByRole("listitem").length).toBe(3);
});
