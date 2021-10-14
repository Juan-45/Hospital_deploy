import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up('xs')]: {
      paddingRight: '0px',
      justifyContent: 'center',
      marginBottom: '17px',
    },
    [theme.breakpoints.up('sm')]: {
      paddingRight: '12px',
      justifyContent: 'flex-start',
      marginBottom: '0px',
    },
    [theme.breakpoints.up('lg')]: {
      paddingRight: '15px',
      justifyContent: 'flex-start',
      marginBottom: '0px',
    },
  },
}));

export default useStyles;
