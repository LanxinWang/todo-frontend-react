import { fireEvent, render, screen } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import TODO_STATUS from "../../constants/constants";
import { Todo } from "../../types/index";
import TodoHeader from "./index";
import { Provider } from 'react-redux';
import { store } from '../../store/store';

const mockedTodos:Todo[] = [
  {
    id: 0,
    status: "active",
    name: "test",
  },
];
const addTodo = jest.fn();
const toggleAllTodos = jest.fn();

let container: HTMLDivElement;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  addTodo.mockClear();
  toggleAllTodos.mockClear();
  unmountComponentAtNode(container);
  container.remove();
});

const setup = () => {

  render(
    <Provider store={store}>
      <TodoHeader
        todosNumber={mockedTodos.length}
        activeTodosNumber={mockedTodos.filter((todo) => todo.status === TODO_STATUS.ACTIVE).length}
        onToggleAllTodos={toggleAllTodos}
    />
    </Provider>
    ,
    {container}
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

  test("should toggle all todos when click toggleAllButton", () => {
    setup();
    const toggleAllButton = screen.getByLabelText("❯");
    fireEvent.click(toggleAllButton, { target: { checked: true } });
    expect(toggleAllTodos).toHaveBeenCalledTimes(1);
    expect(toggleAllTodos).toHaveBeenCalledWith(false);
  });
});
