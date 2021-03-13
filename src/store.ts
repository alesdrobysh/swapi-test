import { configureStore } from '@reduxjs/toolkit';
import { createEpicMiddleware } from 'redux-observable';

import { searchReducer, searchEpic } from './search/store';

const epicMiddleware = createEpicMiddleware();

export const store = configureStore({
  reducer: { search: searchReducer },
  middleware: [epicMiddleware],
});

epicMiddleware.run(searchEpic);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
