import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  radioItem: theme.responsiveStyles({
    width: 180,
  }),
  text: {
    marginLeft: '-30px',
  },
}));

export default useStyles;
