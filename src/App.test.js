import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
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

  test("add a todo when name is not null and key down", async () => {
    render(<App />);
    const todoInput = screen.getByPlaceholderText("What needs to be done?");
    fireEvent.keyDown(todoInput, {
      target: { value: "todo1" },
      key: "Enter",
    });

    fireEvent.keyDown(todoInput, {
      target: { value: "todo2" },
      key: "Enter",
    });

    fireEvent.keyDown(todoInput, {
      target: { value: "todo3" },
      key: "Enter",
    });
    const todoItems = screen
      .getAllByRole("listitem")
      .filter((todo) => todo.className === "todo-item");
    expect(todoItems.length).toBe(3);
  });
});

test("Do not add a todo when name is null and key down", () => {
  render(<App />);
  const todoInput = screen.getByPlaceholderText("What needs to be done?");
  fireEvent.keyDown(todoInput, {
    target: { value: "todo1" },
    key: "Enter",
  });

  fireEvent.keyDown(todoInput, {
    target: { value: "todo2" },
    key: "Enter",
  });

  fireEvent.keyDown(todoInput, {
    target: { value: "  " },
    key: "Enter",
  });
  const todoItems = screen
    .getAllByRole("listitem")
    .filter((todo) => todo.className === "todo-item");
  expect(todoItems.length).toBe(2);
});

test("Do not add a todo when name is not null and key down not 'enter key", () => {
  render(<App />);
  const todoInput = screen.getByPlaceholderText("What needs to be done?");
  fireEvent.keyDown(todoInput, {
    target: { value: "todo1" },
    key: "Enter",
  });

  fireEvent.keyDown(todoInput, {
    target: { value: "todo2" },
    key: "Enter",
  });

  fireEvent.keyDown(todoInput, {
    target: { value: "todo3" },
    key: "other key",
  });
  const todoItems = screen
    .getAllByRole("listitem")
    .filter((todo) => todo.className === "todo-item");
  expect(todoItems.length).toBe(2);
});
