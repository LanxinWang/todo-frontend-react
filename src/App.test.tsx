import { screen } from "@testing-library/react";
import App from "./App";
import { mockedTodos, render } from "./utils/testUtils";

const mockResolver = {
  Query: {
    todos: () => mockedTodos,
  },
};

const setup = () => {
  render(<App />, mockResolver);
};

describe("render App", () => {
  test("should render APP", async () => {
    setup();
    const todoTitle = screen.getByRole("heading");
    const todoInput = screen.getByPlaceholderText("What needs to be done?");
    const todoMenu = screen.getAllByRole("link");
    const todoFooter = screen.getByRole("contentinfo");
    const todo1 = await screen.findByText("test0");
    const todo2 = await screen.findByText("test1");
    expect(todoFooter).toBeInTheDocument();
    expect(todoTitle).toBeInTheDocument();
    expect(todoInput).toBeInTheDocument();
    expect(todoMenu.length).toBe(2);
    expect(todoFooter).toBeInTheDocument();
    expect(todo1).toBeInTheDocument();
    expect(todo2).toBeInTheDocument();
  });
});
