import React from "react";
import { GrFormClose } from "react-icons/gr";
import ReactDOM from "react-dom";

import "../css/components/Modal.css";

const Modal = ({ isOpen, closeModal, title, children }) => {
  return ReactDOM.createPortal(
    <div
      className={`modal-background ${isOpen ? "modal-open" : ""}`}
      onClick={closeModal}
    >
      <div className="modal" onClick={(event) => event.stopPropagation()}>
        <div className="modal-title">
          <h4>{title && title}</h4>
          <GrFormClose size={48} onClick={closeModal} />
        </div>
        <div className="body">{children}</div>
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default Modal;
