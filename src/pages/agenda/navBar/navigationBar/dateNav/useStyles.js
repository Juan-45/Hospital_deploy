import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexShrink: '0',
    ...theme.responsiveStyles({
      marginLeft: 48,
      width: 370,
    }),
  },
}));

export default useStyles;
