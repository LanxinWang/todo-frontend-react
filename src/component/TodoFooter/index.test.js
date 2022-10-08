import { fireEvent, render, screen } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import TodoFooter from "./index";

const mockedTodos = [
  {
    id: 1,
    status: "active",
    name: "test",
  },
];

const setSelectedTodoStatusOption = jest.fn();
const selectedTodoStatusOption = "all";
const clearCompletedTodos = jest.fn();

describe("Todo Menu", () => {
  let container = null;
  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    setSelectedTodoStatusOption.mockClear();
    clearCompletedTodos.mockClear();
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  const setup = () => {
    render(
      <TodoFooter
        todos={mockedTodos}
        selectedTodoStatusOption={selectedTodoStatusOption}
        onSetSelectedTodoStatusOption={setSelectedTodoStatusOption}
        onClearCompletedTodos={clearCompletedTodos}
      />,
      container
    );
  };

  test("renders TodoMenu", () => {
    setup();
    expect(screen.getAllByRole("listitem").length).toBe(3);
    expect(screen.getByText("items left")).toBeInTheDocument();
    expect(screen.getByText("Clear completed")).toBeInTheDocument();
  });

  test("TodoMenu todo status option", () => {
    setup();
    const activeButton = screen.getByText("active");
    fireEvent.click(activeButton, { target: "active" });
    expect(setSelectedTodoStatusOption).toBeCalledTimes(1);
    expect(setSelectedTodoStatusOption).toHaveBeenCalledWith("active");
  });

  test("clear completed button click", () => {
    setup();
    const clearCompletedButton = screen.getByText("Clear completed");
    fireEvent.click(clearCompletedButton);
    expect(clearCompletedTodos).toBeCalledTimes(1);
  });
});
