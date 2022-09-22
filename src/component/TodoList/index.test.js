import { fireEvent, render, screen } from "@testing-library/react";
import TodoList from "./index";

const mockedTodos = [
  {
    id: 1,
    status: "active",
    name: "test",
  },
];

const checkTodo = jest.fn();
const deleteTodo = jest.fn();

describe("Todo List", () => {
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(
      <TodoList
        todos={mockedTodos}
        checkTodo={checkTodo}
        deleteTodo={deleteTodo}
      />
    );
  });
  afterEach(() => {
    checkTodo.mockClear();
    deleteTodo.mockClear();
  });

  test("renders TodoList", () => {
    expect(screen.getAllByRole("listitem").length).toBe(mockedTodos.length);
  });

  test("DestroyButton click", () => {
    const deleteBtn = screen.getByRole("button");
    fireEvent.click(deleteBtn);
    expect(deleteTodo).toHaveBeenCalledTimes(1);
    expect(deleteTodo).toHaveBeenCalledWith(mockedTodos[0].id);
  });

  test("ToggleInput change", () => {
    const toggleInput = screen.getByLabelText(mockedTodos[0].name);
    fireEvent.click(toggleInput, { target: { checked: true, id: 1 } });
    expect(checkTodo).toHaveBeenCalledTimes(1);
    expect(checkTodo).toHaveBeenCalledWith(false, "1");
  });
});
