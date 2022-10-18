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
  onDeleteTodo: (id: string) =>void,
  onToggleTodo: (isChecked: boolean, id: string) => void
  
}

const TodoListBody = ({ todos, onDeleteTodo, onToggleTodo }: TodoListBodyProps) => {
  const handleChange = (isChecked: boolean, id: string) => {
    onToggleTodo(isChecked, id);
  };
  const handleClick = (id: string) => {
    onDeleteTodo(id);
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
