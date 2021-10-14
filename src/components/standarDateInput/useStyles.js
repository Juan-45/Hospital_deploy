import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  error: {
    border: '2px solid',
    borderRadius: '4px',
    borderColor: theme.palette.alert.main,
  },
  textError: {
    marginLeft: '14px',
    marginRight: '14px',
    marginTop: '4px',
  },
  container: {
    '@global': {
      '.MuiFormHelperText-root': {
        marginLeft: '14px',
        marginRight: '14px',
        marginTop: '4px',
      },
      ' .MuiInput-root': {
        marginTop: '0px',
      },
    },
  },
}));

export default useStyles;
