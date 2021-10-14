import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  rightContainerAligment: {
    alignSelf: 'flex-start',
  },
  rowBottomMargin: theme.responsiveStyles({ marginBottom: 48 }),
  rowContainer: {
    [theme.breakpoints.up('xs')]: {
      paddingBottom: '8px',
      boxShadow: '0px 1px 1px rgb(168 184 194 / 68%)',
    },
    [theme.breakpoints.up('sm')]: {
      paddingBottom: 'unset',
      boxShadow: 'unset',
    },
  },
}));

export default useStyles;
