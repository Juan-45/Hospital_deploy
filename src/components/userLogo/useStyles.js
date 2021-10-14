import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  userLogoBox: {
    borderRadius: '50%',
    borderColor: theme.palette.secondary.main,
    borderStyle: 'solid',
    borderWidth: '2px',
    flexShrink: '0',
    ...theme.responsiveStyles({
      width: 58,
      height: 58,
    }),
  },
}));

export default useStyles;
