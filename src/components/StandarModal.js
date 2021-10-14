import Modal from '@material-ui/core/Modal';

const StandarModal = ({ children, openState, ...props }) => (
  <Modal open={openState} {...props}>
    {children}
  </Modal>
);

export default StandarModal;
