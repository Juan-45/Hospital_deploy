import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexShrink: '0',
    [theme.breakpoints.up('xs')]: {
      width: '7.6rem',
    },
    [theme.breakpoints.up('sm')]: {
      width: '13.5rem',
    },
    [theme.breakpoints.up('lg')]: {
      width: '15rem',
    },
  },
}));

export default useStyles;
