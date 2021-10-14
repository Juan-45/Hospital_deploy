import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.primary.main,
    ...theme.responsiveStyles({ paddingLeft: 37, paddingRight: 48 }),
  },
}));
export default useStyles;
