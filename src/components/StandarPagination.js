import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';

const StandarPagination = ({ className, ...props }) => (
  <Grid container justifyContent="center" alignItems="center" className={className}>
    <Pagination {...props} />
  </Grid>
);

export default StandarPagination;
