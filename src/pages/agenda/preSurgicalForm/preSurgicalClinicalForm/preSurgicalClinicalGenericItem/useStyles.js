import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  textArea: {
    [theme.breakpoints.up('xs')]: {
      width: '100%',
      marginBottom: '12px',
    },
    [theme.breakpoints.up('sm')]: {
      width: '70%',
      marginBottom: '14px',
    },
  },
  topMargin: theme.responsiveStyles({ marginTop: 24 }),
  checkBoxesGroup: { width: '100%' },
}));

export default useStyles;
