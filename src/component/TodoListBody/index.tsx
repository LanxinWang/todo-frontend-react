import { useMutation } from "@apollo/client";
import React from "react";
import { DELETE_A_TODO, UPDATE_A_TODO } from "../../graphqlApi";
import {Todo} from "../../types/index";
import {
  TodoListBodyContainer,
  ToggleInput,
  ToggleLabel,
  P,
  DeleteButton,
} from "./style";
interface TodoListBodyProps {
  todos: Todo[],
}

const TodoListBody = ({ todos }: TodoListBodyProps) => {
  const [ deleteATodo ] = useMutation(DELETE_A_TODO);
  const [ updateATodoStatus ] = useMutation(UPDATE_A_TODO);

  const deleteTodo = (_id: number) => {
    deleteATodo({ variables: { id: `${_id}`} })
  };
  const toggleTodo = (isChecked: boolean, _id: number) => {
    updateATodoStatus( {variables: {id: `${_id}`, isChecked}} )
  };
  const handleChange = (isChecked: boolean, _id: number) => {
    toggleTodo(isChecked, _id);
  };
  const handleClick = (_id: number) => {
    deleteTodo(_id);
  };
  return (
    <TodoListBodyContainer>
      {todos.map((todo) => (
        <li key={todo._id} className="todo-item">
          <ToggleInput
            id={todo._id.toString()}
            todoStatus={todo.status}
            onChange={(e) => {
              handleChange(e.target.checked, todo._id);
            }}
          />
          <ToggleLabel htmlFor={todo._id.toString()}/>
          <P className={todo.status}>{todo.name}</P>
          <DeleteButton onClick={() => handleClick(todo._id)}>×</DeleteButton>
        </li>
      ))}
    </TodoListBodyContainer>
  );
}

export default TodoListBody;
