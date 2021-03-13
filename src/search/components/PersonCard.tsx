import { useSelector } from 'react-redux';
import { Card, makeStyles } from "@material-ui/core";

import { getSelectedOption } from '../store';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300 - theme.spacing(2),
    wordBreak: 'break-word',
    padding: theme.spacing(),
  }
}));

export const PersonCard = () => {
  const styles = useStyles();
  const person = useSelector(getSelectedOption);

  return (
    person && <Card className={styles.root}>{JSON.stringify(person)}</Card>
  );
}
