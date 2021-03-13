import { DeepPartial, Store } from 'redux';
import configureStore from 'redux-mock-store';
import { AppDispatch, RootState } from '../store';
import { render as rtlRender } from '@testing-library/react';
import { Provider } from 'react-redux';

const createMockStore = configureStore<DeepPartial<RootState>, AppDispatch>();

type RenderOptions = Parameters<typeof rtlRender>[1] & {
  initialState?: DeepPartial<RootState>;
  store?: Store;
};

export function render(
  ui: Parameters<typeof rtlRender>[0],
  { initialState, store, ...renderOptions }: RenderOptions = {},
) {
  const testStore = store ?? createMockStore(initialState);

  const Wrapper: React.FC = ({ children }) => (
    <Provider store={testStore}>{children}</Provider>
  );

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}
