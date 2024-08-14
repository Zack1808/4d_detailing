import { useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { FaXmark } from "react-icons/fa6";

import { Button } from "../components";

import "../css/components/Modal.css";

const Modal = ({ isOpen, toggleModal, children }) => {
  const [pageIsLoading, setPageIsLoading] = useState(true);

  const modalBackgroundRef = useRef();

  const handleClick = (event) => {
    if (!modalBackgroundRef.current) return;

    if (modalBackgroundRef.current !== event.target) return;

    toggleModal(false);
  };

  useEffect(() => {
    isOpen && setPageIsLoading(false);
  }, [isOpen]);

  return ReactDOM.createPortal(
    <div
      className={`modal-outer-container ${isOpen ? "modal-open" : ""} ${
        pageIsLoading ? "stop-modal-animation" : ""
      }`}
      onClick={handleClick}
      ref={modalBackgroundRef}
    >
      <div
        className={`modal-inner-container ${isOpen ? "modal-open" : ""} ${
          pageIsLoading ? "stop-modal-animation" : ""
        }`}
      >
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
