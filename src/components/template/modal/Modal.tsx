import React, { ReactNode, forwardRef, useImperativeHandle } from "react";
import ReactDOM from "react-dom";

type ModalProps = {
  children: ReactNode;
};

export type ModalRef = {
  open: () => void;
  close: () => void;
};

const Modal = forwardRef<ModalRef, ModalProps> (({ children }, ref) => {
  const [isOpen, setIsOpen] = React.useState(false);

  // Modal'ı açmak için fonksiyon
  const open = () => setIsOpen(true);

  // Modal'ı kapatmak için fonksiyon
  const close = () => setIsOpen(false);

  // Ref üzerinden erişilebilir metodları tanımla
  useImperativeHandle(ref, () => ({
    open,
    close,
  }));
  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <div className="absolute w-screen h-screen bg-black/50 bg-opacity-10 top-0 left-0 flex justify-center items-center z-50">
      {children}
    </div>,
    document.body
  );
});

export default Modal;
