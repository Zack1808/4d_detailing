import { useRef } from "react";
import ReactDOM from "react-dom";
import { FaXmark } from "react-icons/fa6";

import { Button } from "../components";

import "../css/components/Modal.css";

const Modal = ({ title, isOpen, toggleModal, children }) => {
  const modalBackgroundRef = useRef();

  const handleClick = (event) => {
    if (!modalBackgroundRef.current) return;

    if (modalBackgroundRef.current !== event.target) return;

    toggleModal(false);
  };

  return ReactDOM.createPortal(
    isOpen && (
      <div
        className={`modal-outer-container`}
        onClick={handleClick}
        ref={modalBackgroundRef}
      >
        <div className={`modal-inner-container`}>
          <div className="modal-header">
            {title && <h2>{title}</h2>}
            <Button
              onClick={() => toggleModal(false)}
              aria-label="Zatvori iskočni prozor"
            >
              <FaXmark aria-hidden="true" />
            </Button>
          </div>
          <div className="modal-body">{children}</div>
        </div>
      </div>
    ),
    document.getElementById("modal")
  );
};

export default Modal;
