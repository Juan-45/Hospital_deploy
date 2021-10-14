import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import FormAddedItem from 'components/FormAddedItem';
import FormHeading from 'components/FormHeading';
import PreSurgicalFormChildrenModal from 'components/PreSurgicalFormChildrenModal';
import StandarButton from 'components/StandarButton';
import StandarModal from 'components/StandarModal';

import useInputs from './treatmentItem/useInputs';
import useStyles from './treatmentItem/useStyles';

const TreatmentItem = ({ className, setStateObj, valuesObj }) => {
  const classes = useStyles();
  const { drug, startingTreatmentDate, endingTreatmentDate, observations } = valuesObj;
  const textMarkContainerWidthClass =
    observations !== '' ? classes.observations : classes.sinceDate;

  const [showModal, { handleDeleteButton, handleAcceptButton, handleCancelButton }] = useInputs({
    setStateObj,
    currentDrug: drug,
  });

  return (
    <FormAddedItem className={className}>
      <StandarModal openState={showModal}>
        <PreSurgicalFormChildrenModal
          text={`El tratamiento "${drug}" será eliminado permanentemente, ¿Está seguro que desea continuar?`}
          handleAcceptButton={handleAcceptButton}
          handleCancelButton={handleCancelButton}
        />
      </StandarModal>
      <Grid container alignItems="center" className={classes.rowBottomMargin}>
        <FormHeading
          variant="body1"
          className={clsx(classes.textMark, classes.textAligment)}
          text={`Medicación: ${drug}`}
        />
      </Grid>
      <Grid container direction="column" alignItems="center">
        {startingTreatmentDate !== '' && (
          <Grid container alignItems="flex-start" wrap="nowrap" className={classes.rowContainer}>
            <Grid
              container
              className={clsx(classes.textMarkContainer, textMarkContainerWidthClass)}
            >
              <FormHeading
                variant="body2"
                className={clsx(classes.textMark, classes.textFirstSectionSpacing)}
                text="Desde:"
              />
            </Grid>
            <Typography
              variant="body2"
              className={clsx(
                classes.textSecondSectionSpacing,
                classes.textAligment,
                classes.wrapText
              )}
            >
              {startingTreatmentDate}
            </Typography>
          </Grid>
        )}
        {endingTreatmentDate !== '' && (
          <Grid container alignItems="flex-start" wrap="nowrap" className={classes.rowContainer}>
            <Grid
              container
              className={clsx(classes.textMarkContainer, textMarkContainerWidthClass)}
            >
              <FormHeading
                variant="body2"
                className={clsx(classes.textMark, classes.textFirstSectionSpacing)}
                text="Hasta:"
              />
            </Grid>
            <Typography
              variant="body2"
              className={clsx(
                classes.textSecondSectionSpacing,
                classes.textAligment,
                classes.wrapText
              )}
            >
              {endingTreatmentDate}
            </Typography>
          </Grid>
        )}
        {observations !== '' && (
          <Grid
            container
            alignItems="flex-start"
            wrap="nowrap"
            className={clsx(classes.rowContainer, classes.observationContainerSpacing)}
          >
            <Grid
              container
              className={clsx(classes.textMarkContainer, textMarkContainerWidthClass)}
            >
              <FormHeading
                variant="body2"
                className={clsx(classes.textMark, classes.textFirstSectionSpacing)}
                text="Observaciones:"
              />
            </Grid>
            <Typography
              variant="body2"
              className={clsx(
                classes.textSecondSectionSpacing,
                classes.textAligment,
                classes.wrapText
              )}
            >
              {observations}
            </Typography>
          </Grid>
        )}
      </Grid>
      <Grid
        container
        item
        alignContent="flex-end"
        justifyContent="flex-end"
        className={classes.buttonContainer}
      >
        <StandarButton text="ELIMINAR" onClick={handleDeleteButton} />
      </Grid>
    </FormAddedItem>
  );
};

export default TreatmentItem;
