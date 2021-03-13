import { useSelector } from 'react-redux';
import { Card, List, ListItem, ListItemText, makeStyles } from "@material-ui/core";

import { getSelectedOption, Person } from '../store';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300 - theme.spacing(2),
    wordBreak: 'break-word',
    padding: theme.spacing(),
  },
  label: {
    color: theme.palette.text.secondary,
    flexBasis: '50%',
  },
  text: {
    flexBasis: '50%',
  }
}));

const personKey2label: Record<keyof Person, string> = {
  name: 'Name',
  height: 'Height',
  mass: 'Mass',
  hairColor: 'Hair Color',
  skinColor: 'Skin Color',
  eyeColor: 'Eye Color',
  birthYear: 'Birth Year',
  gender: 'Gender',
}

export const PersonCard = () => {
  const styles = useStyles();
  const person = useSelector(getSelectedOption);

  if (!person) {
    return null;
  }

  return (
    <Card className={styles.root}>
      <List>
        {
          Object.keys(person).map((key) => (
            <ListItem key={key}>
              <ListItemText className={styles.label}>{personKey2label[key as keyof Person]}</ListItemText>
              <ListItemText className={styles.text}>{person[key as keyof Person]}</ListItemText>
            </ListItem>
          ))
        }
      </List>
    </Card>
  );
}
