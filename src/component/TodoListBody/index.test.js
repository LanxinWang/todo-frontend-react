import { fireEvent, render, screen } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import TodoListBody from "./index";

const mockedTodos = [
  {
    id: 1,
    status: "active",
    name: "test",
  },
];
const toggleTodo = jest.fn();
const deleteTodo = jest.fn();

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  toggleTodo.mockClear();
  deleteTodo.mockClear();
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

const setup = () => {
  render(
    <TodoListBody
      todos={mockedTodos}
      onToggleTodo={toggleTodo}
      onDeleteTodo={deleteTodo}
    />,
    container
  );
};

describe("Todo List", () => {
  test("renders TodoList", () => {
    setup();
    expect(screen.getAllByRole("listitem").length).toBe(mockedTodos.length);
  });

  test("DestroyButton click", () => {
    setup();
    const deleteBtn = screen.getByRole("button");
    fireEvent.click(deleteBtn);
    expect(deleteTodo).toHaveBeenCalledTimes(1);
    expect(deleteTodo).toHaveBeenCalledWith(mockedTodos[0].id);
  });

  test("ToggleBox change", () => {
    setup();
    const toggleBox = screen.getByLabelText("");
    fireEvent.click(toggleBox, { target: { checked: false, id: 1 } });
    expect(toggleTodo).toHaveBeenCalledTimes(1);
    expect(toggleTodo).toHaveBeenCalledWith(true, "1");
  });
});
