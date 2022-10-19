import { render, screen } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import { Provider } from "react-redux";
import { TODO_MENU } from "../../constants/constants";
import { store } from "../../store/store";
import TodoFooter from "./index";

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
         <TodoFooter/>
      </Provider>,
      container
    );
  };

  test("should render TodoFooter", () => {
    setup();
    expect(screen.getByText(TODO_MENU.ACTIVE)).toBeInTheDocument();
    expect(screen.getByText(TODO_MENU.COMPLETED)).toBeInTheDocument();
    expect(screen.getByText(TODO_MENU.ALL)).toBeInTheDocument();
    expect(screen.getByText("items left")).toBeInTheDocument();
    expect(screen.getByText("Clear completed")).toBeInTheDocument();
  });
});
