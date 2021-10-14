import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.ternary.main,
    ...theme.responsiveStyles({ paddingLeft: 48, paddingRight: 48 }),
  },
  input: {
    '@global': {
      '.MuiOutlinedInput-notchedOutline > legend': {
        lineHeight: '12px',
      },
    },
  },
  barElement: { minWidth: '245px' },
}));

export default useStyles;
