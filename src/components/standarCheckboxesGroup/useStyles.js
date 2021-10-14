import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  checkboxesColumn: {
    ...theme.responsiveStyles({ marginRight: 24, marginBottom: 24, paddingLeft: 24 }),
    flexShrink: '0',
  },
  noWrapWithOutSlider: {
    width: 'fit-content',
  },
  noWrapContainer: {
    scrollSnapType: 'x mandatory',
  },
  noWrapChildren: {
    scrollSnapAlign: 'start',
    margin: '0px',
    '& .MuiFormControlLabel-root': {
      marginRight: '0px',
      paddingRight: '16px',
      width: '100%',
    },
  },

  scrollOnAmountMoreThan8Container: {
    [theme.breakpoints.up('xs')]: {
      overflowX: 'scroll',
    },
    [theme.breakpoints.up('md')]: {
      overflowX: 'unset',
    },
  },

  scrollOnAmountMoreThan8Children: {
    [theme.breakpoints.up('xs')]: {
      width: '50%',
      '& .MuiFormControlLabel-root': {
        boxSizing: 'border-box',
      },
    },
    [theme.breakpoints.up('md')]: {
      width: 'fit-content',
      '& .MuiFormControlLabel-root': {
        boxSizing: 'unset',
      },
    },
  },

  scrollOnAmountMoreThan12Container: {
    [theme.breakpoints.up('xs')]: {
      overflowX: 'scroll',
    },
    [theme.breakpoints.up('xl')]: {
      overflowX: 'unset',
    },
  },

  scrollOnAmountMoreThan12Children: {
    [theme.breakpoints.up('xs')]: {
      width: '50%',
      '& .MuiFormControlLabel-root': {
        boxSizing: 'border-box',
      },
    },
    [theme.breakpoints.up('md')]: {
      width: '33.3%',
    },
    [theme.breakpoints.up('xl')]: {
      width: 'fit-content',
      '& .MuiFormControlLabel-root': {
        boxSizing: 'unset',
      },
    },
  },

  scrollOnAmountMoreThan16Container: {
    overflowX: 'scroll',
  },

  scrollOnAmountMoreThan16Children: {
    [theme.breakpoints.up('xs')]: {
      width: '50%',
      '& .MuiFormControlLabel-root': {
        boxSizing: 'border-box',
      },
    },
    [theme.breakpoints.up('md')]: {
      width: '33.3%',
    },
    [theme.breakpoints.up('xl')]: {
      width: '25%',
    },
  },
}));

export default useStyles;
