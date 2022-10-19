import { fireEvent, render, screen } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import { Todo } from "../../types/index";
import TodoListBody from "./index";

const mockedTodos: Todo[] = [
  {
    id: 1,
    status: "active",
    name: "test",
  },
];
const toggleTodo = jest.fn();

let container: any = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  toggleTodo.mockClear();
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

const setup = () => {
  render(
    <TodoListBody
      todos={mockedTodos}
      onToggleTodo={toggleTodo}
    />,
    container
  );
};

describe("Todo List", () => {
  test("renders TodoList", () => {
    setup();
    expect(screen.getAllByRole("listitem").length).toBe(mockedTodos.length);
  });

  test("should exchange todo status when click todo status box", () => {
    setup();
    const toggleBox = screen.getByLabelText("");
    fireEvent.click(toggleBox, { target: { checked: false, id: 1 } });
    expect(toggleTodo).toHaveBeenCalledTimes(1);
    expect(toggleTodo).toHaveBeenCalledWith(true, "1");
  });
});
