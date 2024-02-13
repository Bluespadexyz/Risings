import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import "./index.scss";
import XImage from "assets/images/common/X.png";

// ================================================

const RisingsModal = ({
  children,
  open,
  setOpen,
  onOpenModal,
  onCloseModal,
  classes,
}) => {
  return (
    <Modal
      open={open}
      onClose={onCloseModal}
      center
      classNames={{ modal: `loh-modal ${classes}` }}
    >
      <button onClick={onCloseModal} className="shut-btn">
        <img src={XImage} alt="X.png" />
      </button>
      {children}
    </Modal>
  );
};

export default RisingsModal;
