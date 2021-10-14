import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  leftSelectInput: {
    marginRight: '24px',
  },
  textError: {
    color: theme.palette.alert.main,
    textAlign: 'left',
    marginLeft: '14px',
    marginRight: '14px',
    marginTop: '4px',
  },
  containerError: {
    width: 'fit-content',
    padding: '8px',
    margin: '1px',
    border: '2px solid',
    borderRadius: '4px',
    borderColor: theme.palette.alert.main,
  },
  container: {
    margin: '1px',
  },
}));

export default useStyles;
