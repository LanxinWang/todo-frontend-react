import { render, screen } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import { Provider } from "react-redux";
import { Todo } from "../../types/index";
import TodoListBody from "./index";
import {store} from "../../store/store"

const mockedTodos: Todo[] = [
  {
    id: 0,
    status: "active",
    name: "test",
  },
];

let container: any = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

const setup = () => {
  render(
    <Provider store={store}>
      <TodoListBody />
    </Provider>,
    container)
  
};

describe("Todo List", () => {
  test("renders TodoList", () => {
    setup();
    expect(screen.getAllByRole("listitem").length).toBe(mockedTodos.length);
  });
});
