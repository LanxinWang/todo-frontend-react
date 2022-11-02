import { ChangeEvent, useState } from "react";
import TODO_STATUS, { ENTER_KEY } from "../../constants/constants";
import { Todo } from "../../types";
import {
  ToggleAllLabel,
  TodoHeaderContainer,
  NewTodoInput,
  ToggleAllCheckbox,
} from "./styles";

export interface TodoHeaderProps {
  onAddTodo:(name:string) => void,
  onToggleAllTodos:(checkFlag:boolean) => void,
  todos:Todo[],
}

const TodoHeader =({
  onAddTodo,
  onToggleAllTodos,
  todos,
}:TodoHeaderProps)=>
 {
  const todoNumber = todos.length;
  const completedTodosNumber = todos.filter((todo) => todo.status === TODO_STATUS.COMPLETED).length;
  const deletedTodosNumber = todos.filter((todo) => todo.status === TODO_STATUS.DELETED).length;

  const [name,setName] = useState("")

  const handleLabelChange = (checkFlag: boolean) => {
    onToggleAllTodos(checkFlag);
  };
  const handleKeyDown = (key: string) => {
    if (key === ENTER_KEY) {
      if (name.trim() !== "") {
        onAddTodo(name); 
      }
      setName("");
    }
  };
  const handleInputChange = (name: string) => {
    setName(name);
  }

  return (
    <TodoHeaderContainer>
      <ToggleAllCheckbox
        id="toggle-all"
        todosNumber={todoNumber}
        deletedTodosNumber={deletedTodosNumber}
        completedTodosNumber={completedTodosNumber}
        onChange={(e:ChangeEvent<HTMLInputElement>) => handleLabelChange(e.target.checked)}
      />
      <ToggleAllLabel htmlFor="toggle-all"
      todosNumber={todos.length}
      deletedTodosNumber={deletedTodosNumber}
       >
        ❯
      </ToggleAllLabel>
      <NewTodoInput 
      id="new-todo-input" 
      value={name}
      onChange={(e)=>{handleInputChange(e.target.value)}}
      onKeyDown={(e) => handleKeyDown(e.key)} />
    </TodoHeaderContainer>
  );
}

export default TodoHeader;
