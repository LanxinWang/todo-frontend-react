import { makeExecutableSchema } from "@graphql-tools/schema";
import { SchemaLink } from "@apollo/client/link/schema";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { readFileSync } from "fs";
import { addMocksToSchema } from "@graphql-tools/mock";
import { ReactNode } from "react";
import { render as rtlRender } from "@testing-library/react";
import { Todo } from "../types";
import TODO_STATUS from "../constants/constants";

export const mockedTodos: Todo[] = [
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

export const render = (
  component: ReactNode | ReactNode[],
  mockResolver: object
) => {
  const typeDefs = readFileSync("schema.graphql", { encoding: "utf-8" });
  const schema = makeExecutableSchema({ typeDefs });
  const mockSchema = addMocksToSchema({
    schema,
    resolvers: mockResolver,
  });

  const client = new ApolloClient({
    link: new SchemaLink({ schema: mockSchema }),
    cache: new InMemoryCache(),
  });

  return rtlRender(
    <ApolloProvider client={client}>{component}</ApolloProvider>
  );
};
