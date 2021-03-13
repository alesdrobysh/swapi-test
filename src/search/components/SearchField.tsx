import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TextField, CircularProgress, makeStyles, Typography } from "@material-ui/core";
import { Autocomplete } from '@material-ui/lab';

import { getLoading, getOptions, searchStart, select, Person, getCount } from '../store';

type StylesProps = {
  showHint: boolean;
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
    marginBottom: theme.spacing(),
  },
  hint: ({ showHint }: StylesProps) => ({
    visibility: showHint ? 'visible' : 'hidden',
    paddingLeft: theme.spacing(3 / 2),
    marginBottom: theme.spacing(3 / 4),
    fontSize: '0.8em',
    color: theme.palette.warning.main,
  })
}));

export const SearchField = () => {
  const isLoading = useSelector(getLoading);
  const options = useSelector(getOptions);
  const count = useSelector(getCount);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const showHint = open && count !== options.length;
  const styles = useStyles({ showHint });

  const onInputChange = useCallback((_event, value: string) => {
    dispatch(searchStart(value));
  }, [dispatch]);

  const onChange = useCallback((_event, value: Person | null) => {
    dispatch(select(value));
  }, [dispatch]);


  return (
    <div className={styles.root}>
      <Typography className={styles.hint}>{options.length} of {count} options are displayed</Typography>
      <Autocomplete
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
    </div>
  );
}
