import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  childrenContainer: {
    visibility: 'hidden',
    opacity: '0',
    transition: 'all 0.5s ease-in-out',
  },
  renderedChildrenContainer: {
    visibility: 'visible',
    opacity: '1',
  },
  formHeaderContainer: {
    ...theme.responsiveStyles({
      paddingRight: 24,
      paddingLeft: 24,
      paddingTop: 8,
      paddingBottom: 8,
    }),
    background: theme.palette.ternary.main,
    borderStyle: 'solid',
    borderWidth: '0 0 2px 0',
    borderColor: theme.palette.secondary.main,
  },
}));

export default useStyles;
