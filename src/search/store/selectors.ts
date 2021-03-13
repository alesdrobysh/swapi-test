import type { RootState } from '../../store';

export const getLoading = (state: RootState) => state.search.loading;
export const getCount = (state: RootState) => state.search.count;
export const getOptions = (state: RootState) => state.search.options;
export const getSelectedOption = (state: RootState) => state.search.selectedOption;
