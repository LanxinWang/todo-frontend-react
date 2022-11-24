import { useMutation, useQuery } from "@apollo/client";
import React from "react";
import TODO_STATUS, { TODO_MENU } from "../../constants/constants";
import { DELETE_A_TODO, GET_TODOS, UPDATE_A_TODO } from "../../graphqlApi";
import {Todo} from "../../types/index";
import {
  TodoListBodyContainer,
  ToggleInput,
  ToggleLabel,
  P,
  DeleteButton,
} from "./style";
interface TodoListBodyProps {
  selectedTodoStatusOption: String
}

const TodoListBody = ({  selectedTodoStatusOption }: TodoListBodyProps) => {
  let statuses = selectedTodoStatusOption === TODO_MENU.ALL ? [TODO_STATUS.ACTIVE, TODO_STATUS.COMPLETED]: [selectedTodoStatusOption];
  const [ deleteATodo ] = useMutation(DELETE_A_TODO);
  const [ updateATodoStatus ] = useMutation(UPDATE_A_TODO);
  const { data } = useQuery(GET_TODOS, {variables: { statuses } } );
  const renderTodos: Todo[] = data?.getTodos.todo || [];
  const handleChange = (isChecked: boolean, _id: number) => {
    updateATodoStatus( {variables: {id: `${_id}`, isChecked}} )
  };
  const handleClick = (_id: number) => {
    deleteATodo({ variables: { id: `${_id}`} })
  };
  
  return (
    <TodoListBodyContainer>
      {renderTodos.map((todo) => (
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
