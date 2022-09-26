import { fireEvent, render, screen } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import App from "./App";

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

const setup = () => {
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
};

describe("App", () => {
  test("renders APP", () => {
    render(<App />);
    const todoTitle = screen.queryByRole("heading");
    const todoInput = screen.getByPlaceholderText("What needs to be done?");
    const todoMenu = screen.getAllByRole("link");
    const todoFooter = screen.getByRole("contentinfo");
    expect(todoTitle).toBeInTheDocument();
    expect(todoInput).toBeInTheDocument();
    expect(todoMenu.length).toBe(2);
    expect(todoFooter).toBeInTheDocument();
  });
});

describe("add todo test", () => {
  test("add a todo when name is not null and key down", async () => {
    setup();
    const todoInput = screen.getByPlaceholderText("What needs to be done?");
    fireEvent.keyDown(todoInput, {
      target: { value: "todo3" },
      key: "Enter",
    });

    const todoItems = screen
      .getAllByRole("listitem")
      .filter((todo) => todo.className === "todo-item");
    expect(todoItems.length).toBe(3);
  });

  test("Do not add a todo when name is null and key down", () => {
    setup();
    const todoInput = screen.getByPlaceholderText("What needs to be done?");

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
    setup();
    const todoInput = screen.getByPlaceholderText("What needs to be done?");

    fireEvent.keyDown(todoInput, {
      target: { value: "todo3" },
      key: "other key",
    });
    const todoItems = screen
      .getAllByRole("listitem")
      .filter((todo) => todo.className === "todo-item");
    expect(todoItems.length).toBe(2);
  });
});

describe("delete todo test", () => {
  test("delete first todo in todo list when click destroy button", async () => {
    setup();
    const destroyButton = screen.getAllByText("×")[0];
    const li = screen
      .getAllByRole("listitem")
      .filter((todo) => todo.className === "todo-item")[0];
    fireEvent.click(destroyButton, li.key);

    const todoItems = screen
      .getAllByRole("listitem")
      .filter((todo) => todo.className === "todo-item");
    expect(todoItems.length).toBe(1);
  });
});

describe("toggle todo test", () => {
  test("toggle first todo in todo list", () => {
    setup();
    const toggleBox = screen.getAllByLabelText("")[0];
    fireEvent.click(toggleBox);
    expect(toggleBox.checked).toBe(true);
    fireEvent.click(toggleBox);
    expect(toggleBox.checked).toBe(false);
  });

  test("toggle all todos checked in todo list", () => {
    setup();
    const toggleAll = screen.getByLabelText("❯");
    fireEvent.click(toggleAll);
    const todos = screen.getAllByLabelText("");
    todos.forEach((todo) => {
      expect(todo.checked).toBe(true);
    });
  });

  test("toggle all todos unchecked in todo list", () => {
    setup();
    const toggleAll = screen.getByLabelText("❯");
    fireEvent.click(toggleAll);
    fireEvent.click(toggleAll);
    const todos = screen.getAllByLabelText("");
    todos.forEach((todo) => {
      expect(todo.checked).toBe(false);
    });
  });
});

describe("clear all completed test", () => {
  test("clear completed todos in todo list", () => {
    setup();
    const todos = screen.getAllByLabelText("");
    fireEvent.click(todos[0]);
    const clearCompletedButton = screen.getByText("Clear completed");
    fireEvent.click(clearCompletedButton);
    expect(screen.getAllByLabelText("").length).toBe(1);
    const todoList = screen
      .getAllByRole("listitem")
      .filter((li) => li.className === "todo-item");
    expect(todoList.length).toBe(1);
  });
});

describe("filter todos test", () => {
  test("show active status todos", () => {
    setup();

    const activeButton = screen.getByText("active");
    fireEvent.click(activeButton);
    const activeTodoList = screen
      .getAllByRole("listitem")
      .filter((li) => li.className === "todo-item");
    expect(activeTodoList.length).toBe(2);
  });

  test("show completed status todos", () => {
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

    const completedButton = screen.getByText("completed");
    fireEvent.click(completedButton);
    const completedTodoList = screen
      .getAllByRole("listitem")
      .filter((li) => li.className === "todo-item");
    expect(completedTodoList.length).toBe(0);
  });
});
