import { makeExecutableSchema } from "@graphql-tools/schema";
import { SchemaLink } from '@apollo/client/link/schema';
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { readFileSync } from "fs";
import { addMocksToSchema } from "@graphql-tools/mock";
import TODO_STATUS, { TODO_MENU } from "../../constants/constants";
import { Todo } from "../../types/index";
import TodoFooter from "./index";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

const mockedTodos: Todo[] = [
  {
    _id: 0,
    status: TODO_STATUS.ACTIVE,
    name: "test0",
  },
  {
    _id: 1,
    status: TODO_STATUS.COMPLETED,
    name: "test1",
  },
];
const selectedTodoStatusOption = TODO_MENU.ALL;
const setSelectedTodoStatusOption = jest.fn();
const deleteAllCompletedTodosSpy = jest.fn();

const typeDefs = readFileSync('schema.graphql', { encoding: 'utf-8' });

const schema = makeExecutableSchema({ typeDefs });

const mockSchema = addMocksToSchema({
  schema,
  resolvers: {
    Mutation: {
      deleteAllCompletedTodos: deleteAllCompletedTodosSpy,
    }
  }
});

const client = new ApolloClient({
  link: new SchemaLink({ schema: mockSchema }),
  cache: new InMemoryCache()
});

const setup =  () => {
    render(
      <ApolloProvider client={client}>
        <TodoFooter
          todos={mockedTodos}
          selectedTodoStatusOption={selectedTodoStatusOption}
          onSetSelectedTodoStatusOption={setSelectedTodoStatusOption}
        />
      </ApolloProvider>
    );
}

describe("Todo Footer", () => {
  it("should render TodoFooter", async () => {
    setup();

    expect(screen.getByText(TODO_MENU.ALL)).toBeInTheDocument();
    expect(screen.getByText(TODO_MENU.ACTIVE)).toBeInTheDocument();
    expect(screen.getByText(TODO_MENU.COMPLETED)).toBeInTheDocument();
    expect(screen.getByText("items left")).toBeInTheDocument();
    expect(screen.getByText("Clear completed")).toBeInTheDocument();
  });
});

describe("todo status menu", () => {
  it("should select all button when click 'all' todo status menu option", () => {
    setup();
    const activeButton = screen.getByText(TODO_MENU.ALL);
    fireEvent.click(activeButton, { target: TODO_MENU.ALL });
    expect(setSelectedTodoStatusOption).toBeCalledTimes(1);
    expect(setSelectedTodoStatusOption).toHaveBeenCalledWith(TODO_MENU.ALL);
  });

  it("should select active button when click 'active' todo status menu option", () => {
    setup();
    const activeButton = screen.getByText(TODO_MENU.ALL);
    fireEvent.click(activeButton, { target: TODO_MENU.ALL });
    expect(setSelectedTodoStatusOption).toBeCalledTimes(1);
    expect(setSelectedTodoStatusOption).toHaveBeenCalledWith(TODO_MENU.ALL);
  });

  it("should select completed button when click 'completed' todo status menu option", () => {
    setup();
    const activeButton = screen.getByText(TODO_MENU.COMPLETED);
    fireEvent.click(activeButton, { target: TODO_MENU.COMPLETED});
    expect(setSelectedTodoStatusOption).toBeCalledTimes(1);
    expect(setSelectedTodoStatusOption).toHaveBeenCalledWith(TODO_MENU.COMPLETED);
  });
});

describe("delete all completed todos", () => {
  it("should call delete all completed todos when click 'clear all' button", async () => {
      setup();
      const clearCompletedButton = screen.getByText("Clear completed");
      fireEvent.click(clearCompletedButton);
      await waitFor(() => {
        expect(deleteAllCompletedTodosSpy).toBeCalled();
      });
    });
})

