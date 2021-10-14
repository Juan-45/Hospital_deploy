import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  rowTopMargin: theme.responsiveStyles({ marginTop: 34 }),
  rowBottomMargin: theme.responsiveStyles({ marginBottom: 34 }),
  itemsContainer: {
    '@global': {
      ' > div:last-child': {
        marginBottom: '0px',
      },
    },
  },
}));

export default useStyles;
