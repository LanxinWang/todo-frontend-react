import { useMutation } from "@apollo/client";
import React from "react";
import TODO_STATUS, { TODO_MENU } from "../../constants/constants";
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
  todos: Todo[]
  selectedTodoStatusOption: String
}

const TodoListBody = ({ todos, selectedTodoStatusOption }: TodoListBodyProps) => {
  const [ deleteATodo ] = useMutation(DELETE_A_TODO);
  const [ updateATodoStatus ] = useMutation(UPDATE_A_TODO);

  let renderTodos: Todo[] = selectedTodoStatusOption === TODO_MENU.ALL ? todos.filter((todo) => todo.status !== TODO_STATUS.DELETED) : todos.filter((todo) => todo.status === selectedTodoStatusOption);
  
  const handleChange = (isChecked: boolean, _id: number) => {
    updateATodoStatus( {variables: {id: _id, isChecked}} )
  };  
  const handleClick = (_id: number) => {
    deleteATodo({ variables: { id: _id} })
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
