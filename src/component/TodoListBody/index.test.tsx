import { fireEvent, screen, waitFor } from "@testing-library/react";
import TodoListBody from "./index";
import { TODO_MENU } from "../../constants/constants";
import { mockedTodos, render } from "../../utils/testUtils";

const deleteATodoMutationSpy = jest.fn();
const updateATodoStatusMutationSpy = jest.fn();

const mockResolver = {
  Mutation: {
    deleteATodo: deleteATodoMutationSpy,
    updateATodoStatus: updateATodoStatusMutationSpy,
  },
};

const setup = () => {
  render(
    <TodoListBody
      selectedTodoStatusOption={TODO_MENU.ALL}
      todos={mockedTodos}
    />,
    mockResolver
  );
};

describe("render Todo List", () => {
  it("should render TodoList", () => {
    setup();
    expect(screen.getAllByRole("listitem").length).toBe(mockedTodos.length);
  });
});

describe("delete a todo", () => {
  it("should delete todo when click todo delete button", async () => {
    setup();
    const deleteBtn = screen.getAllByRole("button")[0];
    fireEvent.click(deleteBtn);

    await waitFor(() => {
      expect(deleteATodoMutationSpy).toBeCalled();
    });
  });
});

describe("toggle a todo", () => {
  it("should exchange todo status when click todo status box", async () => {
    setup();
    const toggleBox = screen.getAllByLabelText("")[0];
    fireEvent.click(toggleBox, {
      target: { checked: true, id: mockedTodos[0]._id },
    });

    await waitFor(() => {
      expect(updateATodoStatusMutationSpy).toHaveBeenCalled();
    });
  });
});
