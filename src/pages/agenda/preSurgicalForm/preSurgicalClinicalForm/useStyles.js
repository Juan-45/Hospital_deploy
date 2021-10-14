import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  rowBottomMargin: theme.responsiveStyles({ marginBottom: 24 }),
  noCheckboxesTextArea: theme.responsiveStyles({ marginTop: 24 }),
}));

export default useStyles;
