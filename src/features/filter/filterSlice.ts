import {createSlice} from '@reduxjs/toolkit';
import  {TODO_MENU} from "../../constants/constants";

  const initialState = {
    todoFilter: TODO_MENU.ALL
  };

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    updateTodoFilter: (state,{payload:{menuOption}})=>{
      state.todoFilter = menuOption;
    }
  }
})

export const {updateTodoFilter} = filterSlice.actions

// export const selectTodoFilter = ((state: RootState) => state.todo.todoFilter);
export default filterSlice.reducer