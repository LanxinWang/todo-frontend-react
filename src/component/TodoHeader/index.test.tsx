import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Todo } from "../../types/index";
import TodoHeader from "./index";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { SchemaLink } from '@apollo/client/link/schema';
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { readFileSync } from "fs";
import { addMocksToSchema } from "@graphql-tools/mock";
import TODO_STATUS from "../../constants/constants";

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

const addATodoMutationSpy = jest.fn();
const getTodosQuerySpy = jest.fn();
const updateAllTodosStatusSpy = jest.fn();

const typeDefs = readFileSync('schema.graphql', { encoding: 'utf-8' });

const schema = makeExecutableSchema({ typeDefs });

const mockSchema = addMocksToSchema({
  schema,
  resolvers: {
    Query: {
      getTodos: getTodosQuerySpy
    },
    Mutation: {
      addATodo: addATodoMutationSpy,
      updateAllTodosStatus: updateAllTodosStatusSpy
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
        <TodoHeader todos={mockedTodos} />
      </ApolloProvider>
    );
}

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
    const todoInput:HTMLInputElement = screen.getByPlaceholderText("What needs to be done?");
    fireEvent.change(todoInput, {target: {value: 'todo3'}})
    fireEvent.keyDown(todoInput, {key: 'Enter', code: 'Enter', charCode: 13})

    await waitFor(() => expect(addATodoMutationSpy).toHaveBeenCalled());
  });

  it("should not call the add a todo mutation when input null todo name with enter key", async () => {
    setup();
    const todoInput = screen.getByPlaceholderText("What needs to be done?");
    fireEvent.change(todoInput, {target: {value: ' '}})
    fireEvent.keyDown(todoInput, {key: 'Enter', code: 'Enter', charCode: 13})

    await waitFor(() => expect(addATodoMutationSpy).not.toHaveBeenCalled());
  });

  it("should not call the add a todo mutation when input non-null todo name without enter key", async () => {
    setup();
    const todoInput = screen.getByPlaceholderText("What needs to be done?");

    fireEvent.change(todoInput, {target: {value: 'todo3'}})
    fireEvent.keyDown(todoInput, {key: 'other key', code: 'other', charCode: 0})

    await waitFor(() => expect(addATodoMutationSpy).not.toHaveBeenCalled());
  });
});

describe("toggle all todos", () => {
  it("should call the update all todos mutation when click toggle all button", async () => {
    setup();
    const toggleAll = await screen.findByLabelText("❯") as HTMLInputElement;
    fireEvent.click(toggleAll);
    await waitFor(() => expect(updateAllTodosStatusSpy).toHaveBeenCalled())
  })
});
