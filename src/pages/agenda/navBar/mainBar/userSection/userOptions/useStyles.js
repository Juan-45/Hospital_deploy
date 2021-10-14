import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  menuWithBadge: theme.responsiveStyles({ marginRight: 58 }),
  menuWithBadgeZero: { marginRight: '0rem' },
}));

export default useStyles;
