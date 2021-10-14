import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: '1',
    width: '96%',
    [theme.breakpoints.up('xs')]: {
      width: '96%',
      marginTop: '24px',
      paddingTop: '24px',
      paddingLeft: '24px',
      paddingRight: '24px',
    },
    [theme.breakpoints.up('sm')]: {
      width: '96%',
      marginTop: '24px',
      paddingTop: '24px',
      paddingLeft: '24px',
      paddingRight: '24px',
    },
    [theme.breakpoints.up('md')]: {
      width: '80%',
      marginTop: '24px',
      paddingTop: '24px',
      paddingLeft: '24px',
      paddingRight: '24px',
    },
    [theme.breakpoints.up('lg')]: {
      width: '70%',
      marginTop: '30px',
      paddingTop: '30px',
      paddingLeft: '30px',
      paddingRight: '30px',
    },
    background: theme.palette.mainBackground.dark,
  },
  rowBottomMargin: theme.responsiveStyles({ marginBottom: 48 }),
  doubleRowBottomMargin: theme.responsiveStyles({ marginBottom: 96 }),
  rightMargin: theme.responsiveStyles({ marginRight: 48 }),
  bottomLine: {
    ...theme.responsiveStyles({ paddingBottom: 34 }),
    boxShadow: '0px 1px 1px rgb(168 184 194 / 68%)',
    width: '100%',
  },
  errorSettedRedText: {
    color: theme.palette.alert.main,
  },
  errorSettedBlueText: {
    color: theme.palette.info.main,
  },
  dateInputLabel: {
    '@global': {
      ' .MuiInputLabel-formControl': {
        position: 'absolute',
        top: '11px',
        right: '50px',
        left: 'unset',
        fontSize: '20px',
      },
    },
  },
}));

export default useStyles;
