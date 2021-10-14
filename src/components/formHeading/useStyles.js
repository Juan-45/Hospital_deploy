import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  headingRow: {
    width: '100%',
    background: theme.palette.ternary.dark,
    borderStyle: 'solid',
    borderWidth: '0 0 2px 0',
    borderColor: theme.palette.secondary.main,
    ...theme.responsiveStyles({ paddingTop: 8 }),
  },
}));

export default useStyles;
