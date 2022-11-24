import { gql } from "@apollo/client";

export const GET_TODOS = gql`
    query GetTodos($statuses: [String]!) {
        getTodos(statuses: $statuses) {
            code
            todo {
              _id
              name
              status
            }
        }
    }
`;

export const ADD_A_TODO = gql`
    mutation AddATodo($id: String!, $status: String!, $name: String!) {
        addATodo(_id: $id, status: $status, name: $name) {
            code
            success
            message
            todo {
                _id
                status
                name
            }
        }
    }
`;

export const DELETE_A_TODO = gql `
    mutation DeleteATodo($id: String!) {
        deleteATodo(_id: $id) {
            code
            success
            message
            todo {
                _id
                status
                name
            }
        }
    }

`

export const DELETE_ALL_COMPLETED_TODOS = gql `
    mutation DeleteAllCompletedTodos( $deletedIds: [String]!) {
        deleteAllCompletedTodos(deletedIds: $deletedIds) {
            code
            message
            todo {
                _id
                status
                name
            }
        }
    }
`

export const UPDATE_A_TODO = gql `
    mutation UpdateATodoById($id: String!, $isChecked: Boolean!) {
        updateATodoStatus(_id: $id, isChecked: $isChecked) {
            code
            success
            message
            todo {
                _id
                status
                name
            }
        }
    }
`

export const UPDATE_ALL_TODOS = gql `
    mutation UpdateAllTodosStatus( $updateIds: [String]!, $isChecked: Boolean!) {
        updateAllTodosStatus(updateIds: $updateIds, isChecked: $isChecked) {
            code
            message
            todo {
                _id
                status
                name
            }
        }
    }
`
