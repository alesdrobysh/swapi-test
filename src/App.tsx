import { Provider } from 'react-redux';
import { makeStyles } from '@material-ui/core';

import { store } from './store';
import { PersonCard, SearchField } from './search';

const useStyles = makeStyles(() => ({
  root: {
    margin: '0 auto',
    width: 300,
  }
}));

export const App = () => {
  const styles = useStyles();

  return (
    <Provider store={store}>
      <div className={styles.root}>
        <SearchField />
        <PersonCard />
      </div>
    </Provider>
  );
}

