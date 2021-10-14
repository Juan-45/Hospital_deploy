import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import FormAddedItem from 'components/FormAddedItem';
import FormHeading from 'components/FormHeading';
import PreSurgicalFormChildrenModal from 'components/PreSurgicalFormChildrenModal';
import StandarButton from 'components/StandarButton';
import StandarModal from 'components/StandarModal';
import React from 'react';

import useButtonHandlers from './completedStudy/useButtonHandlers';
import useStyles from './completedStudy/useStyles';

const CompletedStudy = ({ className, completedStudiesValues, setStateObj }) => {
  const { name, label, result, date, observations, unit, imageFiles } = completedStudiesValues;
  const [
    showModal,
    { handleOnClickDeleteButton, handleAcceptButton, handleCancelButton },
  ] = useButtonHandlers(setStateObj, name);

  const classes = useStyles();

  return (
    <FormAddedItem className={className}>
      <StandarModal openState={showModal}>
        <PreSurgicalFormChildrenModal
          text={`El estudio completado "${label}" será eliminado permanentemente, ¿Está seguro que desea continuar?`}
          handleAcceptButton={handleAcceptButton}
          handleCancelButton={handleCancelButton}
        />
      </StandarModal>
      <Grid container alignItems="center" className={classes.rowBottomMargin}>
        <FormHeading
          variant="body1"
          className={clsx(classes.textMark, classes.textAligment)}
          text={`Estudio: ${label}`}
        />
      </Grid>
      <Grid container direction="column" alignItems="center">
        <Grid container alignItems="flex-start" wrap="nowrap" className={classes.rowContainer}>
          <Grid
            container
            className={clsx(
              classes.textMarkContainer,
              observations === '' ? classes.result : classes.observations
            )}
          >
            <FormHeading
              variant="body2"
              className={clsx(classes.textMark, classes.textFirstSectionSpacing)}
              text="Resultado:"
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
            {`${result} ${unit !== undefined ? unit : ''}`}
          </Typography>
        </Grid>
        <Grid container alignItems="flex-start" wrap="nowrap" className={classes.rowContainer}>
          <Grid
            container
            className={clsx(
              classes.textMarkContainer,
              observations === '' ? classes.result : classes.observations
            )}
          >
            <FormHeading
              variant="body2"
              className={clsx(classes.textMark, classes.textFirstSectionSpacing)}
              text="Fecha:"
            />
          </Grid>
          <Typography
            variant="body2"
            className={clsx(classes.textSecondSectionSpacing, classes.textAligment)}
          >
            {date}
          </Typography>
        </Grid>
        {observations !== '' ? (
          <Grid container alignItems="flex-start" wrap="nowrap" className={classes.rowContainer}>
            <Grid
              container
              className={clsx(
                classes.textMarkContainer,
                observations === '' ? classes.result : classes.observations
              )}
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
        ) : null}
        {imageFiles !== undefined && imageFiles.length !== 0 ? (
          <Grid container alignItems="flex-start" wrap="nowrap" className={classes.rowContainer}>
            <Grid
              container
              className={clsx(
                classes.textMarkContainer,
                observations === '' ? classes.result : classes.observations
              )}
            >
              <FormHeading
                variant="body2"
                className={clsx(classes.textMark, classes.textFirstSectionSpacing)}
                text="Archivos:"
              />
            </Grid>
            <Grid container direction="column" alignItems="flex-start">
              {imageFiles.map((item) => (
                <Typography
                  key={item}
                  variant="body2"
                  className={clsx(classes.textSecondSectionSpacing, classes.textAligment)}
                >
                  {item}
                </Typography>
              ))}
            </Grid>
          </Grid>
        ) : null}
      </Grid>
      <Grid container justifyContent="flex-end">
        <StandarButton text="ELIMINAR" onClick={handleOnClickDeleteButton} />
      </Grid>
    </FormAddedItem>
  );
};

export default React.memo(CompletedStudy);
