import React, { PropsWithChildren } from 'react'
import { render } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import type { PreloadedState } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import type { RootState,store } from '../store/store'
import todoReducer from '../features/todos/TodoSlice'
import filterReducer from '../features/filter/filterSlice'
import { TODO_MENU } from '../constants/constants'
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
    preloadedState?: PreloadedState<RootState>
    store?: typeof store
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {
      todo: {
          todoList: [],
      },
      filter: {
          todoFilter: TODO_MENU.ALL,
      },
  },
    // Automatically create a store instance if no store was passed in
    store = configureStore({ reducer: { todo: todoReducer, filter: filterReducer },preloadedState}),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}