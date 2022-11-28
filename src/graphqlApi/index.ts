import { gql } from "@apollo/client";

export const GET_TODOS = gql`
    query GetTodos {
        todos {
            _id
            name
            status
        }
    }
`;

export const ADD_A_TODO = gql`
    mutation AddATodo($id: Int!, $status: String!, $name: String!) {
        addATodo(_id: $id, status: $status, name: $name) {
            _id
            status
            name
        }
    }
`;

export const DELETE_A_TODO = gql `
    mutation DeleteATodo($id: Int!) {
        deleteATodo(_id: $id) {
            _id
            status
            name
        }
    }

`

export const DELETE_ALL_COMPLETED_TODOS = gql `
    mutation DeleteAllCompletedTodos( $deletedIds: [Int]!) {
        deleteAllCompletedTodos(deletedIds: $deletedIds) {
            _id
            status
            name
        }
    }
`

export const UPDATE_A_TODO = gql `
    mutation UpdateATodoById($id: Int!, $isChecked: Boolean!) {
        updateATodoStatus(_id: $id, isChecked: $isChecked) {
            _id
            status
            name
        }
    }
`

export const UPDATE_ALL_TODOS = gql `
    mutation UpdateAllTodosStatus( $updateIds: [Int]!, $isChecked: Boolean!) {
        updateAllTodosStatus(updateIds: $updateIds, isChecked: $isChecked) {
            _id
            status
            name
        }
    }
`
