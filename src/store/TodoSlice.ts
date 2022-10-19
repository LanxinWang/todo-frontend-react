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
        id: state.todoList.length,
        status: TODO_STATUS.ACTIVE,
        name,
      },...state.todoList];
    },
    deleteTodo: (state, {payload:{id}}) => {
      let index = state.todoList.length - id -1;
      state.todoList[index].status =  TODO_STATUS.DELETED;
    },
    updateTodoStatus: (state, {payload:{id,isChecked}})=>{
      let index = state.todoList.length - id -1;
      state.todoList[index].status = isChecked
        ? TODO_STATUS.COMPLETED
        : TODO_STATUS.ACTIVE;
    },
    updateAllTodosStatus: (state, {payload:{checkFlag}})=>{
      state.todoList.map ((todo) => {
        todo.status = checkFlag
        ? TODO_STATUS.COMPLETED
        : TODO_STATUS.ACTIVE;
        return todo
      })
    }
  }
})

export const { createTodo, deleteTodo, updateTodoStatus, updateAllTodosStatus } = todoSlice.actions

export default todoSlice.reducer