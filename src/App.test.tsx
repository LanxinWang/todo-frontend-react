import { render, screen} from "@testing-library/react";
import App from "./App";
import TODO_STATUS from "./constants/constants";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { SchemaLink } from '@apollo/client/link/schema';
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { readFileSync } from "fs";
import { addMocksToSchema } from "@graphql-tools/mock";

const typeDefs = readFileSync('schema.graphql', { encoding: 'utf-8' });

const schema = makeExecutableSchema({ typeDefs });

const mockedTodos = [
  { _id: 1, status: TODO_STATUS.COMPLETED, name: "todo2" },
  { _id: 0, status: TODO_STATUS.ACTIVE, name: "todo1" }
];

const mockSchema = addMocksToSchema({
  schema,
  resolvers: {
    Query: {
      todos: () => mockedTodos,
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
        <App />
      </ApolloProvider>
    );
}

describe("render App", () => {
  test("should render APP", async () => {
    setup();
    const todoTitle = screen.getByRole("heading");
    const todoInput = screen.getByPlaceholderText("What needs to be done?");
    const todoMenu = screen.getAllByRole("link");
    const todoFooter = screen.getByRole("contentinfo");
    const todo1 = await screen.findByText("todo1")
    const todo2 = await screen.findByText("todo2")
    expect(todoFooter).toBeInTheDocument();
    expect(todoTitle).toBeInTheDocument();
    expect(todoInput).toBeInTheDocument();
    expect(todoMenu.length).toBe(2);
    expect(todoFooter).toBeInTheDocument();
    expect(todo1).toBeInTheDocument();
    expect(todo2).toBeInTheDocument();
  });
});





