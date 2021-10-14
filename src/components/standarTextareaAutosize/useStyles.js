import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexShrink: '0',
    boxSizing: 'border-box',
    maxWidth: '100%',
    fontFamily: theme.typography.fontFamily,
    fontWeight: '500',
    borderWidth: '0px',
    borderRadius: '4px',
    ...theme.responsiveStyles({
      paddingTop: 6,
      paddingBottom: 10,
      paddingLeft: 18,
      paddingRight: 18,
    }),
    [theme.breakpoints.up('xs')]: {
      fontSize: '16px',
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '16px',
    },
    [theme.breakpoints.up('xl')]: {
      fontSize: '20px',
    },
    '&:focus': {
      borderWidth: '2px',
      borderColor: theme.palette.secondary.main,
    },
  },
  error: {
    border: '2px solid',
    borderColor: theme.palette.alert.main,
  },
  formControl: {
    width: '100%',
  },
  textError: {
    marginLeft: '14px',
    marginRight: '14px',
    marginTop: '4px',
  },
}));

export default useStyles;
