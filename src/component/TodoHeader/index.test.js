import { fireEvent, render, screen } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import TodoHeader from "./index";

const mockedTodos = [
  {
    id: 1,
    status: "active",
    name: "test",
  },
];
const addTodo = jest.fn();
const toggleAllTodos = jest.fn();

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  addTodo.mockClear();
  toggleAllTodos.mockClear();
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

const setup = () => {
  render(
    <TodoHeader
      todos={mockedTodos}
      onAddTodo={addTodo}
      onToggleAllTodos={toggleAllTodos}
    />,
    container
  );
};

describe("Todo Input", () => {
  test("renders TodoInput", () => {
    setup();
    const newTodoInput = screen.getByPlaceholderText("What needs to be done?");
    const toggleAll = screen.getByLabelText("❯");
    expect(newTodoInput).toBeInTheDocument();
    expect(toggleAll).toBeInTheDocument();
  });

  test("addTodo keydown", () => {
    setup();
    const NewTodoInput = screen.getByRole("textbox");
    fireEvent.keyDown(NewTodoInput, {
      target: { value: "test" },
      key: "Enter",
    });
    expect(addTodo).toHaveBeenCalledTimes(1);
    expect(addTodo).toHaveBeenCalledWith("test");
  });

  test("ToggleAllInput click", () => {
    setup();
    const toggleInput = screen.getByLabelText("❯");
    fireEvent.click(toggleInput, { target: { checked: true } });
    expect(toggleAllTodos).toHaveBeenCalledTimes(1);
    expect(toggleAllTodos).toHaveBeenCalledWith(false);
  });
});
