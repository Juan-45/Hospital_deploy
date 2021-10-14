import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  labelText: {
    '& .MuiTypography-alignCenter': {
      textAlign: 'left',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  },
});
export default useStyles;
