import { ApolloQueryResult, OperationVariables, useMutation } from "@apollo/client";
import { ChangeEvent, useState } from "react";
import TODO_STATUS, { ENTER_KEY } from "../../constants/constants";
import { ADD_A_TODO, UPDATE_ALL_TODOS } from "../../graphqlApi";
import { Todo } from "../../types";
import {
  ToggleAllLabel,
  TodoHeaderContainer,
  NewTodoInput,
  ToggleAllCheckbox,
} from "./styles";

export interface TodoHeaderProps {
  todos:Todo[],
  onRefetchTodos: (variables?: Partial<OperationVariables> | undefined) => Promise<ApolloQueryResult<any>>
}

const TodoHeader =({
  todos, onRefetchTodos
}:TodoHeaderProps)=>
 {
  const todoNumber = todos.length;
  const completedTodosNumber = todos.filter((todo) => todo.status === TODO_STATUS.COMPLETED).length;
  const deletedTodosNumber = todos.filter((todo) => todo.status === TODO_STATUS.DELETED).length;

  const [ addATodo ] = useMutation(ADD_A_TODO);
  const [ updateAllTodoStatus ] = useMutation(UPDATE_ALL_TODOS);
  const [name, setName] = useState("");

  const handleLabelChange = (checkFlag: boolean) => {
    const updateIds = todos.filter(todo => todo.status !== TODO_STATUS.DELETED).map(todo => todo._id);    
    updateAllTodoStatus( { variables: {updateIds, isChecked: checkFlag }} )    
  };
  const handleKeyDown = (key: string) => {
    if (key === ENTER_KEY) {
      if (name.trim() !== "") {
        addATodo({ variables: { id: todos.length, status: TODO_STATUS.ACTIVE, name } }); 
        onRefetchTodos();
      }
      setName("");
    }
  };  

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
      onChange={(e)=>{setName(e.target.value)}}
      onKeyDown={(e) => handleKeyDown(e.key)} >
      </NewTodoInput>
      {/* <p> {`render header+ ${new Date()}`}</p> */}
    </TodoHeaderContainer>
  );
}

export default TodoHeader;
