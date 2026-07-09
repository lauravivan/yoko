import { useState } from 'react';
import { createPortal } from 'react-dom';

interface DeleteButtonProps {
  title: string;
  onDelete: () => void;
}

const DeleteButton = ({ title }: DeleteButtonProps) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpenModal((prev) => !prev)}
        className="c-menu-button"
      >
        {title}
      </button>
      {openModal &&
        createPortal(<div>Oi, tudo bom</div>, document.getElementById('root')!)}
    </>
  );
};

export default DeleteButton;
