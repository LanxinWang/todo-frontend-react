import { render, screen } from "@testing-library/react";
import TodoInput from "./index";

test("renders TodoInput", () => {
  render(<TodoInput />);
  const newTodoInput = screen.getByPlaceholderText("What needs to be done?");
  const toggleAll = screen.getByLabelText("❯");
  expect(newTodoInput).toBeInTheDocument();
  expect(toggleAll).toBeInTheDocument();
});
