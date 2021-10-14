import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  radioItem: theme.responsiveStyles({
    width: 248,
  }),
  radioItemMalampati: theme.responsiveStyles({
    width: 110,
  }),
  inputAlign: {
    alignSelf: 'flex-start',
  },
  leftContainer: {
    marginBottom: '0px',
  },
  rowBottomMargin: theme.responsiveStyles({ marginBottom: 34 }),
  bottomLine: {
    ...theme.responsiveStyles({ marginBottom: 34 }),
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
}));

export default useStyles;
