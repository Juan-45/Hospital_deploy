import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  rowBottomMargin: theme.responsiveStyles({ marginBottom: 34 }),
  rowDoubleBottomMargin: theme.responsiveStyles({ marginBottom: 48 }),
}));

export default useStyles;
