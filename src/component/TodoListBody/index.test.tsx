import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Todo } from "../../types/index";
import TodoListBody from "./index";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { SchemaLink } from '@apollo/client/link/schema';
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { readFileSync } from "fs";
import { addMocksToSchema } from "@graphql-tools/mock";
import TODO_STATUS, { TODO_MENU } from "../../constants/constants";

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

const deleteATodoMutationSpy = jest.fn();
const updateATodoStatusMutationSpy = jest.fn();

const typeDefs = readFileSync('schema.graphql', { encoding: 'utf-8' });

const schema = makeExecutableSchema({ typeDefs });

const mockSchema = addMocksToSchema({
  schema,
  resolvers: {
    Mutation: {
      deleteATodo: deleteATodoMutationSpy,
      updateATodoStatus: updateATodoStatusMutationSpy
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
         <TodoListBody
        selectedTodoStatusOption={TODO_MENU.ALL}
        todos={mockedTodos} 
    />
      </ApolloProvider>
    );
}

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
    })
  });
});

describe("toggle a todo", () => {
  it("should exchange todo status when click todo status box", async () => {
    setup();
    const toggleBox = screen.getAllByLabelText("")[0];
    fireEvent.click(toggleBox, { target: { checked: true, id: mockedTodos[0]._id } });

    await waitFor(() => {
      expect(updateATodoStatusMutationSpy).toHaveBeenCalled();
    })
  });
})