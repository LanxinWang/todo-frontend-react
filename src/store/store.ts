import { configureStore,} from '@reduxjs/toolkit';
import todoReducer from '../features/todos/TodoSlice';
import filterReducer from '../features/filter/filterSlice';
export const store = configureStore(
  {
    reducer: {
      todo: todoReducer,
      filter: filterReducer
    },
  });

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;