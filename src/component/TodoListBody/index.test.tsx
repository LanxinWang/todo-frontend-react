import { fireEvent, render, screen } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import { Todo } from "../../types/index";
import TodoListBody from "./index";

const mockedTodos: Todo[] = [
  {
    _id: 1,
    status: "active",
    name: "test",
  },
];
const toggleTodo = jest.fn();
const deleteTodo = jest.fn();

let container: any = null;
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
      selectedTodoStatusOption={"all"}
    />,
    container
  );
};

describe("Todo List", () => {
  test("renders TodoList", () => {
    setup();
    expect(screen.getAllByRole("listitem").length).toBe(mockedTodos.length);
  });

  test("should delete todo when click todo delete button", () => {
    setup();
    const deleteBtn = screen.getByRole("button");
    fireEvent.click(deleteBtn);
    expect(deleteTodo).toHaveBeenCalledTimes(1);
    expect(deleteTodo).toHaveBeenCalledWith(mockedTodos[0]._id);
  });

  test("should exchange todo status when click todo status box", () => {
    setup();
    const toggleBox = screen.getByLabelText("");
    fireEvent.click(toggleBox, { target: { checked: false, index: 1 } });
    expect(toggleTodo).toHaveBeenCalledTimes(1);
    expect(toggleTodo).toHaveBeenCalledWith(true, 1);
  });
});
