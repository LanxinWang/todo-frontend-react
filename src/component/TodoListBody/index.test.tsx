import { render, screen } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import { Provider } from "react-redux";
import TodoListBody from "./index";
import {store} from "../../store/store"

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
  it("should renders TodoList", () => {
    setup();
    expect(screen.getByRole("list", {
    name: /todoList/i,
  })).toBeInTheDocument();
  });
});
