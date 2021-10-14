import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  error: {
    borderRadius: '4px',
    border: '2px solid',
    borderColor: theme.palette.alert.main,
  },
  root: {
    width: 'fit-content',
  },
}));

export default useStyles;
