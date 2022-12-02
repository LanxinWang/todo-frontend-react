import { fireEvent, screen, waitFor } from "@testing-library/react";
import TodoHeader from "./index";
import { mockedTodos, render } from "../../utils/testUtils";

const addATodoMutationSpy = jest.fn();
const getTodosQuerySpy = jest.fn();
const updateAllTodosStatusSpy = jest.fn();

const mockResolver = {
  Query: {
    todos: getTodosQuerySpy,
  },
  Mutation: {
    addATodo: addATodoMutationSpy,
    updateAllTodosStatus: updateAllTodosStatusSpy,
  },
};

const setup = () => {
  render(<TodoHeader todos={mockedTodos} />, mockResolver);
};

describe("Todo Header", () => {
  it("should renders TodoHeader", () => {
    setup();
    const newTodoInput = screen.getByPlaceholderText("What needs to be done?");
    const toggleAllButton = screen.getByLabelText("❯");
    expect(newTodoInput).toBeInTheDocument();
    expect(toggleAllButton).toBeInTheDocument();
  });
});

describe("add a todo", () => {
  it("should call the add a todo mutation when input non-null todo name with enter key", async () => {
    setup();
    const todoInput: HTMLInputElement = screen.getByPlaceholderText(
      "What needs to be done?"
    );
    fireEvent.change(todoInput, { target: { value: "todo3" } });
    fireEvent.keyDown(todoInput, { key: "Enter", code: "Enter", charCode: 13 });

    await waitFor(() => expect(addATodoMutationSpy).toHaveBeenCalled());
  });

  it("should not call the add a todo mutation when input null todo name with enter key", async () => {
    setup();
    const todoInput = screen.getByPlaceholderText("What needs to be done?");
    fireEvent.change(todoInput, { target: { value: " " } });
    fireEvent.keyDown(todoInput, { key: "Enter", code: "Enter", charCode: 13 });

    await waitFor(() => expect(addATodoMutationSpy).not.toHaveBeenCalled());
  });

  it("should not call the add a todo mutation when input non-null todo name without enter key", async () => {
    setup();
    const todoInput = screen.getByPlaceholderText("What needs to be done?");

    fireEvent.change(todoInput, { target: { value: "todo3" } });
    fireEvent.keyDown(todoInput, {
      key: "other key",
      code: "other",
      charCode: 0,
    });

    await waitFor(() => expect(addATodoMutationSpy).not.toHaveBeenCalled());
  });
});

describe("toggle all todos", () => {
  it("should call the update all todos mutation when click toggle all button", async () => {
    setup();
    const toggleAll = (await screen.findByLabelText("❯")) as HTMLInputElement;
    fireEvent.click(toggleAll);
    await waitFor(() => expect(updateAllTodosStatusSpy).toHaveBeenCalled());
  });
});
