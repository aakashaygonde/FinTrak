import React from "react";
import UiModal from "./ui/Modal";

const Modal = ({ children, isOpen, onClose, title }) => {
  return (
    <UiModal isOpen={isOpen} onClose={onClose} title={title} size="md">
      {children}
    </UiModal>
  );
};

export default Modal;
