import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TextField, CircularProgress, makeStyles } from "@material-ui/core";
import { Autocomplete } from '@material-ui/lab';

import { getLoading, getOptions, searchStart, select, Person } from '../store';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
    marginBottom: theme.spacing(),
  }
}));

export const SearchField = () => {
  const styles = useStyles();
  const isLoading = useSelector(getLoading);
  const options = useSelector(getOptions);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const onInputChange = useCallback((_event, value: string) => {
    dispatch(searchStart(value));
  }, [dispatch]);

  const onChange = useCallback((_event, value: Person | null) => {
    dispatch(select(value));
  }, [dispatch]);

  return <Autocomplete
    className={styles.root}
    open={open}
    onOpen={() => setOpen(true)}
    onClose={() => setOpen(false)}
    onInputChange={onInputChange}
    onChange={onChange}
    options={options}
    getOptionLabel={(option) => option.name}
    getOptionSelected={(option, value) => option.name === value.name}
    renderInput={(params) =>
      <TextField
        {...params}
        label="Type to search"
        variant="outlined"
        InputProps={{
          ...params.InputProps,
          endAdornment: (
            <>
              {isLoading ? (
                <CircularProgress color="inherit" size={20} />
              ) : null}
              {params.InputProps.endAdornment}
            </>
          )
        }}
      />
    }
  />
}
