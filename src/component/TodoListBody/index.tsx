import React from "react";
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
  onDeleteTodo: (_id: number) =>void,
  onToggleTodo: (isChecked: boolean, _id: number) => void
  
}

const TodoListBody = ({ todos, onDeleteTodo, onToggleTodo }: TodoListBodyProps) => {
  const handleChange = (isChecked: boolean, _id: number) => {
    onToggleTodo(isChecked, _id);
  };
  const handleClick = (_id: number) => {
    onDeleteTodo(_id);
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
