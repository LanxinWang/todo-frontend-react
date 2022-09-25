import { fireEvent, render, screen } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import TodoInput from "./index";

const mockedTodos = [
  {
    id: 1,
    status: "active",
    name: "test",
  },
];
const addTodo = jest.fn();
const toggleAll = jest.fn();

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  addTodo.mockClear();
  toggleAll.mockClear();
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

const setup = () => {
  render(
    <TodoInput todos={mockedTodos} addTodo={addTodo} toggleAll={toggleAll} />,
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
    expect(toggleAll).toHaveBeenCalledTimes(1);
    expect(toggleAll).toHaveBeenCalledWith(false);
  });
});
