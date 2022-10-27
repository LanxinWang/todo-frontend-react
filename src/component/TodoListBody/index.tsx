import React from "react";
import {useAppDispatch, useAppSelector} from "../../hooks"
import {
  TodoListBodyContainer,
  ToggleInput,
  ToggleLabel,
  P,
  DeleteButton,
} from "./style";
import {deleteTodo, selectShowTodos, updateTodoStatus} from "../../features/todos/TodoSlice"
const TodoListBody = () => {
  const dispatch = useAppDispatch();
  const showTodos = useAppSelector(selectShowTodos);

  const handleChange = (isChecked: boolean, id: number) => {
    dispatch(updateTodoStatus({id,isChecked}))
  };
  const handleClick = (id: number) => {
    dispatch(deleteTodo({id}))
  };
  return (
    <TodoListBodyContainer aria-label= "todoList">
      {showTodos.map((todo) => (
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
