import { render, screen } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import { Provider } from "react-redux";
import { store } from "../../store/store";
import { Todo } from "../../types/index";
import TodoFooter from "./index";

const mockedTodos: Todo[] = [
  {
    id: 0,
    status: "active",
    name: "test",
  },
];

describe("Todo Footer", () => {
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
         <TodoFooter
        todos={mockedTodos}
        />
      </Provider>,
      container
    );
  };

  test("should render TodoFooter", () => {
    setup();
    expect(screen.getAllByRole("listitem").length).toBe(3);
    expect(screen.getByText("items left")).toBeInTheDocument();
    expect(screen.getByText("Clear completed")).toBeInTheDocument();
  });
});
