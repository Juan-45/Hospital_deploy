import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  inputWidth: theme.responsiveStyles({ minWidth: 180 }),
  inputAlign: {
    alignSelf: 'flex-start',
  },
  individualInput: {
    paddingRight: '8px',
  },
  leftContainer: {
    marginBottom: '0px',
  },
  radioItem: theme.responsiveStyles({
    width: 110,
  }),
  rowBottomMargin: theme.responsiveStyles({ marginBottom: 34 }),
  bottomLine: {
    ...theme.responsiveStyles({ marginBottom: 34 }),
    boxShadow: '0px 1px 1px rgb(168 184 194 / 68%)',
  },
  rowContainerBottomLine: {
    ...theme.responsiveStyles({
      marginBottom: 16,
      marginTop: 32,
    }),
    boxShadow: '0px 1px 1px rgb(168 184 194 / 68%)',
    width: '100%',
    height: '1px',
  },
  fitContent: { width: 'fit-content' },
  sliders: {
    [theme.breakpoints.up('xs')]: {
      width: '80%',
      marginLeft: '30px',
    },
    [theme.breakpoints.up('sm')]: {
      width: '70%',
    },
  },
  textFirstSectionSpacing: theme.responsiveStyles({ marginBottom: 16, paddingTop: 8 }),
  textSecondSectionSpacing: theme.responsiveStyles({ paddingTop: 8 }),
  textAligment: { textAlign: 'left' },
  textMark: {
    width: 'fit-content',
    paddingRight: '5px',
    paddingLeft: '5px',
  },
  textMarkContainer: {
    marginRight: '15px',
    flexShrink: '0',
  },
  leftTextMarkContainer: theme.responsiveStyles({ width: 82 }),
  rightTextMarkContainer: theme.responsiveStyles({ width: 58 }),
  formulaText: theme.responsiveStyles({ marginBottom: 18 }),
  textArea: {
    [theme.breakpoints.up('xs')]: {
      width: '100%',
    },
    [theme.breakpoints.up('sm')]: {
      width: '70%',
    },
  },
  isUnresolvedError: {
    width: '100%',
    border: '2px solid',
    borderRadius: '4px',
    borderColor: theme.palette.alert.main,
    ...theme.responsiveStyles({ padding: 24 }),
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
