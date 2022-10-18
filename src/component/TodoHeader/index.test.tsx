import { fireEvent, render, screen } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import TODO_STATUS from "../../constants/constants";
import { Todo } from "../../types/index";
import TodoHeader from "./index";

const mockedTodos:Todo[] = [
  {
    id: "1",
    status: "active",
    name: "test",
  },
];
const addTodo = jest.fn();
const toggleAllTodos = jest.fn();

let container:any = null;
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
      todosNumber={mockedTodos.length}
      activeTodosNumber={mockedTodos.filter((todo) => todo.status === TODO_STATUS.ACTIVE).length}
      onAddTodo={addTodo}
      onToggleAllTodos={toggleAllTodos}
    />,
    container
  );
};

describe("Todo Header", () => {
  test("should renders TodoHeader", () => {
    setup();
    const newTodoInput = screen.getByPlaceholderText("What needs to be done?");
    const toggleAllButton = screen.getByLabelText("❯");
    expect(newTodoInput).toBeInTheDocument();
    expect(toggleAllButton).toBeInTheDocument();
  });

  test("should add todo when click enter key", () => {
    setup();
    const NewTodoInput = screen.getByRole("textbox");
    fireEvent.keyDown(NewTodoInput, {
      target: { value: "test" },
      key: "Enter",
    });
    expect(addTodo).toHaveBeenCalledTimes(1);
    expect(addTodo).toHaveBeenCalledWith("test");
  });

  test("should toggle all todos when click toggleAllButton", () => {
    setup();
    const toggleAllButton = screen.getByLabelText("❯");
    fireEvent.click(toggleAllButton, { target: { checked: true } });
    expect(toggleAllTodos).toHaveBeenCalledTimes(1);
    expect(toggleAllTodos).toHaveBeenCalledWith(false);
  });
});
