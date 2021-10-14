import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
    '@global': {
      ' .MuiSelect-root': {
        paddingBottom: '4.9px',
        paddingTop: '4.9px',
        paddingLeft: '4.9px',
      },
      ' .MuiInputLabel-formControl': {
        left: '10px',
      },
    },
  },
  error: {
    border: '2px solid',
    borderRadius: '4px',
    borderColor: theme.palette.alert.main,
  },
}));

export default useStyles;
