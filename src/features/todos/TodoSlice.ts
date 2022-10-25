import {Todo} from "../../types";
import {createSelector, createSlice} from '@reduxjs/toolkit';
import TODO_STATUS from "../../constants/constants";
import { RootState} from "../../store/store";
export interface todoState {
    todoList: Todo[];
  }
  
  const initialState: todoState = {
    todoList: [],
  };

const todoSlice = createSlice({
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
    updateTodoStatus: (state, {payload:{id,isChecked}}) => {
      let index = state.todoList.length - id -1;
      state.todoList[index].status = isChecked
        ? TODO_STATUS.COMPLETED
        : TODO_STATUS.ACTIVE;
    },
    updateAllTodosStatus: (state, {payload:{checkFlag}}) => {
      state.todoList = state.todoList.map ((todo) => {
        if(todo.status!==TODO_STATUS.DELETED) {
          todo.status = checkFlag
          ? TODO_STATUS.COMPLETED
          : TODO_STATUS.ACTIVE;
        }
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
    }
  }
})

export const { createTodo, deleteTodo, updateTodoStatus, updateAllTodosStatus, deleteAllCompletedTodos } = todoSlice.actions

export const selectTodos = ((state: RootState) => state.todo.todoList);

export const completedTodosNumber = createSelector(selectTodos, (todoList) => 
  todoList.filter(todo => todo.status === TODO_STATUS.COMPLETED)).length;

export default todoSlice.reducer