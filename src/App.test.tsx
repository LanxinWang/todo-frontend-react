import {  fireEvent, render, screen, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import App from "./App";
import TODO_STATUS, { TODO_MENU } from "./constants/constants";

const mockedTodos = [
  { _id: 1, status: TODO_STATUS.COMPLETED, name: "todo2" },
  { _id: 0, status: TODO_STATUS.ACTIVE, name: "todo1" }
];

jest.mock('axios', () => ({
  get: () => Promise.resolve({ data: JSON.parse(JSON.stringify(mockedTodos) ) }),
  delete: () => Promise.resolve(),
  post: () => Promise.resolve(),
  put: () => Promise.resolve()  
}));

const setup = async () => {
  // eslint-disable-next-line testing-library/no-unnecessary-act
  await act(async () => {
    render(<App />);
  });
}

describe("render App", () => {
  test("should render APP", async () => {
    await setup();
    const todoTitle = screen.getByRole("heading");
    const todoInput = screen.getByPlaceholderText("What needs to be done?");
    const todoMenu = screen.getAllByRole("link");
    const todoFooter = screen.getByRole("contentinfo");
    const todo1 = screen.getByText("todo1")
    expect(todoFooter).toBeInTheDocument();
    expect(todoTitle).toBeInTheDocument();
    expect(todoInput).toBeInTheDocument();
    expect(todoMenu.length).toBe(2);
    expect(todoFooter).toBeInTheDocument();
    expect(todo1).toBeInTheDocument();
  });
});
 
describe("add todo", () => {
  test("should add a todo when name is not null and key down", async () => {
    await setup();
    const todoInput:HTMLInputElement = screen.getByPlaceholderText("What needs to be done?");
    fireEvent.change(todoInput, {target: {value: 'todo3'}})
    fireEvent.keyDown(todoInput, {key: 'Enter', code: 'Enter', charCode: 13})
    await waitFor(() => {
      const newTodo = screen.getByText("todo3");
      expect(newTodo).toBeInTheDocument();
    })
  });

  test("should do not add a todo when name is null and key down", async () => {
    await setup();

    const todoInput = screen.getByPlaceholderText("What needs to be done?");
    fireEvent.change(todoInput, {target: {value: ' '}})
    fireEvent.keyDown(todoInput, {key: 'Enter', code: 'Enter', charCode: 13})

    await waitFor(() => {
      const todoItems = screen
      .getAllByRole("listitem")
      .filter((todo) => todo.className === "todo-item");
    expect(todoItems.length).toBe(2);
    })
  });

  test("should do not add a todo when name is not null and key down not 'enter key", async () => {
    await setup();
    const todoInput = screen.getByPlaceholderText("What needs to be done?");

    fireEvent.change(todoInput, {target: {value: 'todo3'}})
    fireEvent.keyDown(todoInput, {key: 'other key', code: 'other', charCode: 0})

    await waitFor(() => {
      const todoItems = screen
      .getAllByRole("listitem")
      .filter((todo) => todo.className === "todo-item");
    expect(todoItems.length).toBe(2);
    })
    await waitFor(() => {
    expect(screen.queryByText("todo3")).not.toBeInTheDocument();
    })
  });
});

describe("delete todo", () => {
  test("should delete first todo in todo list when click destroy button", async () => {
    await setup();
    const destroyButton = screen.getAllByText("×")[0];
    fireEvent.click(destroyButton);
    await waitFor(() => {
      expect(screen.getByText("todo1")).toBeInTheDocument();
    })
    await waitFor(() => {
      expect(screen.queryByText("todo2")).not.toBeInTheDocument();
    })
    await waitFor(() => {
      const todoItems = screen
      .getAllByRole("listitem")
      .filter((todo) => todo.className === "todo-item");
      expect(todoItems.length).toBe(1);
    })

  });
});

describe("toggle todo", () => {
  test("should toggle first todo in todo list", async () => {
    await setup();
    const toggleBox = screen.getAllByLabelText("")[0] as HTMLInputElement;
    fireEvent.click(toggleBox);
    await waitFor(()=>{
      expect(toggleBox.checked).toBe(true);
    }); 
    fireEvent.click(toggleBox);
    await waitFor(()=>{
      expect(toggleBox.checked).toBe(false);
    });
  });

  test("should toggle all todos checked in todo list", async () => {
    await setup();
    const toggleAll = screen.getByLabelText("❯") as HTMLInputElement;
    fireEvent.click(toggleAll);
    await waitFor(() => {
      const todos = screen.getAllByLabelText("") as HTMLInputElement[];
      todos.forEach((todo) => {
        expect(todo).toBeChecked();
      });
    })
  });

  test("should toggle all todos unchecked in todo list", async () => {
    await setup();
    const toggleAll = screen.getByLabelText("❯") as HTMLInputElement;
    fireEvent.click(toggleAll);
    await waitFor(() => {
      const todos = screen.getAllByLabelText("") as HTMLInputElement[];
      todos.forEach((todo) => {
        expect(todo).toBeChecked();
      });
    })
    fireEvent.click(toggleAll);
    await waitFor(() => {
      const todos = screen.getAllByLabelText("") as HTMLInputElement[];
      todos.forEach((todo) => {
        expect(todo).not.toBeChecked();
      });
    })
  });
});

describe("clear all completed todos", () => {
  test("should clear completed todos in todo list", async () => {
    await setup();
    const clearCompletedButton = screen.getByText("Clear completed");
    fireEvent.click(clearCompletedButton);
    await waitFor(() => {
      const todoList = screen
      .getAllByRole("listitem")
      .filter((li) => li.className === "todo-item");
      expect(todoList.length).toBe(1);
    });
  });
});

describe("todo status menu", () => {
  test("should show active status todos", async () => {
    await setup();
    const activeButton: HTMLButtonElement = screen.getByText("active");
    fireEvent.click(activeButton);
    expect(screen.getByText("todo1")).toBeInTheDocument();
    expect(screen.queryByText("todo2")).not.toBeInTheDocument();
  });

  test("should show completed status todos", async () => {
    await setup();
    const completedButton: HTMLButtonElement = screen.getByText(TODO_MENU.COMPLETED);
    fireEvent.click(completedButton);
    expect(screen.getByText("todo2")).toBeInTheDocument();
    expect(screen.queryByText("todo1")).not.toBeInTheDocument();
  });

  test("should show all none-deleted status todos", async () => {
    await setup();
    const allButton: HTMLButtonElement = screen.getByText(TODO_MENU.ALL);
    fireEvent.click(allButton);
    expect(screen.getByText("todo1")).toBeInTheDocument();
    expect(screen.getByText("todo2")).toBeInTheDocument();
  });
});
