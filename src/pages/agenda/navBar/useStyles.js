import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  buttonsBar: {
    background: theme.palette.primary.main,
    paddingTop: '5px',
    paddingBottom: '5px',
    position: 'relative',
    [theme.breakpoints.up('xs')]: {
      justifyContent: 'space-between',
      flexDirection: 'row',
      paddingLeft: '24px',
      paddingRight: '24px',
    },
    [theme.breakpoints.up('sm')]: {
      justifyContent: 'center',
    },
    [theme.breakpoints.up('lg')]: {
      paddingLeft: '30px',
      paddingRight: '30px',
    },
  },
  buttonsContainer: {
    width: 'initial',
  },
  leftButtonMargin: {
    [theme.breakpoints.up('xs')]: {
      marginLeft: '24px',
    },
    [theme.breakpoints.up('md')]: {
      marginLeft: '96px',
    },
    [theme.breakpoints.up('lg')]: {
      marginLeft: '120px',
    },
  },
  root: {
    background: theme.palette.primary.main,
  },
  menuButton: {
    [theme.breakpoints.up('xs')]: {
      position: 'static',
    },

    [theme.breakpoints.up('sm')]: {
      position: 'absolute',
      right: '24px',
      top: '5px',
    },

    [theme.breakpoints.up('lg')]: {
      right: '30px',
    },
  },
}));

export default useStyles;
