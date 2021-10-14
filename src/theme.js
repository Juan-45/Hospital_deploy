import { createTheme } from "@material-ui/core/styles";

//Remenber- SnackBar to show up messages / Drawer to temporary sidebar in next pages of the app
// / Dialog to recurrent user accounts / Stepper to show to the user the progress of a process with some steps
// Table to show selectable info
// Tool Tips to show some basic info about the function of a button

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 700,
      md: 900,
      lg: 1368,
      xl: 1921,
    },
  },

  customShadows: {
    defaultOutter:
      "1px -1px 3px rgba(0,0,0,0.25), 2px -2px 3px rgba(0,0,0,0.10)",
  },

  palette: {
    mainBackground: {
      main: "#EEF9FF",
      dark: "#D0E3ED",
    },
    primary: {
      //dark background
      light: "#7aa1b8",
      main: "#426175",
    },
    secondary: {
      //border color
      main: "#2DBCB6",
    },

    ternary: {
      //forms background
      //light: '#BDD1DC',
      light: "#cae0ec",
      main: "#B6C7D1",
      dark: "#A8B8C2",
      darker: "#73818a",
    },

    info: {
      //blue
      light: "#6286D9",
      main: "#3364D6",
    },

    alert: {
      //red
      main: "#f44336",
    },

    success: {
      //green
      main: "#60B234",
    },

    secondaryTextColor: {
      main: "rgba(0, 0, 0, 0.54)",
    },
  },
});

const roundingWithBase0_5 = (valueToRound) => {
  const int_part = Math.trunc(valueToRound);
  const difference = valueToRound - int_part;
  let roundedValue;
  if (difference === 0 || difference === 0.5) {
    roundedValue = valueToRound;
  } else if (difference < 0.25) {
    roundedValue = int_part;
  } else if (difference >= 0.25 && difference < 0.75) {
    roundedValue = int_part + 0.5;
  } else if (difference >= 0.75) {
    roundedValue = int_part + 1;
  }
  return roundedValue;
};

const responsiveStyles = (initialStyleObj, isImportant) => {
  const unitValue = 0.5;
  const important = isImportant ? " !important" : "";
  let firstBreakpointsStyles = {};
  let secondBreakpointsStyles = {};
  let thirdBreakpointsStyles = {};
  for (const property in initialStyleObj) {
    const integerMultiplier = initialStyleObj[property];
    const value = integerMultiplier * unitValue;
    const incrementedValue_lg = value * 1.125;
    const incrementedValue_xl = value * 1.25;
    const finalValue_lg = roundingWithBase0_5(incrementedValue_lg);
    const finalValue_xl = roundingWithBase0_5(incrementedValue_xl);
    firstBreakpointsStyles[property] = `${value}px${important}`;
    secondBreakpointsStyles[property] = `${finalValue_lg}px${important}`;
    thirdBreakpointsStyles[property] = `${finalValue_xl}px${important}`;
  }
  const responsiveStylesObj = {
    [theme.breakpoints.up("xs")]: {
      ...firstBreakpointsStyles,
    },
    [theme.breakpoints.up("lg")]: {
      ...secondBreakpointsStyles,
    },
    [theme.breakpoints.up("xl")]: {
      ...thirdBreakpointsStyles,
    },
  };
  return responsiveStylesObj;
};

const fontFamily = '"Helvetica", "Arial", sans-serif';
theme.typography.fontFamily = fontFamily;
theme.responsiveStyles = responsiveStyles;

theme.defaultResponsiveFontSizes = {
  [theme.breakpoints.up("xs")]: {
    fontSize: "16px",
  },
  [theme.breakpoints.up("xl")]: {
    fontSize: "18px",
  },
};
const { defaultResponsiveFontSizes } = theme;
const { primary, ternary, alert, mainBackground } = theme.palette;

theme.props = {
  ...theme.props,
  MuiTypography: {
    align: "center",
  },
  MuiGrid: {
    alignItems: "center",
  },
  MuiMenuItem: {
    disableRipple: true,
  },
};

theme.typography.body1 = {
  ...theme.typography.body1,
  fontFamily,
  ...defaultResponsiveFontSizes,
  fontWeight: "700",
};

theme.typography.body2 = {
  ...theme.typography.body2,
  fontFamily,
  fontWeight: "700",
  [theme.breakpoints.up("xs")]: {
    fontSize: "14px",
  },
  [theme.breakpoints.up("xl")]: {
    fontSize: "16px",
  },
};

theme.typography.h6 = {
  fontFamily,
  fontWeight: "700",
  [theme.breakpoints.up("xs")]: {
    fontSize: "20px",
  },
  [theme.breakpoints.up("xl")]: {
    fontSize: "23px",
  },
};

theme.typography.caption = {
  ...theme.typography.caption,
  fontWeight: "600",
};

