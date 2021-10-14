import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  rowBottomMargin: theme.responsiveStyles({ marginBottom: 34 }),
  bottomLine: {
    ...theme.responsiveStyles({ paddingBottom: 10 }),
    boxShadow: '0px 1px 1px rgb(168 184 194 / 68%)',
  },
  bottomLineFullPadding: {
    ...theme.responsiveStyles({ paddingBottom: 34 }),
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
