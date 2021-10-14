import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  modalChildrenContainer: {
    ...theme.responsiveStyles({
      padding: 24,
    }),
    width: '500px',
    borderRadius: '5px',
    borderWidth: '2px',
    borderColor: theme.palette.secondary.main,
    borderStyle: 'solid',
    background: theme.palette.mainBackground.dark,
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },

  modalItemsMargin: theme.responsiveStyles({
    marginBottom: 24,
  }),

  isValid: {
    color: theme.palette.success.main,
  },

  modalButtonsContainer: theme.responsiveStyles({ marginBottom: 34 }),
}));

export default useStyles;
