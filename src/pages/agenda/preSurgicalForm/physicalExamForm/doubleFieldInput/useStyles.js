import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  topPadding: { paddingTop: '6px' },
  inputContainer: theme.responsiveStyles({ width: 200 }),
  textError: {
    color: theme.palette.alert.main,
    textAlign: 'left',
    marginLeft: '14px',
    marginRight: '14px',
    marginTop: '4px',
  },
  formControl: {
    width: '100%',
  },
  containerError: {
    width: 'fit-content',
    paddingRight: '8px',
    border: '2px solid',
    borderRadius: '4px',
    borderColor: theme.palette.alert.main,
  },
  container: {
    margin: '1px',
  },
  measurementUnitText: {
    marginLeft: '8px',
  },
  spacerCharacter: {
    marginRight: '8px',
    marginLeft: '8px',
  },
}));

export default useStyles;
