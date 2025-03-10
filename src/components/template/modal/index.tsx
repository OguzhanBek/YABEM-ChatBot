type ModalProps = {
  children: React.ReactNode;
};

export const Modal: React.FC<ModalProps> = ({ children }) => {
  return (
    <div className="absolute w-screen h-screen bg-black/50 bg-opacity-10 top-0 left-0 flex justify-center items-center z-50">
      {children}
    </div>
  );
};
