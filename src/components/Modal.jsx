import { useRef } from "react";
import ReactDOM from "react-dom";
import { FaXmark } from "react-icons/fa6";

import { Button } from "../components";

import "../css/components/Modal.css";

const Modal = ({ isOpen, toggleModal, children }) => {
  const modalBackgroundRef = useRef();

  const handleClick = (event) => {
    if (!modalBackgroundRef.current) return;

    if (modalBackgroundRef.current !== event.target) return;

    toggleModal(false);
  };

  return ReactDOM.createPortal(
    <div
      className={`modal-outer-container ${isOpen ? "modal-open" : ""}`}
      onClick={handleClick}
      ref={modalBackgroundRef}
    >
      <div className={`modal-inner-container ${isOpen ? "modal-open" : ""}`}>
        <div className="modal-header">
          <Button onClick={() => toggleModal(false)}>
            <FaXmark />
          </Button>
        </div>
        {children}
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default Modal;
