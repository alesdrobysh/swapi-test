import { Provider } from 'react-redux'
import { store } from './store'

import { PersonCard, SearchField } from './search';

export const App = () => {
  return (
    <Provider store={store}>
      <SearchField />
      <PersonCard />
    </Provider>
  );
}

