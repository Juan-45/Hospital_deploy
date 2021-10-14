import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: '0',
    left: '0',
    right: '0',
    zIndex: '999',
    background: theme.palette.primary.main,
    [theme.breakpoints.up('xs')]: {
      height: '100px',
    },
    [theme.breakpoints.up('sm')]: {
      height: '150px',
    },
    [theme.breakpoints.up('md')]: {
      height: '150px',
    },
    [theme.breakpoints.up('lg')]: {
      height: '150px',
    },
  },
}));

export default useStyles;
