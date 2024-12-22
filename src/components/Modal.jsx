import React from "react";
import { GrFormClose } from "react-icons/gr";
import ReactDOM from "react-dom";

import "../css/components/Modal.css";

const Modal = ({ isOpen, closeModal, title, children }) => {
  return ReactDOM.createPortal(
    <div className={`modal-background ${isOpen ? "modal-open" : ""}`}>
      <div className="modal">
        <div className="modal-title">
          <h4>{title && title}</h4>
          <button onClick={closeModal}>
            <GrFormClose size={48} />
          </button>
        </div>
        <div className="body">{children}</div>
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default Modal;
