import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: '20px',
    paddingRight: '20px',
    paddingTop: '8px',
  },
  error: {
    color: theme.palette.alert.main,
  },
}));

export default useStyles;
