import { fireEvent, render, screen } from "@testing-library/react";
import TodoMenu from "./index";

const mockedTodos = [
  {
    id: 1,
    status: "active",
    name: "test",
  },
];

const setSelectedTodoStatusOption = jest.fn();
const selectedTodoStatusOption = "all";
const clearCompletedTodo = jest.fn();

describe("Todo Menu", () => {
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(
      <TodoMenu
        todos={mockedTodos}
        selectedTodoStatusOption={selectedTodoStatusOption}
        setSelectedTodoStatusOption={setSelectedTodoStatusOption}
        clearCompletedTodo={clearCompletedTodo}
      />
    );
  });
  afterEach(() => {
    setSelectedTodoStatusOption.mockClear();
    clearCompletedTodo.mockClear();
  });

  test("renders TodoMenu", () => {
    expect(screen.getAllByRole("listitem").length).toBe(3);
    expect(screen.getByText("items left")).toBeInTheDocument();
    expect(screen.getByText("Clear completed")).toBeInTheDocument();
  });

  test("TodoMenu todo status option", () => {
    const activeButton = screen.getByText("active");
    fireEvent.click(activeButton, { target: "active" });
    expect(setSelectedTodoStatusOption).toBeCalledTimes(1);
    expect(setSelectedTodoStatusOption).toHaveBeenCalledWith("active");
  });

  test("clear completed button click", () => {
    const clearCompletedButton = screen.getByText("Clear completed");
    fireEvent.click(clearCompletedButton);
    expect(clearCompletedTodo).toBeCalledTimes(1);
  });
});
