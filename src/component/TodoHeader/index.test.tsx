import { render, screen } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import TodoHeader from "./index";
import { Provider } from 'react-redux';
import { store } from '../../store/store';

let container: HTMLDivElement;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
});

const setup = () => {

  render(
    <Provider store={store}>
      <TodoHeader/>
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
});
