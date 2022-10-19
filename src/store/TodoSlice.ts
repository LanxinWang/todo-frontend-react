import {Todo} from "../types";
import {createSlice} from '@reduxjs/toolkit';
import TODO_STATUS from "../constants/constants";
export interface todoState {
    todoList: Todo[];
  }
  
  const initialState: todoState = {
    todoList: []
  };

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
     createTodo: (state, {payload:{name}}) => {
      state.todoList=[{
        id: Date.now().toString(),
        status: TODO_STATUS.ACTIVE,
        name,
      },...state.todoList];
      console.log("state.todos:",state.todoList);
    },
    deleteTodo: (state, {payload:{id}}) => {
      state.todoList = state.todoList.filter((todo) => todo.id !== id)
      console.log("state.todos:",state.todoList);
    },
  }
})

export const { createTodo,deleteTodo } = todoSlice.actions

export default todoSlice.reducer