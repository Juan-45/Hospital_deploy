import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up('xs')]: { paddingLeft: '0px', justifyContent: 'center' },
    [theme.breakpoints.up('sm')]: { paddingLeft: '12px', justifyContent: 'flex-end' },
    [theme.breakpoints.up('lg')]: { paddingLeft: '15px', justifyContent: 'flex-end' },
  },
}));

export default useStyles;
