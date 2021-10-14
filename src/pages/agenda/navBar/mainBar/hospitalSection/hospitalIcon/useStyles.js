import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  hospitalIcon: {
    color: theme.palette.alert.main,
    ...theme.responsiveStyles({ marginRight: 24 }),
  },
}));

export default useStyles;
