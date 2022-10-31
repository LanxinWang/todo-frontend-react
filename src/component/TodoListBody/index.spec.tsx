import { screen } from "@testing-library/react";
import TodoListBody from "./index";
import { renderWithProviders } from "../../utils/test-utils";

const setup = () => {
  renderWithProviders(<TodoListBody/>, )
  
};

describe("Todo List", () => {
  it("should renders TodoList", () => {
    setup();
    expect(screen.getByRole("list", {
    name: /todoList/i,
  })).toBeInTheDocument();
  });
});
