import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  radioButtonsContainer: {
    borderRadius: '4px',
    paddingLeft: '10px',
    '@global': {
      ' .MuiTouchRipple-root': { display: 'none' },
      ' .MuiIconButton-root': {
        paddingTop: '0px',
        paddingBottom: '0px',
      },
    },
  },
  error: {
    border: '2px solid',
    borderColor: theme.palette.alert.main,
    padding: '8px',
  },
  radioItem: {
    '@global': {
      ' .MuiFormControlLabel-label': {
        textAlign: 'left',
        whiteSpace: 'nowrap',
      },
    },
  },
  radioButtonsColumn: {
    ...theme.responsiveStyles({ marginRight: 24, marginBottom: 24, paddingLeft: 24 }),
    flexShrink: '0',
    width: 'fit-content',
  },
  radioButtonsColumnError: {
    marginBottom: '0px',
  },
  textError: {
    marginLeft: '14px',
    marginRight: '14px',
    marginTop: '4px',
  },
}));

export default useStyles;
