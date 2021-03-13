import { Action, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Observable, of } from 'rxjs';
import { debounceTime, filter, switchMap, map, catchError } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

import { Person, Response } from './types';
import { transformData } from './transformData';

type SearchState = {
  loading: boolean;
  error?: Error,
  count: number;
  options: Person[];
  selectedOption: Person | null;
};

const initialState: SearchState = {
  loading: false,
  count: 0,
  options: [],
  selectedOption: null,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    searchStart: (state, _action: PayloadAction<string>) => {
      state.loading = true;
      state.error = undefined;
    },
    searchComplete: (state, action) => {
      state.loading = false;
      state.count = action.payload.count;
      state.options = action.payload.options;
    },
    searchError: (state, action: PayloadAction<Error>) => {
      state.error = action.payload;
    },
    select: (state, action: PayloadAction<Person | null>) => {
      state.selectedOption = action.payload;
    }
  },
});

export const searchEpic = (action$: Observable<Action>) => action$.pipe(
  filter(searchSlice.actions.searchStart.match),
  debounceTime(200),
  switchMap(({ payload }) => ajax
    .getJSON(`https://swapi.dev/api/people/?search=${payload}`)
    .pipe(
      map((data) => transformData(data as Response)),
      map(searchSlice.actions.searchComplete),
      catchError((error) => of(searchSlice.actions.searchError(error)))
    )
  )
);

export const { searchStart, select } = searchSlice.actions;
export const searchReducer = searchSlice.reducer;
