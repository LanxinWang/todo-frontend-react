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
  onDeleteTodo: (index: number) =>void,
  onToggleTodo: (isChecked: boolean, index: number) => void
  
}

const TodoListBody = ({ todos, onDeleteTodo, onToggleTodo }: TodoListBodyProps) => {
  const handleChange = (isChecked: boolean, index: number) => {
    onToggleTodo(isChecked, index);
  };
  const handleClick = (index: number) => {
    onDeleteTodo(index);
  };
  return (
    <TodoListBodyContainer>
      {todos.map((todo) => (
        <li key={todo.index} className="todo-item">
          <ToggleInput
            id={`${todo.index}`}
            todoStatus={todo.status}
            onChange={(e) => {
              handleChange(e.target.checked, todo.index);
            }}
          />
          <ToggleLabel htmlFor={`${todo.index}`}/>
          <P className={todo.status}>{todo.name}</P>
          <DeleteButton onClick={() => handleClick(todo.index)}>×</DeleteButton>
        </li>
      ))}
    </TodoListBodyContainer>
  );
}

export default TodoListBody;
