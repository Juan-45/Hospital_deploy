import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    minHeight: '31px',
    '& .MuiOutlinedInput-inputMarginDense': {
      paddingTop: '3px',
    },
  },
});

export default useStyles;
