import {Todo} from "../types";
import {createSlice} from '@reduxjs/toolkit';
import TODO_STATUS, {TODO_MENU} from "../constants/constants";
export interface todoState {
    todoList: Todo[];
    todoFilter: string;
  }
  
  const initialState: todoState = {
    todoList: [],
    todoFilter: TODO_MENU.ALL
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
      state.todoList = state.todoList.map ((todo) => {
        todo.status = checkFlag
        ? TODO_STATUS.COMPLETED
        : TODO_STATUS.ACTIVE;
        return todo
      });      
    },
    deleteAllCompletedTodos: (state)=>{
      state.todoList = state.todoList.map((todo) => {
        if (todo.status === TODO_STATUS.COMPLETED) {
          todo.status = TODO_STATUS.DELETED;
        };
        return todo;
      });      
    },
    updateTodoFilter: (state,{payload:{menuOption}})=>{
      state.todoFilter = menuOption;
    }
  }
})

export const { createTodo, deleteTodo, updateTodoStatus, updateAllTodosStatus, deleteAllCompletedTodos, updateTodoFilter} = todoSlice.actions

export default todoSlice.reducer