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
import {deleteTodo} from "../../store/TodoSlice"
interface TodoListBodyProps {
  todos: Todo[],
  onToggleTodo: (isChecked: boolean, id: string) => void
  
}
const TodoListBody = ({ todos, onToggleTodo }: TodoListBodyProps) => {
  const dispatch = useDispatch();
  const handleChange = (isChecked: boolean, id: string) => {
    onToggleTodo(isChecked, id);
  };
  const handleClick = (id: string) => {
    dispatch(deleteTodo({id}))
  };
  return (
    <TodoListBodyContainer>
      {todos.map((todo) => (
        <li key={todo.id} className="todo-item">
          <ToggleInput
            id={todo.id}
            todoStatus={todo.status}
            onChange={(e) => {
              handleChange(e.target.checked, e.target.id);
            }}
          />
          <ToggleLabel htmlFor={todo.id} />
          <P className={todo.status}>{todo.name}</P>
          <DeleteButton onClick={() => handleClick(todo.id)}>×</DeleteButton>
        </li>
      ))}
    </TodoListBodyContainer>
  );
}

export default TodoListBody;