theme.overrides = {
  MuiGrid: {
    root: {
      boxSizing: "border-box",
      overflow: "hidden",
    },
  },
  MuiTypography: {
    button: {
      fontFamily,
      lineHeight: "1",
      fontWeight: "700",
      ...defaultResponsiveFontSizes,
    },
  },

  MuiSvgIcon: {
    root: {
      display: "block",
      [theme.breakpoints.up("xs")]: {
        fontSize: "20px",
      },
      [theme.breakpoints.up("xl")]: {
        fontSize: "22px",
      },
    },
    fontSizeLarge: responsiveStyles({ fontSize: 86 }),
    fontSizeSmall: responsiveStyles({ fontSize: 32 }),
  },

  MuiButton: {
    root: {
      lineHeight: "1",
      letterSpacing: "0px",
      "&:hover": {
        backgroundColor: primary.light,
      },
    },
    textSizeSmall: {
      fontSize: "16px",
      padding: "5px",
      height: "28px",
      flexShrink: "0",
    },

    iconSizeSmall: {
      "& :first-child": {
        [theme.breakpoints.up("xs")]: {
          fontSize: "18px",
        },
        [theme.breakpoints.up("xl")]: {
          fontSize: "22px",
        },
      },
    },
    startIcon: {
      marginRight: "0px",
      "&.MuiButton-iconSizeSmall": { marginLeft: "auto", marginRight: "3px" },
    },
  },

  MuiBadge: {
    anchorOriginTopRightRectangle: {
      transform: "scale(1) translate(0%, 0%)",
    },
    colorError: {
      backgroundColor: alert.main,
    },
    badge: responsiveStyles({
      fontSize: 24,
      height: 24,
      minWidth: 52,
    }),
  },

  MuiOutlinedInput: {
    root: {
      backgroundColor: ternary.main,
      "&:hover": {
        backgroundColor: ternary.dark,
      },
      "&.Mui-focused": {
        backgroundColor: ternary.main,
      },
      "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
        top: "-5px",
        borderWidth: "2px",
      },
      "&:hover $notchedOutline": {
        borderColor: primary.light,
      },
      "& $notchedOutline": {
        borderWidth: "0px",
      },
      "&.MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline": {
        border: "2px solid",
        borderColor: theme.palette.alert.main,
      },
    },
    inputMarginDense: {
      boxSizing: "border-box",
      paddingTop: "0px",
      paddingBottom: "0px",
      paddingLeft: "10px",
      paddingRight: "10px",
    },
  },

  MuiInputBase: {
    root: {
      height: "100%",
      lineHeight: "unset",
    },
    input: {
      fontWeight: "500",
      height: "28px",
      fontSize: "16px",
    },
  },
  MuiFormControl: {
    root: {
      height: "100%",
    },
  },

  MuiAccordion: {
    root: {
      "&:before": {
        height: "0px",
      },
    },
    rounded: {
      borderRadius: "5px",
    },
  },

  MuiAccordionSummary: {
    root: {
      ...responsiveStyles({ minHeight: 70 }),
      justifyContent: "space-between",
      background: mainBackground.dark,
      borderRadius: "5px",
      "&:hover": {
        filter: "brightness(97%)",
      },
      "&.Mui-expanded": {
        minHeight: "unset",
        borderWidth: "2px",
        borderRadius: "5px",
        borderBottomLeftRadius: "0px",
        borderBottomRightRadius: "0px",
        borderStyle: "solid",
        borderColor: theme.palette.secondary.main,
      },
    },
    content: {
      maxWidth: "94%",
      margin: "0px",
      "&.Mui-expanded": {
        margin: "0px",
      },
    },
  },

  MuiAccordionDetails: {
    root: {
      background: mainBackground.dark,
      padding: "0px",
      borderBottomLeftRadius: "5px",
      borderBottomRightRadius: "5px",
    },
  },

  MuiIconButton: {
    root: responsiveStyles({ padding: 10 }),
  },

  MuiMenuItem: {
    root: {
      minHeight: "auto",
    },
  },

  MuiPaper: {
    elevation1: {
      boxShadow: theme.customShadows.defaultOutter,
    },
  },

  MuiSwitch: {
    thumb: {
      boxShadow: theme.customShadows.defaultOutter,
    },
  },

  MuiFormLabel: {
    root: {
      color: "black",
      "&.Mui-focused": {
        color: "black",
      },
    },
  },

  MuiInput: {
    underline: {
      "&.MuiInput-underline:hover:before": {
        borderBottom: "2px solid #2DBCB6",
      },
      "&.MuiInput-underline:after": {
        borderBottom: "2px solid #2DBCB6",
      },
    },
  },

  MuiSlider: {
    root: {
      color: theme.palette.secondary.main,
    },
  },
};

export default theme;
