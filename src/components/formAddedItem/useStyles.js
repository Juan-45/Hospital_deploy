import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    ...theme.responsiveStyles({ padding: 16 }),
    border: '2px solid',
    borderColor: theme.palette.secondary.main,
    borderRadius: '4px',
    width: '100%',
  },
  buttonContainer: { ...theme.responsiveStyles({ paddingTop: 16 }), width: 'fit-content' },
}));

export default useStyles;
