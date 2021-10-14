import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  textMark: {
    width: 'fit-content',
    paddingRight: '5px',
    paddingLeft: '5px',
  },
  textMarkContainer: {
    width: 'fit-content',
    flexShrink: '0',
    paddingLeft: '5px',
  },
  rowContainer: {
    ...theme.responsiveStyles({ marginBottom: 16 }),
    boxShadow: '0px 1px 1px rgb(168 184 194 / 68%)',
  },
  observationContainerSpacing: {
    ...theme.responsiveStyles({ paddingBottom: 16 }),
  },
  textAligment: { textAlign: 'left' },
  textFirstSectionSpacing: theme.responsiveStyles({ marginBottom: 16, paddingTop: 8 }),
  textSecondSectionSpacing: {
    ...theme.responsiveStyles({ paddingTop: 8 }),
    marginLeft: '15px',
  },
  rowBottomMargin: theme.responsiveStyles({ marginBottom: 34 }),
  wrapText: {
    inlineSize: '80%',
    overflowWrap: 'break-word',
    hyphens: 'auto',
  },
  sinceDate: {
    [theme.breakpoints.up('xs')]: {
      width: '64px',
    },
    [theme.breakpoints.up('xl')]: {
      width: '70px',
    },
  },
  observations: {
    [theme.breakpoints.up('xs')]: {
      width: '126px',
    },
    [theme.breakpoints.up('xl')]: {
      width: '136px',
    },
  },
}));

export default useStyles;
