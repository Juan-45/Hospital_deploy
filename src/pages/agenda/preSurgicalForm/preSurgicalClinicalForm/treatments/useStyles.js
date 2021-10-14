import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  individualFieldWidth: theme.responsiveStyles({ width: 160 }),
  topMargin: theme.responsiveStyles({ marginTop: 24 }),
  rowBottomMargin: theme.responsiveStyles({ marginBottom: 34 }),
  rowTopMargin: theme.responsiveStyles({ marginTop: 34 }),
  dateInputLeftPadding: {
    [theme.breakpoints.up('xs')]: {
      paddingLeft: '0px',
    },
    [theme.breakpoints.up('sm')]: {
      paddingLeft: '16px',
    },
    [theme.breakpoints.up('lg')]: {
      paddingLeft: '19px',
    },
  },
  radioButtonsAlignment: {
    alignSelf: 'flex-start',
  },
  rowContainer: {
    ...theme.responsiveStyles({ marginBottom: 16 }),
    boxShadow: '0px 1px 1px rgb(168 184 194 / 68%)',
  },
  textArea: {
    [theme.breakpoints.up('xs')]: {
      width: '100%',
    },
    [theme.breakpoints.up('sm')]: {
      width: '70%',
    },
  },
  isUnresolvedError: {
    border: '2px solid',
    borderRadius: '4px',
    borderColor: theme.palette.alert.main,
    ...theme.responsiveStyles({ padding: 24 }),
  },
  textError: {
    color: theme.palette.alert.main,
    textAlign: 'left',
    marginRight: '14px',
    marginLeft: '14px',
    marginTop: '4px',
  },
  textExtraError: {
    marginLeft: '14px',
    marginRight: '14px',
    marginTop: '4px',
  },
}));

export default useStyles;
