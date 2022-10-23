import React from "react";
import {useAppDispatch, useAppSelector} from "../../hooks"
import {
  TodoListBodyContainer,
  ToggleInput,
  ToggleLabel,
  P,
  DeleteButton,
} from "./style";
import {deleteTodo, updateTodoStatus} from "../../features/todos/TodoSlice"
import { RootState } from "../../store/store";
import TODO_STATUS, { TODO_MENU } from "../../constants/constants";
const TodoListBody = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state: RootState) => state.todo.todoList);
  const todoMenuOption: string = useAppSelector((state: RootState) => state.filter.todoFilter); 
  const todosByTodoMenuOption = ()=>{
    if (todoMenuOption === TODO_MENU.ALL) {
      return todos.filter((todo) => todo.status !== TODO_STATUS.DELETED);
    } else {
      return todos.filter((todo) => todo.status === todoMenuOption);
    }
  };

  const handleChange = (isChecked: boolean, id: number) => {
    console.log("------checked-----------:",isChecked);
    dispatch(updateTodoStatus({id,isChecked}))
  };
  const handleClick = (id: number) => {
    dispatch(deleteTodo({id}))
  };
  return (
    <TodoListBodyContainer aria-label= "todoList">
      {todosByTodoMenuOption().map((todo) => (
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
