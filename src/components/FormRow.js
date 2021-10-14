import Grid from '@material-ui/core/Grid';

const FormRow = ({ children, className, ...props }) => (
  <Grid container justifyContent="center" alignItems="flex-start" className={className} {...props}>
    {children}
  </Grid>
);

export default FormRow;
