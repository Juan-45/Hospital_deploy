import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  '&.MuiButton-root': {
    padding: '6px',
    [theme.breakpoints.up('xs')]: {
      paddingLeft: '9px',
      minWidth: '30px',
    },
    [theme.breakpoints.up('lg')]: {
      paddingLeft: '9px',
      minWidth: '34px',
    },
    [theme.breakpoints.up('xl')]: {
      paddingLeft: '10px',
      minWidth: '37.5px',
    },
  },
}));

export default useStyles;
