import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  checkBoxesGroup: { width: '100%' },
  rowBottomMargin: theme.responsiveStyles({ marginBottom: 34 }),
  rowTopMargin: theme.responsiveStyles({ marginTop: 34 }),
  isUnresolvedError: {
    border: '2px solid',
    borderRadius: '4px',
    borderColor: theme.palette.alert.main,
    ...theme.responsiveStyles({ padding: 24, marginTop: 34 }),
  },
  textError: {
    color: theme.palette.alert.main,
    textAlign: 'left',
    marginRight: '14px',
    marginLeft: '14px',
    marginTop: '4px',
  },
}));

export default useStyles;
