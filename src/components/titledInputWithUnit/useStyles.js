import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  inputAlign: {
    alignSelf: 'flex-start',
  },
  individualInput: {
    paddingRight: '8px',
  },
  innerContainer: { width: 'fit-content', paddingTop: '1px' },
  unitText: { paddingTop: '3px' },
});

export default useStyles;
