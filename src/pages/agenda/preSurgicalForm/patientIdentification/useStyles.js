import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  headingBottomMargin: theme.responsiveStyles({ marginBottom: 34 }),
  lastChildren: {
    paddingBottom: '0px',
  },
}));

export default useStyles;
