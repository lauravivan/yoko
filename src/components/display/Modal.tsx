interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  ref?: React.Ref<HTMLDivElement>;
}
const Modal = ({ ref, children }: ModalProps) => {
  return (
    <div className="modal-overlay">
      <div className="modal-overlay__modal" ref={ref}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
