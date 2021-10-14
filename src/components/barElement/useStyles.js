import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    borderRadius: '4px',
  },
  containerBorder: {
    borderStyle: 'solid',
    borderColor: theme.palette.secondary.main,
    borderWidth: '2px',
  },
  growClass: {
    flexGrow: '1',
  },
}));

export default useStyles;
