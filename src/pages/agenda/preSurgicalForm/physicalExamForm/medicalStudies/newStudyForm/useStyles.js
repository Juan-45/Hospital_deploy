import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  rowBottomMargin: theme.responsiveStyles({ marginBottom: 34 }),
  button: {
    alignSelf: 'flex-end',
  },
  rowContainerBottomLine: {
    ...theme.responsiveStyles({ marginBottom: 14 }),
    boxShadow: '0px 1px 1px rgb(168 184 194 / 68%)',
    width: '100%',
    height: '1px',
    marginTop: '-1px',
  },
  radioButtonsAlignment: {
    alignSelf: 'flex-start',
  },
  unitInput: {
    paddingRight: '8px',
    [theme.breakpoints.up('xs')]: {
      width: '240px',
    },
    [theme.breakpoints.up('lg')]: {
      width: '270px',
    },
    [theme.breakpoints.up('xl')]: {
      width: '300px',
    },
  },
  textArea: {
    [theme.breakpoints.up('xs')]: {
      width: '100%',
    },
    [theme.breakpoints.up('sm')]: {
      width: '70%',
    },
  },
}));

export default useStyles;
