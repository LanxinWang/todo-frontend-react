import { fireEvent, render, screen } from "@testing-library/react";
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

describe("Todo Input", () => {
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(
      <TodoInput
        todoLength={mockedTodos.length}
        addTodo={addTodo}
        toggleAll={toggleAll}
      />
    );
  });
  afterEach(() => {
    addTodo.mockClear();
    toggleAll.mockClear();
  });

  test("renders TodoInput", () => {
    const newTodoInput = screen.getByPlaceholderText("What needs to be done?");
    const toggleAll = screen.getByLabelText("❯");
    expect(newTodoInput).toBeInTheDocument();
    expect(toggleAll).toBeInTheDocument();
  });

  test("addTodo keydown", () => {
    const NewTodoInput = screen.getByRole("textbox");
    fireEvent.keyDown(NewTodoInput, {
      target: { value: "test" },
      key: "Enter",
    });
    expect(addTodo).toHaveBeenCalledTimes(1);
    expect(addTodo).toHaveBeenCalledWith("test", "Enter");
  });

  test("ToggleAllInput click", () => {
    const toggleInput = screen.getByLabelText("❯");
    fireEvent.click(toggleInput, { target: { checked: true } });
    expect(toggleAll).toHaveBeenCalledTimes(1);
    expect(toggleAll).toHaveBeenCalledWith(false);
  });
});
