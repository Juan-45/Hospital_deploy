import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  treatmentsTexts: {
    ...theme.responsiveStyles({ marginBottom: 16 }),
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'baseline',
  },
  textMark: {
    paddingRight: '5px',
    paddingLeft: '5px',
    width: 'fit-content',
  },
  textButton: {
    alignSelf: 'flex-end',
  },
  rowBottomMargin: theme.responsiveStyles({ marginBottom: 34 }),
  individualFieldWidth: theme.responsiveStyles({ width: 160 }),
  resultInput: {
    paddingRight: '8px',
    [theme.breakpoints.up('xs')]: {
      width: '240px',
    },
    [theme.breakpoints.up('lg')]: {
      width: '270px',
    },
    [theme.breakpoints.up('xl')]: {
      width: '300px',
    },
  },
  rowContainerBottomLine: {
    ...theme.responsiveStyles({ marginBottom: 14 }),
    boxShadow: '0px 1px 1px rgb(168 184 194 / 68%)',
    width: '100%',
    height: '1px',
    marginTop: '-1px',
  },
  textArea: {
    [theme.breakpoints.up('xs')]: {
      width: '100%',
    },
    [theme.breakpoints.up('sm')]: {
      width: '70%',
    },
  },
  unitText: { paddingTop: '3px' },
}));

export default useStyles;
