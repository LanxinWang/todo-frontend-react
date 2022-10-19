import React from "react";
import { useDispatch } from "react-redux";
import {Todo} from "../../types/index";
import {
  TodoListBodyContainer,
  ToggleInput,
  ToggleLabel,
  P,
  DeleteButton,
} from "./style";
import {deleteTodo, updateTodoStatus} from "../../store/TodoSlice"
interface TodoListBodyProps {
  todos: Todo[],
}
const TodoListBody = ({ todos }: TodoListBodyProps) => {
  const dispatch = useDispatch();
  const handleChange = (isChecked: boolean, id: number) => {
    dispatch(updateTodoStatus({id,isChecked}))
  };
  const handleClick = (id: number) => {
    dispatch(deleteTodo({id}))
  };
  return (
    <TodoListBodyContainer>
      {todos.map((todo) => (
        <li key={todo.id} className="todo-item">
          <ToggleInput
            id={todo.id.toString()}
            todoStatus={todo.status}
            onChange={(e) => {
              handleChange(e.target.checked, todo.id);
            }}
          />
          <ToggleLabel htmlFor={todo.id.toString()} />
          <P className={todo.status}>{todo.name}</P>
          <DeleteButton onClick={() => handleClick(todo.id)}>×</DeleteButton>
        </li>
      ))}
    </TodoListBodyContainer>
  );
}

export default TodoListBody;
