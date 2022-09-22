import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders APP", () => {
  render(<App />);
  const todoTitle = screen.queryByRole("heading");
  const todoInput = screen.getByPlaceholderText("What needs to be done?");
  const todoList = screen.getByRole("list");
  const todoMenu = screen.getAllByRole("link");
  const todoFooter = screen.getByRole("contentinfo");
  expect(todoTitle).toBeInTheDocument();
  expect(todoInput).toBeInTheDocument();
  expect(todoList).toBeInTheDocument();
  expect(todoMenu.length).toBe(2);
  expect(todoFooter).toBeInTheDocument();
});
